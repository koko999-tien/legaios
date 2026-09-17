import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/navigation.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function syncHomeCleanMode(';
const endMarker='function docs(';
const start=app.indexOf(startMarker),end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find navigation extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Navigation block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');
const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function syncHomeCleanMode(','function go(']){if(!block.includes(token)) throw new Error(`Expected navigation token missing: ${token}`)}
if(block.includes('function docs(')) throw new Error('Boundary accidentally included library search rendering.');
const nextApp=app.slice(0,start)+app.slice(end);
const expertTag='<script src="assets/js/expert.js"></script>';
if(!html.includes(expertTag)) throw new Error('expert.js tag not found.');
if(html.includes('assets/js/navigation.js')) throw new Error('navigation.js already referenced.');
const nextHtml=html.replace(expertTag,expertTag+'\n<script src="assets/js/navigation.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — page navigation and route activation. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted navigation runtime to ${outPath}`);
