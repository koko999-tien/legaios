import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';

const appPath = 'assets/js/app.js';
const statePath = 'assets/js/state.js';
const htmlPath = 'index.html';

const source = fs.readFileSync(appPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');
if (fs.existsSync(statePath)) throw new Error(`${statePath} already exists; refusing to re-run Stage 2b.3.`);

const marker = "const IMPORT_DB_NAME='legalos_v9_documents';";
const markerIndex = source.indexOf(marker);
if (markerIndex < 0) throw new Error('Could not find import-subsystem boundary marker.');
if (source.indexOf(marker, markerIndex + marker.length) !== -1) throw new Error('Import-subsystem boundary marker is not unique.');

const extracted = source.slice(0, markerIndex);
const remainder = source.slice(markerIndex);
if (!extracted.trim()) throw new Error('Shared-state prefix is empty.');
if (extracted + remainder !== source) throw new Error('Byte reconstruction guard failed.');

for (const required of ['const $=id=>document.getElementById(id);', 'const STORE=', 'let saved=', 'let uiPrefs=', 'let wizardState=']) {
  if (!extracted.includes(required)) throw new Error(`Expected shared-state declaration missing: ${required}`);
}
for (const forbidden of ['IMPORT_DB_NAME', 'function openImportDB', 'function importFiles']) {
  if (extracted.includes(forbidden)) throw new Error(`Import subsystem leaked into shared-state prefix: ${forbidden}`);
}
if (!remainder.startsWith(marker)) throw new Error('app.js remainder does not begin at the expected import boundary.');

new vm.Script(extracted, { filename: statePath });
new vm.Script(remainder, { filename: appPath });

const localStore = new Map();
const context = vm.createContext({
  console,
  document: { getElementById: () => null },
  window: {
    localStorage: {
      getItem: key => localStore.has(key) ? localStore.get(key) : null,
      setItem: (key, value) => localStore.set(key, String(value)),
    },
  },
});
new vm.Script(extracted, { filename: statePath }).runInContext(context);

const currentScripts = '<script src="assets/js/legal-data.js"></script>\n<script src="assets/js/knowledge-base.js"></script>\n<script src="assets/js/app.js"></script>';
if ((html.match(/<script src="assets\/js\/legal-data\.js"><\/script>\n<script src="assets\/js\/knowledge-base\.js"><\/script>\n<script src="assets\/js\/app\.js"><\/script>/g) || []).length !== 1) {
  throw new Error('Expected exactly one current three-script sequence.');
}
const nextScripts = '<script src="assets/js/legal-data.js"></script>\n<script src="assets/js/knowledge-base.js"></script>\n<script src="assets/js/state.js"></script>\n<script src="assets/js/app.js"></script>';
const nextHtml = html.replace(currentScripts, nextScripts);

const order = ['legal-data.js', 'knowledge-base.js', 'state.js', 'app.js'].map(name => nextHtml.indexOf(`src="assets/js/${name}"`));
if (order.some(x => x < 0) || order.some((x, i) => i && x <= order[i - 1])) throw new Error('Script-order guard failed.');

fs.writeFileSync(statePath, extracted.endsWith('\n') ? extracted : extracted + '\n', 'utf8');
fs.writeFileSync(appPath, remainder, 'utf8');
fs.writeFileSync(htmlPath, nextHtml, 'utf8');

const hash = crypto.createHash('sha256').update(extracted).digest('hex');
console.log('Stage 2b.3 shared-state extraction complete.');
console.log(`  moved ${Buffer.byteLength(extracted, 'utf8').toLocaleString('en-US')} bytes to ${statePath}`);
console.log(`  extracted SHA-256 ${hash}`);
console.log('  shared state initialized successfully with a localStorage stub.');
console.log('  app.js now begins at the import subsystem boundary.');
