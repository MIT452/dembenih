#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const envFile = path.join(root, '.env');

function readEnvBase() {
  if (process.env.VITE_CLOUDINARY_BASE) return process.env.VITE_CLOUDINARY_BASE;
  if (!fs.existsSync(envFile)) return null;
  const data = fs.readFileSync(envFile, 'utf8');
  const m = data.match(/^VITE_CLOUDINARY_BASE=(.*)$/m);
  if (m) return m[1].trim();
  return null;
}

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function replaceInFile(filePath, replacements) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.css', '.html', '.json', '.map'].includes(ext)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.indexOf(from) !== -1) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched', filePath);
  }
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.error('dist/ not found — run build first');
    process.exit(1);
  }

  let base = readEnvBase() || process.env.VITE_CLOUDINARY_BASE || '';
  if (!base) {
    console.warn('No VITE_CLOUDINARY_BASE found in .env or env; using / (no-op)');
    base = '/';
  }
  if (!base.endsWith('/')) base += '/';

  // collect image files in dist root
  const files = fs.readdirSync(distDir);
  const imageFiles = files.filter(f => /\.(jpe?g|png|svg|webp|gif)$/i.test(f));
  if (imageFiles.length === 0) {
    console.log('No images found in dist root — nothing to replace.');
  }

  const replacements = imageFiles.map(f => {
    const from = '/' + f; // matches occurrences like /mairie.jpg
    const to = base + f;
    return [from, to];
  });

  // also handle images under /assets/ if any
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const assets = fs.readdirSync(assetsDir).filter(f => /\.(jpe?g|png|svg|webp|gif)$/i.test(f));
    for (const f of assets) replacements.push([`/assets/${f}`, base + f]);
  }

  // Apply replacements to files in dist (js/css/html)
  walk(distDir, file => replaceInFile(file, replacements));

  console.log('Done. If some images still do not load, consider re-uploading SVGs or adjusting extensions.');
}

main();
