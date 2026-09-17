import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/project-tools.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function renderUpdates(';
const endMarker='function toast(';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find project-tools extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Project-tools block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');
const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function renderUpdates(','function validateClassifier(','function applyPreset(','function renderRiskMeter(','function caseExport(']){if(!block.includes(token)) throw new Error(`Expected project-tool token missing: ${token}`)}
if(block.includes('function toast(')) throw new Error('Boundary accidentally included generic UI helpers.');
const nextApp=app.slice(0,start)+app.slice(end);
const activityTag='<script src="assets/js/activity-workspace.js"></script>';
if(!html.includes(activityTag)) throw new Error('activity-workspace.js tag not found.');
if(html.includes('assets/js/project-tools.js')) throw new Error('project-tools.js already referenced.');
const nextHtml=html.replace(activityTag,activityTag+'\n<script src="assets/js/project-tools.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — update feed, screening presets, risk meter and case export. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
