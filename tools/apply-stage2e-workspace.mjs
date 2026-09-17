import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/workspace.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}
const startMarker='function renderWorkspace()';
const endMarker='const LEGAL_PACK_KEY=';
const start=app.indexOf(startMarker),end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find workspace extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Workspace block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');
const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function renderWorkspace()','function showCase(','function exportWorkspace()','function importWorkspace(','function cmdResults(','function openCmd()']){if(!block.includes(token)) throw new Error(`Expected workspace token missing: ${token}`)}
if(block.includes('const LEGAL_PACK_KEY=')) throw new Error('Boundary accidentally included legal-pack runtime.');
const nextApp=app.slice(0,start)+app.slice(end);
const procTag='<script src="assets/js/procedures.js"></script>';
if(!html.includes(procTag)) throw new Error('procedures.js tag not found.');
if(html.includes('assets/js/workspace.js')) throw new Error('workspace.js already referenced.');
const nextHtml=html.replace(procTag,procTag+'\n<script src="assets/js/workspace.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — workspace/case management and command palette runtime. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
