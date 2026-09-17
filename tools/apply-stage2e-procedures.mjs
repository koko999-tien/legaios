import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/procedures.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function renderProcSummary()';
const endMarker='function renderWorkspace()';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find procedure extraction boundaries.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');
const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function renderProcSummary()','function renderProcList()','function openProc(']){if(!block.includes(token)) throw new Error(`Expected procedure token missing: ${token}`)}
if(block.includes('function renderWorkspace()')) throw new Error('Boundary accidentally included workspace runtime.');
const nextApp=app.slice(0,start)+app.slice(end);
const libraryTag='<script src="assets/js/library.js"></script>';
if(!html.includes(libraryTag)) throw new Error('library.js tag not found.');
if(html.includes('assets/js/procedures.js')) throw new Error('procedures.js already referenced.');
const nextHtml=html.replace(libraryTag,libraryTag+'\n<script src="assets/js/procedures.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — procedure checklist, progress and detail runtime. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
