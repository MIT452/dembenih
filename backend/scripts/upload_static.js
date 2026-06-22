require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary explicitly from CLOUDINARY_URL if available
console.log('CLOUDINARY_URL=', process.env.CLOUDINARY_URL);
if (process.env.CLOUDINARY_URL) {
  try {
    const m = process.env.CLOUDINARY_URL.match(/^cloudinary:\/\/(.+?):(.+?)@(.+)$/);
    if (m) {
      cloudinary.config({ cloud_name: m[3], api_key: m[1], api_secret: m[2] });
    } else {
      cloudinary.config();
    }
  } catch (err) {
    console.error('Config parse error', err);
    cloudinary.config();
  }
} else {
  cloudinary.config();
}

console.log('cloudinary config:', cloudinary.config());

const uploadFolder = async (folderPath, remoteFolder) => {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await uploadFolder(fullPath, path.join(remoteFolder, file));
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
      console.log('Skipping non-image', fullPath);
      continue;
    }

    const publicId = `${remoteFolder}/${path.basename(file, ext)}`.replace(/\\\\/g, '/').replace(/^\/+/, '');
    console.log('Uploading', fullPath, '->', publicId);
    try {
      const res = await cloudinary.uploader.upload(fullPath, { public_id: publicId, overwrite: true, resource_type: 'image' });
      console.log('Uploaded:', res.secure_url);
    } catch (err) {
      console.error('Upload error for', fullPath);
      console.error(err);
    }
  }
};

const run = async () => {
  try {
    // frontend public
    const frontendPublic = path.join(__dirname, '..', '..', 'frontend', 'public');
    if (fs.existsSync(frontendPublic)) {
      await uploadFolder(frontendPublic, 'dembeni');
    }

    // backend public images
    const backendImages = path.join(__dirname, '..', 'public', 'images');
    if (fs.existsSync(backendImages)) {
      await uploadFolder(backendImages, 'dembeni');
    }

    console.log('All done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
