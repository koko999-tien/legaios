import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/search-data.js';
const htmlPath='index.html';

const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='const CLAUSE_PACK_V13={' ;
const endMarker='function clauseKey(' ;
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find safe clause-data extraction boundaries.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');

const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['const CLAUSE_PACK_V13=','const LEGAL_TRAILS_V13=']){if(!block.includes(token)) throw new Error(`Expected token missing: ${token}`)}
if(block.includes('function clauseKey(')) throw new Error('Boundary accidentally included runtime search logic.');

const nextApp=app.slice(0,start)+app.slice(end);
const utilTag='<script src="assets/js/search-utils.js"></script>';
if(!html.includes(utilTag)) throw new Error('search-utils.js tag not found.');
if(html.includes('assets/js/search-data.js')) throw new Error('search-data.js already referenced.');
const nextHtml=html.replace(utilTag,utilTag+'\n<script src="assets/js/search-data.js"></script>');

fs.writeFileSync(outPath,'/* LegalOS V14 — structured clause/trail search data. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
