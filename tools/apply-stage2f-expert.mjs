import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/expert.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function phaseLabel(';
const endMarker='function syncHomeCleanMode(';
const start=app.indexOf(startMarker),end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find expert extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Expert block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');

const block=app.slice(start,end).trimEnd()+"\n";
const required=['function phaseLabel(','function collectExpertForm(','function expertAnalyzeData(','function renderExpertResult(','function analyzeExpert(','function saveExpertBrief(','function renderExpertBriefs(','function loadExpertBrief(','function renderVerifiedAudit('];
for(const token of required){if(!block.includes(token)) throw new Error(`Expected expert token missing: ${token}`)}
if(block.includes('function syncHomeCleanMode(')) throw new Error('Boundary accidentally included navigation runtime.');

const nextApp=app.slice(0,start)+app.slice(end);
const legalHubTag='<script src="assets/js/legal-hub.js"></script>';
if(!html.includes(legalHubTag)) throw new Error('legal-hub.js tag not found.');
if(html.includes('assets/js/expert.js')) throw new Error('expert.js already referenced.');
const nextHtml=html.replace(legalHubTag,legalHubTag+'\n<script src="assets/js/expert.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — expert dossier review, completeness analysis and saved expert briefs. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
