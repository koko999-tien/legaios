import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/search-utils.js';
const htmlPath='index.html';

const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');

if(fs.existsSync(outPath)){
  console.log(`${outPath} already exists; nothing to do.`);
  process.exit(0);
}

const startMarker='function esc(s=""){' ;
const endMarker='const CLAUSE_PACK_V13={' ;
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find safe search-utils extraction boundaries.');
if(app.indexOf(startMarker,start+1)>=0) throw new Error('Start marker is not unique.');
if(app.indexOf(endMarker,end+1)>=0) throw new Error('End marker is not unique.');

const block=app.slice(start,end).trimEnd()+"\n";
const required=['function esc(','function safeHttpUrl(','function sanitizeImportedLegalHtml(','function foldVN(','const SEARCH_SYNONYMS=','function parseLegalQuery(','function extractLegalRefs('];
for(const token of required){if(!block.includes(token)) throw new Error(`Expected token missing from extracted block: ${token}`)}
if(block.includes('const CLAUSE_PACK_V13=')) throw new Error('Boundary accidentally included clause data.');

const nextApp=(app.slice(0,start)+app.slice(end)).replace(/^\s+/,m=>m);
const appTag='<script src="assets/js/app.js"></script>';
if(!html.includes(appTag)) throw new Error('app.js script tag not found.');
if(html.includes('assets/js/search-utils.js')) throw new Error('search-utils.js is already referenced.');
const nextHtml=html.replace(appTag,'<script src="assets/js/search-utils.js"></script>\n'+appTag);

fs.writeFileSync(outPath,'/* LegalOS V14 — shared safety and legal-search helpers. Loaded before app.js. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);

console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
