import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');

console.log('📦 Construyendo sitio estático en carpeta dist/...\n');

// 1. Limpiar o crear dist/
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Archivos raíz a copiar
const filesToCopy = [
  'index.html',
  'styles.css',
  'main.js',
  'config.js'
];

for (const file of filesToCopy) {
  const src = path.join(__dirname, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copiado: ${file} -> dist/${file}`);
  }
}

// 3. Copiar carpeta assets si existe
const assetsSrc = path.join(__dirname, 'assets');
const assetsDest = path.join(distDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, assetsDest, { recursive: true });
  console.log(`✅ Copiada carpeta: assets/ -> dist/assets/`);
}

console.log('\n✨ Build estático terminado en dist/. Listo para subir a cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages).');
