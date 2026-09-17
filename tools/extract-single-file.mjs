import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const sourcePath = process.argv[2] && !process.argv[2].startsWith('-') ? process.argv[2] : 'index.html';
const outputArg = process.argv[3] && !process.argv[3].startsWith('-') ? process.argv[3] : '.tmp/refactor-preview';
const outDir = path.resolve(outputArg);
const source = fs.readFileSync(sourcePath, 'utf8');

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(path.join(outDir, 'assets', 'css'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'assets', 'js'), { recursive: true });

let html = source;
let styleCount = 0;
let scriptCount = 0;
const extracted = [];

html = html.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, (full, rawAttrs = '', css = '') => {
  styleCount += 1;
  const file = `style-${styleCount}.css`;
  fs.writeFileSync(path.join(outDir, 'assets', 'css', file), css.trimStart() + '\n', 'utf8');

  const media = rawAttrs.match(/\bmedia\s*=\s*(["'])(.*?)\1/i)?.[2];
  const mediaAttr = media ? ` media="${media.replaceAll('"', '&quot;')}"` : '';
  extracted.push({ type: 'style', file: `assets/css/${file}`, bytes: Buffer.byteLength(css, 'utf8') });
  return `<link rel="stylesheet" href="assets/css/${file}"${mediaAttr}>`;
});

html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, rawAttrs = '', js = '') => {
  if (/\bsrc\s*=/i.test(rawAttrs)) return full;

  const type = rawAttrs.match(/\btype\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase() || '';
  const executable = !type || type === 'text/javascript' || type === 'application/javascript' || type === 'module';
  if (!executable || !js.trim()) return full;

  scriptCount += 1;
  const ext = type === 'module' ? 'mjs' : 'js';
  const file = `script-${scriptCount}.${ext}`;

  if (type !== 'module') {
    new vm.Script(js, { filename: `${sourcePath}#script-${scriptCount}` });
  }

  fs.writeFileSync(path.join(outDir, 'assets', 'js', file), js.trimStart() + '\n', 'utf8');

  const keptAttrs = rawAttrs
    .replace(/\btype\s*=\s*(["'])(.*?)\1/ig, '')
    .trim();
  const attrs = [type === 'module' ? 'type="module"' : '', keptAttrs].filter(Boolean).join(' ');
  extracted.push({ type: 'script', file: `assets/js/${file}`, bytes: Buffer.byteLength(js, 'utf8') });
  return `<script${attrs ? ` ${attrs}` : ''} src="assets/js/${file}"></script>`;
});

fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify({ source: sourcePath, generatedAt: new Date().toISOString(), styleCount, scriptCount, extracted }, null, 2) + '\n',
  'utf8'
);

console.log(`Generated refactor preview in ${outDir}`);
console.log(`  extracted ${styleCount} style block(s)`);
console.log(`  extracted ${scriptCount} executable inline script block(s)`);
console.log('Production index.html was not modified.');
