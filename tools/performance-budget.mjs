import { readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root=process.cwd();
const KB=1024;
const limits={
  index:100*KB,
  cssTotal:220*KB,
  jsTotal:500*KB,
  shellTotal:850*KB,
  largestJs:170*KB
};

async function walk(dir){
  const out=[];
  for(const name of await readdir(dir)){
    const path=join(dir,name);
    const s=await stat(path);
    if(s.isDirectory())out.push(...await walk(path));
    else out.push({path,size:s.size});
  }
  return out;
}

function fmt(bytes){return `${(bytes/KB).toFixed(1)} KiB`}
function assertBudget(name,value,limit){
  if(value>limit)throw new Error(`${name} exceeded: ${fmt(value)} > ${fmt(limit)}`);
  console.log(`  ${name}: ${fmt(value)} / ${fmt(limit)}`);
}

const index=await stat(join(root,'index.html'));
const css=await walk(join(root,'assets','css'));
const js=await walk(join(root,'assets','js'));
const cssTotal=css.reduce((n,x)=>n+x.size,0);
const jsTotal=js.reduce((n,x)=>n+x.size,0);
const shellTotal=index.size+cssTotal+jsTotal;
const largest=[...js].sort((a,b)=>b.size-a.size)[0];

console.log('LegalOS static performance budget');
assertBudget('index.html',index.size,limits.index);
assertBudget('CSS total',cssTotal,limits.cssTotal);
assertBudget('JavaScript total',jsTotal,limits.jsTotal);
assertBudget('HTML + CSS + JS shell',shellTotal,limits.shellTotal);
assertBudget(`largest JS (${relative(root,largest.path)})`,largest.size,limits.largestJs);

console.log(`  JS files: ${js.length}`);
console.log(`  CSS files: ${css.length}`);
console.log('LegalOS performance budget passed.');
