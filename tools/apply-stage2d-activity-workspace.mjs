import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/activity-workspace.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}

const startMarker='function currentPage(){';
const endMarker='function renderUpdates(';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find activity/workspace extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Activity/workspace block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');
const block=app.slice(start,end).trimEnd()+"\n";
for(const token of ['function currentPage(','function setCrumb(','function logActivity(','function renderHomeActivity(','function toggleCompare(','function renderWorkspaceStats(']){if(!block.includes(token)) throw new Error(`Expected token missing: ${token}`)}
if(block.includes('function renderUpdates(')) throw new Error('Boundary accidentally included updates runtime.');
const nextApp=app.slice(0,start)+app.slice(end);
const shellTag='<script src="assets/js/ui-shell.js"></script>';
if(!html.includes(shellTag)) throw new Error('ui-shell.js tag not found.');
if(html.includes('assets/js/activity-workspace.js')) throw new Error('activity-workspace.js already referenced.');
const nextHtml=html.replace(shellTag,shellTag+'\n<script src="assets/js/activity-workspace.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — navigation state, recent activity, comparison and workspace summary UI. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
