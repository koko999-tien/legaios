import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/classifier.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function analyze(){';
const endMarker='document.addEventListener("click",e=>{const stat=';
const start=app.indexOf(startMarker),end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find classifier extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Classifier block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Classifier extraction boundary is not unique.');
const block=app.slice(start,end).trimEnd()+"\n";
if(!block.includes('validateClassifier()')||!block.includes('lastAnalysis=')) throw new Error('Expected classifier runtime not present.');
if(block.includes('DOMContentLoaded')) throw new Error('Classifier block crossed into application boot runtime.');
const nextApp=app.slice(0,start)+app.slice(end);
const anchor='<script src="assets/js/library-search.js"></script>';
if(!html.includes(anchor)) throw new Error('library-search.js tag not found.');
if(html.includes('assets/js/classifier.js')) throw new Error('classifier.js already referenced.');
const nextHtml=html.replace(anchor,anchor+'\n<script src="assets/js/classifier.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — project screening/classifier runtime. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted classifier runtime to ${outPath}`);
