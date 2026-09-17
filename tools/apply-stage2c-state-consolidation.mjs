import fs from 'node:fs';

const appPath='assets/js/app.js';
const statePath='assets/js/state.js';
const app=fs.readFileSync(appPath,'utf8');
const state=fs.readFileSync(statePath,'utf8');

const startMarker='let compareSelected=[];';
const endMarker='function currentPage()';
const start=app.indexOf(startMarker);
const end=app.indexOf(endMarker);
if(start<0){console.log('Shared view/search state already consolidated; nothing to do.');process.exit(0)}
if(end<0||end<=start) throw new Error('Could not find state consolidation boundary.');
if(state.includes(startMarker)) throw new Error('State block already exists in state.js while still present in app.js.');

const block=app.slice(start,end).trim()+"\n";
for(const token of ['let compareSelected=[];','let searchTimer=null;','let legalSearchMode=STORE.get(','let currentArticleDocId=null;','let coreKbTheme="all";']){if(!block.includes(token)) throw new Error(`Expected state token missing: ${token}`)}
if(/\bfunction\s+/.test(block)) throw new Error('State boundary contains a function; refusing extraction.');

const nextState=state.trimEnd()+"\n\n/* Shared view/search state used across classic-script modules. */\n"+block;
const nextApp=app.slice(0,start)+app.slice(end);
fs.writeFileSync(statePath,nextState);
fs.writeFileSync(appPath,nextApp);
console.log(`Moved ${block.split(/\r?\n/).length} state lines into ${statePath}`);
