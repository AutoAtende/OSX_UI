// Simple CSS bundle script — resolves @import statements into a single file
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const entry = resolve('css/osx-ui.css');
const outDir = resolve('dist');
const outFile = resolve(outDir, 'osx-ui.css');

function bundleCss(filePath, seen = new Set()) {
  if (seen.has(filePath)) return '';
  seen.add(filePath);
  const content = readFileSync(filePath, 'utf-8');
  const dir = dirname(filePath);
  return content.replace(/@import\s+['"](.+?)['"];/g, (_match, importPath) => {
    const resolved = resolve(dir, importPath);
    return bundleCss(resolved, seen);
  });
}

mkdirSync(outDir, { recursive: true });
const bundled = bundleCss(entry);
writeFileSync(outFile, bundled, 'utf-8');
console.log(`CSS bundle written to ${outFile} (${bundled.length} bytes)`);
