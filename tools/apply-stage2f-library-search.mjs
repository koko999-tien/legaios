import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/library-search.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function docs(';
const endMarker='function analyze()';
const start=app.indexOf(startMarker),end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find library-search extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Library-search block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');
const block=app.slice(start,end).trimEnd()+"\n";
if(!block.includes('function docs(')) throw new Error('docs() missing from extracted block.');
if(!block.includes('legalSearchScore(')||!block.includes('renderSearchCoach(')) throw new Error('Expected search rendering dependencies not present.');
if(block.includes('function analyze()')) throw new Error('Boundary accidentally included classifier runtime.');
const nextApp=app.slice(0,start)+app.slice(end);
const navTag='<script src="assets/js/navigation.js"></script>';
if(!html.includes(navTag)) throw new Error('navigation.js tag not found.');
if(html.includes('assets/js/library-search.js')) throw new Error('library-search.js already referenced.');
const nextHtml=html.replace(navTag,navTag+'\n<script src="assets/js/library-search.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — document-library search result rendering. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted library search renderer to ${outPath}`);
