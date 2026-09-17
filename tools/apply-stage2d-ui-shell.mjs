import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/ui-shell.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function renderHomePortal(){';
const endMarker='function currentPage()';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find safe UI-shell extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('UI-shell block is no longer the first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');

const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function renderHomePortal(','function applyUIPrefs(','function openDrawer(','function openPreview(','function applyLibraryView(','function renderWizard(','function readingProgressUpdate(']){if(!block.includes(token)) throw new Error(`Expected UI token missing: ${token}`)}
if(block.includes('function currentPage()')) throw new Error('Boundary accidentally included navigation runtime.');

const nextApp=app.slice(0,start)+app.slice(end);
const runtimeTag='<script src="assets/js/search-runtime.js"></script>';
if(!html.includes(runtimeTag)) throw new Error('search-runtime.js tag not found.');
if(html.includes('assets/js/ui-shell.js')) throw new Error('ui-shell.js already referenced.');
const nextHtml=html.replace(runtimeTag,runtimeTag+'\n<script src="assets/js/ui-shell.js"></script>');

fs.writeFileSync(outPath,'/* LegalOS V14 — shell UI, drawers, library view and procedure wizard. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
