import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/legal-hub.js';
const htmlPath='index.html';
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');

if(fs.existsSync(outPath)){
  console.log(`${outPath} already exists; nothing to do.`);
  process.exit(0);
}

const startMarker='const LEGAL_PACK_KEY=';
const endMarker='function phaseLabel(';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0||end<0||end<=start) throw new Error('Could not find legal-hub extraction boundaries.');
if(start!==app.search(/\S/)) throw new Error('Legal-hub block is no longer first executable content in app.js.');
if(app.indexOf(startMarker,start+1)>=0||app.indexOf(endMarker,end+1)>=0) throw new Error('Extraction boundary is not unique.');

const block=app.slice(start,end).trimEnd()+"\n";
const required=[
  'const LEGAL_PACK_KEY=',
  'function renderDataVault(',
  'function metaOf(',
  'function renderCoreKnowledge(',
  'function renderOfficialSources(',
  'const TERM_CATS=',
  'function renderTermCards(',
  'function renderUpdateStats(',
  'const IMPACT_GROUPS=',
  'function renderLawHubTab(',
  'function is2026Doc('
];
for(const token of required){if(!block.includes(token)) throw new Error(`Expected legal-hub token missing: ${token}`)}
if(block.includes('function phaseLabel(')) throw new Error('Boundary accidentally included expert-review runtime.');

const nextApp=app.slice(0,start)+app.slice(end);
const workspaceTag='<script src="assets/js/workspace.js"></script>';
if(!html.includes(workspaceTag)) throw new Error('workspace.js tag not found.');
if(html.includes('assets/js/legal-hub.js')) throw new Error('legal-hub.js already referenced.');
const nextHtml=html.replace(workspaceTag,workspaceTag+'\n<script src="assets/js/legal-hub.js"></script>');

fs.writeFileSync(outPath,'/* LegalOS V14 — legal-pack/data-vault, core knowledge, terminology and update hub. */\n'+block);
fs.writeFileSync(appPath,nextApp);
fs.writeFileSync(htmlPath,nextHtml);
console.log(`Extracted ${block.split(/\r?\n/).length} lines to ${outPath}`);
