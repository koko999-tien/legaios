import fs from 'node:fs';
import vm from 'node:vm';

const file='assets/js/knowledge-base.js';
const text=fs.readFileSync(file,'utf8');
function extract(start,end){
  const a=text.indexOf(start),b=text.indexOf(end,a);
  if(a<0||b<0)throw new Error('Cannot locate legal audit block: '+start);
  return text.slice(a+start.length,b).trim();
}
const core=vm.runInNewContext('['+extract('const CORE_IDS=[','];\n\nconst CORE_READING_CHAIN')+']');
const professor=vm.runInNewContext('({'+extract('const PROFESSOR_VERIFIED={','\n};\nfunction professorVerified')+'})');
const allowed=new Set(['vanban.chinhphu.vn','congbao.chinhphu.vn','vbpl.vn','vbpl.moj.gov.vn','chinhphu.vn']);
function releaseBaseline(){
  const override=String(process.env.LEGAL_DATA_AUDIT_AS_OF||'').trim();
  if(override){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(override))throw new Error('LEGAL_DATA_AUDIT_AS_OF must use YYYY-MM-DD');
    const parsed=new Date(override+'T00:00:00Z');
    if(Number.isNaN(parsed.getTime()))throw new Error('LEGAL_DATA_AUDIT_AS_OF is not a valid date');
    return parsed;
  }
  const now=new Date();
  return new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()));
}
const baseline=releaseBaseline();
const errors=[];
function escapeRe(s){return s.replace(/[.*+?^$()|[\]\\]/g,'\\$&')}
function metaHasSource(id){
  const e=escapeRe(id);
  const row=new RegExp('(?:^|\\n)\\s*'+e+':\\{[^\\n]*src:"https://','m');
  const assign=new RegExp('LAW_META\\.'+e+'=\\{[^\\n]*src:"https://','m');
  return row.test(text)||assign.test(text);
}
for(const id of core){
  const a=professor[id];
  if(!a){errors.push(id+': missing PROFESSOR_VERIFIED audit record');continue}
  if(!a.checked||!/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/20\d{2}$/.test(a.checked))errors.push(id+': invalid checked date');
  if(!a.source){errors.push(id+': missing official audit source')}else{
    let host='';try{host=new URL(a.source).hostname}catch{}
    if(!allowed.has(host))errors.push(id+': non-official audit source '+host);
  }
  if(!a.note||a.note.length<30)errors.push(id+': audit note is too short');
  if(a.checked){
    const [d,m,y]=a.checked.split('/').map(Number);
    const age=(baseline-new Date(Date.UTC(y,m-1,d)))/86400000;
    if(age < -1)errors.push(id+': checked date is in the future');
    if(age > 90)errors.push(id+': audit is stale ('+Math.floor(age)+' days)');
  }
  if(!metaHasSource(id))errors.push(id+': LAW_META has no official source URL');
}
if(errors.length){
  console.error('Legal-data release gate failed:');
  errors.forEach(x=>console.error('  - '+x));
  process.exit(1);
}
console.log('Legal-data release gate passed.');
console.log('  '+core.length+' core records have official source metadata');
console.log('  audit notes and checked dates are present');
console.log('  release baseline: '+baseline.toISOString().slice(0,10));
console.log('  all core audit dates are within 90 days of the release baseline');
