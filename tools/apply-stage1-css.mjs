import fs from 'node:fs';
import path from 'node:path';

const htmlPath = 'index.html';
const cssPath = path.join('assets', 'css', 'app.css');
const stylesheetHref = 'assets/css/app.css';

const html = fs.readFileSync(htmlPath, 'utf8');
const styleMatches = [...html.matchAll(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi)];

if (styleMatches.length === 0) {
  if (html.includes(`href="${stylesheetHref}"`) && fs.existsSync(cssPath)) {
    console.log('Stage 1 CSS extraction is already applied.');
    process.exit(0);
  }
  throw new Error('No inline <style> block found and external app.css is not linked.');
}

if (styleMatches.length !== 1) {
  throw new Error(`Expected exactly 1 inline <style> block; found ${styleMatches.length}. Refusing to reorder CSS implicitly.`);
}

const [match] = styleMatches;
const rawAttrs = (match[1] || '').trim();
if (rawAttrs) {
  throw new Error(`The inline <style> block has attributes (${rawAttrs}). Refusing an automatic extraction that could change semantics.`);
}

if (fs.existsSync(cssPath)) {
  throw new Error(`${cssPath} already exists while inline CSS is still present. Refusing to overwrite it.`);
}

const styleBlock = match[0];
const css = match[2] || '';
const linkTag = `<link rel="stylesheet" href="${stylesheetHref}">`;
const nextHtml = html.replace(styleBlock, linkTag);

if (nextHtml === html) {
  throw new Error('Failed to replace the inline style block.');
}
if (/<style\b/i.test(nextHtml)) {
  throw new Error('An inline <style> block remains after extraction.');
}
if ((nextHtml.match(/assets\/css\/app\.css/g) || []).length !== 1) {
  throw new Error('Expected exactly one app.css reference after extraction.');
}

// Guard against accidental changes outside the style block itself.
if (nextHtml.replace(linkTag, '') !== html.replace(styleBlock, '')) {
  throw new Error('Unexpected HTML changes detected outside the CSS replacement.');
}

fs.mkdirSync(path.dirname(cssPath), { recursive: true });
fs.writeFileSync(cssPath, css.endsWith('\n') ? css : `${css}\n`, 'utf8');
fs.writeFileSync(htmlPath, nextHtml, 'utf8');

console.log('Stage 1 CSS extraction complete.');
console.log(`  wrote ${cssPath} (${Buffer.byteLength(css, 'utf8').toLocaleString('en-US')} CSS bytes)`);
console.log(`  replaced the only inline <style> block with ${linkTag}`);
console.log('  JavaScript and legal-data content were not rewritten.');
