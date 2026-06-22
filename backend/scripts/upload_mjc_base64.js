const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cloudinary = require('cloudinary').v2;

if (!process.env.CLOUDINARY_URL && !(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY)) {
  console.error('Cloudinary not configured in backend/.env');
  process.exit(1);
}

const filePath = path.join(__dirname, '..', 'tmp', 'mjc_base64.txt');
if (!fs.existsSync(filePath)) {
  console.error('Base64 file not found:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8').trim();
const match = content.match(/^data:(image\/\w+);base64,(.+)$/);
if (!match) {
  console.error('File does not contain data URI');
  process.exit(1);
}

const mime = match[1];
const b64 = match[2];
const buffer = Buffer.from(b64, 'base64');

console.log('Uploading image to Cloudinary...');
const uploadStream = cloudinary.uploader.upload_stream({ public_id: 'dembeni/mjc_inscriptions_open', overwrite: true }, function(err, result) {
  if (err) {
    console.error('Upload error:', err);
    process.exit(1);
  }
  console.log('Upload success:', result.secure_url);
  const outPath = path.join(__dirname, '..', 'tmp', 'mjc_uploaded_url.txt');
  fs.writeFileSync(outPath, result.secure_url, 'utf8');
  console.log('Wrote URL to', outPath);
});

// feed the buffer into the upload stream
uploadStream.end(buffer);

