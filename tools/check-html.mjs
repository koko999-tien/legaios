import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const file = process.argv[2] || 'index.html';
const absoluteFile = path.resolve(file);
const baseDir = path.dirname(absoluteFile);
const html = fs.readFileSync(absoluteFile, 'utf8');
const errors = [];
const warnings = [];

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }
function isLocalRef(ref) {
  return ref && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref);
}
function resolveLocalRef(ref) {
  const clean = ref.split('#')[0].split('?')[0];
  return path.resolve(baseDir, clean);
}

if (!/^<!DOCTYPE html>/i.test(html.trimStart())) fail('Missing <!DOCTYPE html>.');
if (!/<html\b[^>]*\blang=["']vi["']/i.test(html)) warn('Expected <html lang="vi">.');
if (!/<meta\b[^>]*name=["']viewport["']/i.test(html)) fail('Missing viewport meta tag.');
if (!/<title>[^<]+<\/title>/i.test(html)) fail('Missing non-empty <title>.');

const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
const seen = new Set();
const duplicates = new Set();
for (const id of ids) {
  if (seen.has(id)) duplicates.add(id);
  seen.add(id);
}
if (duplicates.size) fail(`Duplicate id values: ${[...duplicates].sort().join(', ')}`);

const inlineScripts = [];
const localScripts = [];
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  const attrs = match[1] || '';
  const body = match[2] || '';
  const type = attrs.match(/\btype\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase() || '';
  const executable = !type || type === 'text/javascript' || type === 'application/javascript' || type === 'module';
  if (!executable) continue;

  const src = attrs.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
  if (src) {
    if (!isLocalRef(src)) continue;
    const resolved = resolveLocalRef(src);
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
      fail(`Missing local script referenced by HTML: ${src}`);
      continue;
    }
    const code = fs.readFileSync(resolved, 'utf8');
    localScripts.push({ src, resolved, code, type });
    if (!code.trim()) fail(`Local script is empty: ${src}`);
    continue;
  }

  if (body.trim()) inlineScripts.push({ code: body, type });
}

inlineScripts.forEach(({ code, type }, index) => {
  if (type === 'module') {
    warn(`Inline module script ${index + 1} was not syntax-checked by vm.Script.`);
    return;
  }
  try {
    new vm.Script(code, { filename: `${file}#inline-script-${index + 1}` });
  } catch (error) {
    fail(`Inline script ${index + 1} syntax error: ${error.message}`);
  }
});

localScripts.forEach(({ src, code, type }) => {
  if (type === 'module') {
    warn(`Local module script ${src} was not syntax-checked by vm.Script.`);
    return;
  }
  try {
    new vm.Script(code, { filename: src });
  } catch (error) {
    fail(`Local script ${src} syntax error: ${error.message}`);
  }
});

const localStylesheets = [];
for (const match of html.matchAll(/<link\b([^>]*)>/gi)) {
  const attrs = match[1] || '';
  const rel = attrs.match(/\brel\s*=\s*(["'])(.*?)\1/i)?.[2] || '';
  if (!/(?:^|\s)stylesheet(?:\s|$)/i.test(rel)) continue;
  const href = attrs.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2];
  if (!href || !isLocalRef(href)) continue;
  const resolved = resolveLocalRef(href);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    fail(`Missing local stylesheet referenced by HTML: ${href}`);
    continue;
  }
  if (fs.statSync(resolved).size === 0) fail(`Local stylesheet is empty: ${href}`);
  localStylesheets.push(href);
}

const executableCode = [...inlineScripts.map(item => item.code), ...localScripts.map(item => item.code)];
const securityText = [html, ...executableCode].join('\n');

if (/\beval\s*\(/.test(securityText)) fail('eval(...) detected.');
if (/\bnew\s+Function\s*\(/.test(securityText)) fail('new Function(...) detected.');
if (/document\.write\s*\(/i.test(securityText)) fail('document.write(...) detected.');
if (/javascript\s*:/i.test(securityText)) fail('javascript: URL detected.');
if (/set(?:Timeout|Interval)\s*\(\s*["']/i.test(securityText)) fail('String-based timer execution detected.');

const innerHtmlAssignments = [...securityText.matchAll(/\.innerHTML\s*=/g)].length;
const reviewedInnerHtmlBaseline = 70;
if (innerHtmlAssignments > reviewedInnerHtmlBaseline) {
  fail(`innerHTML assignment count increased from the reviewed baseline (${reviewedInnerHtmlBaseline}) to ${innerHtmlAssignments}. Review and sanitize the new sink before raising the baseline.`);
}

const blankTargets = [...html.matchAll(/<a\b[^>]*\btarget\s*=\s*["']_blank["'][^>]*>/gi)].map(m => m[0]);
blankTargets.forEach((tag, index) => {
  const rel = tag.match(/\brel\s*=\s*["']([^"']*)["']/i)?.[1] || '';
  if (!/\bnoopener\b/i.test(rel)) warn(`target="_blank" anchor ${index + 1} is missing rel="noopener".`);
});

const bytes = Buffer.byteLength(html, 'utf8');
const lines = html.split(/\r?\n/).length;

console.log(`Checked ${file}`);
console.log(`  ${lines.toLocaleString('en-US')} lines`);
console.log(`  ${bytes.toLocaleString('en-US')} HTML bytes`);
console.log(`  ${ids.length.toLocaleString('en-US')} id attributes`);
console.log(`  ${inlineScripts.length} inline executable script block(s)`);
console.log(`  ${localScripts.length} local external script(s)`);
console.log(`  ${localStylesheets.length} local stylesheet(s)`);
console.log(`  ${innerHtmlAssignments} innerHTML assignment(s) across HTML + local JavaScript`);

for (const message of warnings) console.warn(`WARNING: ${message}`);
for (const message of errors) console.error(`ERROR: ${message}`);

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Validation passed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
