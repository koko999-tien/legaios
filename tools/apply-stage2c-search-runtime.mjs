import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/search-runtime.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function clauseKey(';
const endMarker='function currentPage()';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find safe search-runtime extraction boundaries.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');

const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function clauseKey(','function renderClausePackV13(','const MEMO_KEY_V13=','function legalSearchScore(','function runInDocSearch(']){if(!block.includes(token)) throw new Error(`Expected token missing: ${token}`)}
if(block.includes('function currentPage()')) throw new Error('Boundary accidentally included navigation runtime.');

const nextApp=app.slice(0,start)+app.slice(end);
const dataTag='<script src="assets/js/search-data.js"></script>';
if(!html.includes(dataTag)) throw new Error('search-data.js tag not found.');
if(html.includes('assets/js/search-runtime.js')) throw new Error('search-runtime.js already referenced.');
const nextHtml=html.replace(dataTag,dataTag+'\n<script src="assets/js/search-runtime.js"></script>');

fs.writeFileSync(outPath,'/* LegalOS V14 — legal search, clause rendering and citation-memo runtime. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
