import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/ui-utils.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}
const start=app.indexOf('function toast(');
const end=app.indexOf('function renderWorkspace()');
if(start<0||end<0||end<=start) throw new Error('Could not find UI-utils extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('UI-utils are no longer first executable content in app.js.');
const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function toast(','function plain(','function curTopic(','function topicName(']){if(!block.includes(token)) throw new Error(`Expected UI helper missing: ${token}`)}
if(block.includes('function renderWorkspace()')) throw new Error('Boundary accidentally included workspace runtime.');
const nextApp=app.slice(0,start)+app.slice(end);
const shellTag='<script src="assets/js/ui-shell.js"></script>';
if(!html.includes(shellTag)) throw new Error('ui-shell.js tag not found.');
if(html.includes('assets/js/ui-utils.js')) throw new Error('ui-utils.js already referenced.');
const nextHtml=html.replace(shellTag,shellTag+'\n<script src="assets/js/ui-utils.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — small shared UI and topic helpers. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted UI helpers to ${outPath}`);
