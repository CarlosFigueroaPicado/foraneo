const fs = require('fs');
const path = require('path');

// Lee frames.json generado por exportFigma.js y crea archivos .tsx básicos por cada frame
const framesPath = path.join(__dirname, '..', 'resources', 'frames.json');

if (!fs.existsSync(framesPath)) {
  console.error('No se encontró frames.json. Ejecuta primero npm run export:figma');
  process.exit(1);
}

const frames = JSON.parse(fs.readFileSync(framesPath, 'utf-8'));

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

const screensDir = path.join(__dirname, '..', 'src', 'screens');
if (!fs.existsSync(screensDir)) {
  fs.mkdirSync(screensDir, { recursive: true });
}

frames.forEach((frame) => {
  const name = frame.name || 'Frame';
  const fileName = toPascalCase(name);
  const filePath = path.join(screensDir, `${fileName}.tsx`);
  const content = `import React from 'react';
import { View, Text } from 'react-native';

export default function ${fileName}() {
  return (
    <View className=\"flex-1 items-center justify-center bg-white\">
      <Text className=\"text-xl font-bold\">${name}</Text>
    </View>
  );
}
`;
  fs.writeFileSync(filePath, content);
  console.log(`Generado: ${fileName}.tsx`);
});
