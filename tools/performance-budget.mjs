import { readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root=process.cwd();
const KB=1024;
const limits={
  index:100*KB,
  cssTotal:230*KB,
  jsTotal:500*KB,
  shellTotal:850*KB,
  largestJs:170*KB,
  lazyJsTotal:52*KB,
  optionalJsTotal:12*KB,
  backupJsTotal:16*KB,
  routeJsTotal:8*KB,
  activityJsTotal:12*KB
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
const lazy=await walk(join(root,'assets','lazy'));
const optional=await walk(join(root,'assets','optional'));
const backup=await walk(join(root,'assets','backup'));
const route=await walk(join(root,'assets','route'));
const activity=await walk(join(root,'assets','activity'));
const cssTotal=css.reduce((n,x)=>n+x.size,0);
const jsTotal=js.reduce((n,x)=>n+x.size,0);
const lazyJsTotal=lazy.reduce((n,x)=>n+x.size,0);
const optionalJsTotal=optional.reduce((n,x)=>n+x.size,0);
const backupJsTotal=backup.reduce((n,x)=>n+x.size,0);
const routeJsTotal=route.reduce((n,x)=>n+x.size,0);
const activityJsTotal=activity.reduce((n,x)=>n+x.size,0);
const shellTotal=index.size+cssTotal+jsTotal;
const largest=[...js].sort((a,b)=>b.size-a.size)[0];

console.log('Căn cứ Pháp lý Môi trường static performance budget');
assertBudget('index.html',index.size,limits.index);
assertBudget('CSS total',cssTotal,limits.cssTotal);
assertBudget('JavaScript shell total',jsTotal,limits.jsTotal);
assertBudget('Lazy JavaScript total',lazyJsTotal,limits.lazyJsTotal);
assertBudget('Optional JavaScript total',optionalJsTotal,limits.optionalJsTotal);
assertBudget('Backup JavaScript total',backupJsTotal,limits.backupJsTotal);
assertBudget('Route JavaScript total',routeJsTotal,limits.routeJsTotal);
assertBudget('Activity JavaScript total',activityJsTotal,limits.activityJsTotal);
assertBudget('HTML + CSS + JS shell',shellTotal,limits.shellTotal);
assertBudget(`largest JS (${relative(root,largest.path)})`,largest.size,limits.largestJs);

console.log(`  shell JS files: ${js.length}`);
console.log(`  lazy JS files: ${lazy.length}`);
console.log(`  optional JS files: ${optional.length}`);
console.log(`  backup JS files: ${backup.length}`);
console.log(`  route JS files: ${route.length}`);
console.log(`  activity JS files: ${activity.length}`);
console.log(`  CSS files: ${css.length}`);
console.log('Căn cứ Pháp lý Môi trường performance budget passed.');
