import fs from 'fs';
import path from 'path';

const outDir = 'public';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const copyRecursiveSync = (src, dest) => {
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const itemsToCopy = ['assets', 'css', 'js', 'api', 'splash-cursor.js'];

// Copy specific items
itemsToCopy.forEach(item => {
  if (fs.existsSync(item)) {
    copyRecursiveSync(item, path.join(outDir, item));
    console.log(`Copied: ${item}`);
  }
});

// Copy HTML files
fs.readdirSync('.').forEach(file => {
  if (file.endsWith('.html')) {
    fs.copyFileSync(file, path.join(outDir, file));
    console.log(`Copied: ${file}`);
  }
});

console.log('Build output copied to public directory.');
