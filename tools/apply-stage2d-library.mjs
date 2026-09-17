import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/library.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='const LIB_FILTER_GROUPS=[';
const endMarker='function renderProcSummary()';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find library extraction boundaries.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');
const prefix=app.slice(0,start);
if(!prefix.includes('function topicName(')) throw new Error('Expected generic helpers before library block.');
const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['const LIB_FILTER_GROUPS=[','function renderLibraryTopicFilters(','function saveDoc(','function openDoc(']){if(!block.includes(token)) throw new Error(`Expected library token missing: ${token}`)}
if(block.includes('function renderProcSummary()')) throw new Error('Boundary accidentally included procedure runtime.');
const nextApp=app.slice(0,start)+app.slice(end);
const projectTag='<script src="assets/js/project-tools.js"></script>';
if(!html.includes(projectTag)) throw new Error('project-tools.js tag not found.');
if(html.includes('assets/js/library.js')) throw new Error('library.js already referenced.');
const nextHtml=html.replace(projectTag,projectTag+'\n<script src="assets/js/library.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — document library filters, saved/recent documents and article reader. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
