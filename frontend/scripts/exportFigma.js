const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Carga las variables de entorno desde un archivo .env en la carpeta frontend
dotenv.config();

// Obtiene token y clave del archivo desde las variables de entorno
const token = process.env.FIGMA_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY;

if (!token || !fileKey) {
  console.error('FIGMA_TOKEN y FIGMA_FILE_KEY deben estar definidos en el entorno');
  process.exit(1);
}

// Descarga la estructura del archivo de Figma
async function fetchFile() {
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      'X-Figma-Token': token,
    },
  });
  if (!res.ok) {
    throw new Error(`Figma API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function run() {
  const data = await fetchFile();
  const page = data.document.children.find((p) => p.name === 'Page 1');
  if (!page) {
    throw new Error('No se encontró una página llamada “Page 1” en el archivo de Figma');
  }
  const frames = page.children;
  const outDir = path.join(__dirname, '..', 'resources');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, 'frames.json'), JSON.stringify(frames, null, 2));
  console.log(`Se exportaron ${frames.length} frames a resources/frames.json`);
}

run().catch((err) => {
  console.error(err);
});