import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const appPath = 'assets/js/app.js';
const dataPath = 'assets/js/legal-data.js';
const htmlPath = 'index.html';

const source = fs.readFileSync(appPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

if (fs.existsSync(dataPath)) throw new Error(`${dataPath} already exists; refusing to re-run Stage 2b.1.`);
if (!html.includes('<script src="assets/js/app.js"></script>')) throw new Error('Expected app.js script tag was not found exactly once.');
if ((html.match(/<script src="assets\/js\/app\.js"><\/script>/g) || []).length !== 1) throw new Error('Expected exactly one app.js script tag.');

function findDeclarationStart(name, from = 0) {
  const re = new RegExp(`(?:^|\\n)const\\s+${name}\\s*=`, 'g');
  re.lastIndex = from;
  const match = re.exec(source);
  if (!match) throw new Error(`Could not find top-level const ${name}.`);
  return match.index + (match[0].startsWith('\n') ? 1 : 0);
}

function findStatementEnd(start) {
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let round = 0;
  let square = 0;
  let curly = 0;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === '*' && next === '/') { blockComment = false; i += 1; }
      continue;
    }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '/' && next === '/') { lineComment = true; i += 1; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i += 1; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }

    if (ch === '(') round += 1;
    else if (ch === ')') round -= 1;
    else if (ch === '[') square += 1;
    else if (ch === ']') square -= 1;
    else if (ch === '{') curly += 1;
    else if (ch === '}') curly -= 1;
    else if (ch === ';' && round === 0 && square === 0 && curly === 0) return i + 1;

    if (round < 0 || square < 0 || curly < 0) throw new Error('Unbalanced delimiter while locating data declaration end.');
  }
  throw new Error('Could not find declaration terminator.');
}

const tStart = findDeclarationStart('T');
const tEnd = findStatementEnd(tStart);
const dStart = findDeclarationStart('D', tEnd);
const dEnd = findStatementEnd(dStart);

if (tStart > 2) {
  const before = source.slice(0, tStart);
  if (before.trim()) throw new Error('Unexpected executable content before const T.');
}
if (source.slice(tEnd, dStart).trim()) throw new Error('Unexpected content between const T and const D.');

const extracted = source.slice(tStart, dEnd);
if (extracted.includes('${')) throw new Error('Template interpolation detected inside T/D data; manual review required before extraction.');
if (!/^const\s+T\s*=/.test(extracted)) throw new Error('Extracted block does not begin with const T.');
if (!/\nconst\s+D\s*=/.test(extracted)) throw new Error('Extracted block does not contain const D after T.');

const prefix = source.slice(0, tStart);
const suffix = source.slice(dEnd);
const remainder = prefix + suffix;
if (prefix + extracted + suffix !== source) throw new Error('Byte reconstruction guard failed.');
if (/^(?:\s*)const\s+T\s*=/.test(remainder) || /(?:^|\n)const\s+D\s*=/.test(remainder)) throw new Error('T or D declaration still remains in app.js.');

new vm.Script(extracted, { filename: dataPath });
new vm.Script(remainder, { filename: appPath });

const dataFile = extracted + (extracted.endsWith('\n') ? '' : '\n');
const nextHtml = html.replace(
  '<script src="assets/js/app.js"></script>',
  '<script src="assets/js/legal-data.js"></script>\n<script src="assets/js/app.js"></script>'
);

const dataPos = nextHtml.indexOf('src="assets/js/legal-data.js"');
const appPos = nextHtml.indexOf('src="assets/js/app.js"');
if (dataPos < 0 || appPos < 0 || dataPos >= appPos) throw new Error('Script-order guard failed: legal-data.js must load before app.js.');

fs.mkdirSync(path.dirname(dataPath), { recursive: true });
fs.writeFileSync(dataPath, dataFile, 'utf8');
fs.writeFileSync(appPath, remainder, 'utf8');
fs.writeFileSync(htmlPath, nextHtml, 'utf8');

const hash = crypto.createHash('sha256').update(extracted).digest('hex');
console.log('Stage 2b.1 core-data extraction complete.');
console.log(`  moved T + D unchanged to ${dataPath}`);
console.log(`  extracted ${Buffer.byteLength(extracted, 'utf8').toLocaleString('en-US')} bytes`);
console.log(`  extracted SHA-256 ${hash}`);
console.log('  app.js remainder and index script order validated.');
