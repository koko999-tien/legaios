import fs from 'node:fs';

const appPath='assets/js/app.js';
const outPath='assets/js/boot.js';
const htmlPath='index.html';
if(!fs.existsSync(appPath)) throw new Error('app.js not found.');
if(fs.existsSync(outPath)){console.log(`${outPath} already exists; nothing to do.`);process.exit(0)}
const app=fs.readFileSync(appPath,'utf8');
const html=fs.readFileSync(htmlPath,'utf8');
const first=app.trimStart();
if(!first.startsWith('document.addEventListener("click",e=>{const stat=')) throw new Error('Unexpected remaining app.js boundary.');
if(!app.includes('document.addEventListener("DOMContentLoaded",()=>{')) throw new Error('DOMContentLoaded boot runtime not found.');
if(app.includes('function analyze(){')||app.includes('function docs(')) throw new Error('Domain runtime still remains in app.js; refusing final boot extraction.');
const oldTag='<script src="assets/js/app.js"></script>';
if(!html.includes(oldTag)) throw new Error('app.js tag not found.');
if(html.includes('assets/js/boot.js')) throw new Error('boot.js already referenced.');
const nextHtml=html.replace(oldTag,'<script src="assets/js/boot.js"></script>');
fs.writeFileSync(outPath,'/* LegalOS V14 — application boot and event wiring. */\n'+app.trimStart());
fs.writeFileSync(htmlPath,nextHtml);
fs.unlinkSync(appPath);
console.log(`Moved final compatibility runtime from ${appPath} to ${outPath}`);
