import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const htmlPath = 'index.html';
const jsPath = path.join('assets', 'js', 'app.js');
const scriptSrc = 'assets/js/app.js';

const html = fs.readFileSync(htmlPath, 'utf8');
const allScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
const inlineExecutable = allScripts.filter(match => {
  const attrs = match[1] || '';
  if (/\bsrc\s*=/i.test(attrs)) return false;
  const body = match[2] || '';
  if (!body.trim()) return false;
  const type = attrs.match(/\btype\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase() || '';
  return !type || type === 'text/javascript' || type === 'application/javascript';
});

if (inlineExecutable.length === 0) {
  if (html.includes(`src="${scriptSrc}"`) && fs.existsSync(jsPath)) {
    console.log('Stage 2 JavaScript extraction is already applied.');
    process.exit(0);
  }
  throw new Error('No executable inline JavaScript found and external app.js is not linked.');
}

if (inlineExecutable.length !== 1) {
  throw new Error(`Expected exactly 1 executable inline JavaScript block; found ${inlineExecutable.length}. Refusing to change execution order implicitly.`);
}

const [match] = inlineExecutable;
const rawAttrs = (match[1] || '').trim();
if (rawAttrs) {
  throw new Error(`The inline application script has attributes (${rawAttrs}). Refusing automatic extraction because external-script attributes can change execution semantics.`);
}

if (fs.existsSync(jsPath)) {
  throw new Error(`${jsPath} already exists while executable inline JavaScript is still present. Refusing to overwrite it.`);
}

const scriptBlock = match[0];
const js = match[2] || '';
if (/document\.currentScript\b/.test(js)) {
  throw new Error('document.currentScript is used by the inline application script; moving it externally could change behavior.');
}

new vm.Script(js, { filename: `${htmlPath}#application-script` });

const externalTag = `<script src="${scriptSrc}"></script>`;
const nextHtml = html.replace(scriptBlock, externalTag);
if (nextHtml === html) throw new Error('Failed to replace the inline application script.');
if ((nextHtml.match(/assets\/js\/app\.js/g) || []).length !== 1) {
  throw new Error('Expected exactly one app.js reference after extraction.');
}

// Guard against accidental HTML changes outside the script replacement.
if (nextHtml.replace(externalTag, '') !== html.replace(scriptBlock, '')) {
  throw new Error('Unexpected HTML changes detected outside the JavaScript replacement.');
}

fs.mkdirSync(path.dirname(jsPath), { recursive: true });
fs.writeFileSync(jsPath, js.endsWith('\n') ? js : `${js}\n`, 'utf8');
fs.writeFileSync(htmlPath, nextHtml, 'utf8');

console.log('Stage 2a JavaScript extraction complete.');
console.log(`  wrote ${jsPath} (${Buffer.byteLength(js, 'utf8').toLocaleString('en-US')} JavaScript bytes)`);
console.log(`  replaced the only executable inline script with ${externalTag}`);
console.log('  Application code and legal-data text were moved byte-for-byte, not rewritten.');
