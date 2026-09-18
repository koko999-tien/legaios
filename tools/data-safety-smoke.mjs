import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},acceptDownloads:true});
const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
function assert(value,message){if(!value)throw new Error(message)}
let acceptImport=false,confirmations=0;
page.on('dialog',async dialog=>{confirmations++;if(acceptImport)await dialog.accept();else await dialog.dismiss()});
async function upload(data){
  await page.locator('#importFile').setInputFiles({name:'workspace.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
}
async function notes(){return page.evaluate(()=>({memory:JSON.stringify(notes),disk:localStorage.getItem('w3_notes')}))}
try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  const id=await page.evaluate(()=>D[0].id);
  await page.evaluate(id=>STORE.set('w3_notes',{[id]:'Original note retained'}),id);
  await page.reload({waitUntil:'networkidle'});
  const original=await notes();
  await upload({});
  await page.waitForFunction(()=>document.getElementById('toast').textContent.includes('không phải bản sao lưu'));
  assert(JSON.stringify(await notes())===JSON.stringify(original),'Unrelated JSON changed existing notes');
  assert(confirmations===0,'Invalid JSON should be rejected before confirmation');

  // Use the app's own export to prove backward-compatible import, not a fabricated schema.
  const downloadPromise=page.waitForEvent('download');
  await page.evaluate(()=>exportWorkspace());
  const download=await downloadPromise;
  const backup=JSON.parse(await readFile(await download.path(),'utf8'));
  backup.notes={[id]:'Restored note'};
  await upload(backup);
  await page.waitForFunction(()=>document.getElementById('toast').textContent==='Đã hủy nhập workspace');
  assert(confirmations===1,'Valid workspace import must request confirmation');
  assert(JSON.stringify(await notes())===JSON.stringify(original),'Cancelled import changed notes');

  acceptImport=true;
  await page.evaluate(()=>{
    const original=Storage.prototype.setItem;
    window.__testStorageSet=original;
    let failed=false;
    Storage.prototype.setItem=function(key,value){
      if(key==='w3_notes'&&!failed){failed=true;throw new DOMException('Test quota failure','QuotaExceededError')}
      return original.call(this,key,value);
    };
  });
  const before=await page.evaluate(()=>Object.fromEntries(['w3_saved','w3_recent','w3_notes','w3_proc','w3_cases','v10_expert_briefs'].map(k=>[k,localStorage.getItem(k)])));
  await upload(backup);
  await page.waitForFunction(()=>document.getElementById('toast').textContent.includes('Không thể lưu bản nhập'));
  assert(await page.locator('#storageWarning').isVisible(),'Failed storage write was not announced');
  assert(JSON.stringify(await notes())===JSON.stringify(original),'Failed import changed memory or notes');
  const after=await page.evaluate(()=>Object.fromEntries(['w3_saved','w3_recent','w3_notes','w3_proc','w3_cases','v10_expert_briefs'].map(k=>[k,localStorage.getItem(k)])));
  assert(JSON.stringify(before)===JSON.stringify(after),'Failed import left partial storage changes');
  await page.evaluate(()=>{Storage.prototype.setItem=window.__testStorageSet;delete window.__testStorageSet});
  await upload(backup);
  await page.waitForFunction(()=>document.getElementById('toast').textContent==='Đã nhập workspace');
  assert(!await page.locator('#storageWarning').count(),'Successful retry did not clear the storage warning');
  await page.reload({waitUntil:'networkidle'});
  assert(JSON.parse((await notes()).disk)[id]==='Restored note','Imported notes did not survive reload');

  // The last position within the throttle window must survive without another scroll.
  await page.evaluate(()=>{
    readingProgressSave('qa-reading-a',20,'First section');
    readingProgressSave('qa-reading-a',64,'Last section');
  });
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('v14_reading_progress')||'{}')['qa-reading-a']?.pct===64);
  await page.evaluate(()=>{
    readingProgressSave('qa-reading-a',81,'Before closing');
    window.dispatchEvent(new Event('pagehide'));
  });
  assert(await page.evaluate(()=>JSON.parse(localStorage.getItem('v14_reading_progress'))['qa-reading-a'].pct===81),'Closing the page lost pending reading progress');
  await page.evaluate(()=>{
    readingProgressSave('qa-reading-a',85,'Document A');
    readingProgressSave('qa-reading-b',31,'Document B');
    readingProgressFlush();
  });
  assert(await page.evaluate(()=>{
    const rows=JSON.parse(localStorage.getItem('v14_reading_progress'));
    return rows['qa-reading-a'].pct===85&&rows['qa-reading-b'].pct===31;
  }),'Switching documents mixed or lost reading progress');
  console.log('Data safety passed: invalid/cancelled import, quota rollback, warning/retry, export/import reload, trailing and pagehide reading saves.');
}finally{await browser.close()}
