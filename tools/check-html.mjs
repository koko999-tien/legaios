import fs from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2] || 'index.html';
const html = fs.readFileSync(file, 'utf8');
const errors = [];
const warnings = [];

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }

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

const scripts = [];
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  const attrs = match[1] || '';
  const body = match[2] || '';
  if (/\bsrc\s*=/i.test(attrs)) continue;
  if (!body.trim()) continue;
  scripts.push(body);
}

scripts.forEach((code, index) => {
  try {
    new vm.Script(code, { filename: `${file}#inline-script-${index + 1}` });
  } catch (error) {
    fail(`Inline script ${index + 1} syntax error: ${error.message}`);
  }
});

if (/\beval\s*\(/.test(html)) fail('eval(...) detected.');
if (/\bnew\s+Function\s*\(/.test(html)) fail('new Function(...) detected.');
if (/document\.write\s*\(/i.test(html)) fail('document.write(...) detected.');
if (/javascript\s*:/i.test(html)) fail('javascript: URL detected.');
if (/set(?:Timeout|Interval)\s*\(\s*["']/i.test(html)) fail('String-based timer execution detected.');

const innerHtmlAssignments = [...html.matchAll(/\.innerHTML\s*=/g)].length;
const singleFileInnerHtmlBaseline = 70;
if (file === 'index.html' && innerHtmlAssignments > singleFileInnerHtmlBaseline) {
  fail(`innerHTML assignment count increased from the reviewed baseline (${singleFileInnerHtmlBaseline}) to ${innerHtmlAssignments}. Review and sanitize the new sink before raising the baseline.`);
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
console.log(`  ${bytes.toLocaleString('en-US')} bytes`);
console.log(`  ${ids.length.toLocaleString('en-US')} id attributes`);
console.log(`  ${scripts.length} inline script block(s)`);
console.log(`  ${innerHtmlAssignments} innerHTML assignment(s)`);

for (const message of warnings) console.warn(`WARNING: ${message}`);
for (const message of errors) console.error(`ERROR: ${message}`);

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Validation passed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
