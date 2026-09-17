import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';

const appPath = 'assets/js/app.js';
const dataPath = 'assets/js/legal-data.js';
const knowledgePath = 'assets/js/knowledge-base.js';
const htmlPath = 'index.html';

const source = fs.readFileSync(appPath, 'utf8');
const legalData = fs.readFileSync(dataPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

if (fs.existsSync(knowledgePath)) throw new Error(`${knowledgePath} already exists; refusing to re-run Stage 2b.2.`);
const marker = 'const $=id=>document.getElementById(id);';
const markerIndex = source.indexOf(marker);
if (markerIndex < 0) throw new Error('Could not find the DOM/runtime boundary marker.');
if (source.indexOf(marker, markerIndex + marker.length) !== -1) throw new Error('DOM/runtime boundary marker is not unique.');

const extracted = source.slice(0, markerIndex);
const remainder = source.slice(markerIndex);
if (!extracted.trim()) throw new Error('Knowledge-base prefix is empty.');
if (extracted + remainder !== source) throw new Error('Byte reconstruction guard failed.');

for (const required of ['OFFICIAL_UPDATE_PACK_20260910', 'LONG_SUMMARY', 'LAW_META', 'OFFICIAL_SOURCES']) {
  if (!new RegExp(`\\b${required}\\b`).test(extracted)) throw new Error(`Expected ${required} inside knowledge-base prefix.`);
}
for (const forbidden of ['const STORE=', 'let saved=', 'IMPORT_DB_NAME', 'document.getElementById']) {
  if (extracted.includes(forbidden)) throw new Error(`Runtime boundary leaked into knowledge-base prefix: ${forbidden}`);
}
if (!remainder.startsWith(marker)) throw new Error('app.js remainder does not begin at the expected DOM helper boundary.');

new vm.Script(legalData, { filename: dataPath });
new vm.Script(extracted, { filename: knowledgePath });
new vm.Script(remainder, { filename: appPath });

// Stronger runtime guard: the extracted prefix must execute successfully after
// legal-data.js in a plain VM context, proving it has no top-level browser/DOM
// dependency or dependency on declarations that remain in app.js.
const context = vm.createContext({ console });
new vm.Script(legalData, { filename: dataPath }).runInContext(context);
new vm.Script(extracted, { filename: knowledgePath }).runInContext(context);

const currentScripts = '<script src="assets/js/legal-data.js"></script>\n<script src="assets/js/app.js"></script>';
if ((html.match(/<script src="assets\/js\/legal-data\.js"><\/script>\n<script src="assets\/js\/app\.js"><\/script>/g) || []).length !== 1) {
  throw new Error('Expected exactly one legal-data.js -> app.js script sequence.');
}
const nextScripts = '<script src="assets/js/legal-data.js"></script>\n<script src="assets/js/knowledge-base.js"></script>\n<script src="assets/js/app.js"></script>';
const nextHtml = html.replace(currentScripts, nextScripts);

const dataPos = nextHtml.indexOf('src="assets/js/legal-data.js"');
const knowledgePos = nextHtml.indexOf('src="assets/js/knowledge-base.js"');
const appPos = nextHtml.indexOf('src="assets/js/app.js"');
if (!(dataPos >= 0 && dataPos < knowledgePos && knowledgePos < appPos)) throw new Error('Script-order guard failed.');

fs.writeFileSync(knowledgePath, extracted.endsWith('\n') ? extracted : extracted + '\n', 'utf8');
fs.writeFileSync(appPath, remainder, 'utf8');
fs.writeFileSync(htmlPath, nextHtml, 'utf8');

const hash = crypto.createHash('sha256').update(extracted).digest('hex');
console.log('Stage 2b.2 knowledge-base extraction complete.');
console.log(`  moved ${Buffer.byteLength(extracted, 'utf8').toLocaleString('en-US')} bytes to ${knowledgePath}`);
console.log(`  extracted SHA-256 ${hash}`);
console.log('  knowledge prefix executed successfully after legal-data.js in a browser-free VM context.');
console.log('  app.js now begins at the DOM/runtime boundary.');
