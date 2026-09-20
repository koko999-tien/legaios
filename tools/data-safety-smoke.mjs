import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},acceptDownloads:true});
const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
function assert(value,message){if(!value)throw new Error(message)}
let confirmations=0;
page.on('dialog',async dialog=>{confirmations++;await dialog.dismiss()});
async function upload(data){
  await page.locator('#importFile').setInputFiles({name:'workspace.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
}
async function notes(){return page.evaluate(()=>({memory:JSON.stringify(notes),disk:localStorage.getItem('w3_notes')}))}
async function respondRestore(accept){
  const dlg=page.locator('#workspaceRestorePreviewV9');
  await dlg.waitFor({state:'visible'});
  const text=(await dlg.innerText()).toLowerCase();
  assert(text.includes('xem trước khôi phục')&&text.includes('sổ giấy phép'),'Restore preview does not explain incoming workspace data');
  if(accept)await dlg.getByRole('button',{name:'Khôi phục dữ liệu'}).click();
  else await dlg.getByRole('button',{name:'Hủy'}).click();
}
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

  // Seed v8-only data before export so backup/restore coverage includes the extended workspace state.
  await page.evaluate(async id=>{
    syncQuickNote('Backup quick note QA');
    uiPrefs={scale:'large',density:'comfortable',sidebar:true};saveUIPrefs();
    readingProgressSave('qa-backup-reading',42,'Backup section');readingProgressFlush();
    citationBasketV13=[{doc:id,article:'39',clause:'',point:'',label:'Căn cứ QA',text:'Nội dung QA',note:'Ghi chú căn cứ QA',source:'',addedAt:new Date().toISOString()}];
    STORE.set('v13_citation_basket',citationBasketV13);
    await workspaceDataCall('lawWatchAddV16',[id]);
  },id);

  // Use the app's own export to prove backward-compatible import, not a fabricated schema.
  const downloadPromise=page.waitForEvent('download');
  await page.evaluate(()=>exportWorkspace());
  const download=await downloadPromise;
  const backup=JSON.parse(await readFile(await download.path(),'utf8'));
  assert(backup.schema==='ccplmt-workspace-v8','Workspace backup did not upgrade to schema v8');
  assert(backup.quickNote==='Backup quick note QA','Workspace backup omitted quick note');
  assert(backup.uiPrefs?.scale==='large'&&backup.uiPrefs?.sidebar===true,'Workspace backup omitted UI preferences');
  assert(backup.readingProgress?.['qa-backup-reading']?.pct===42,'Workspace backup omitted reading progress');
  assert(Array.isArray(backup.citationBasket)&&backup.citationBasket[0]?.label==='Căn cứ QA','Workspace backup omitted citation basket');
  assert(Array.isArray(backup.lawWatch)&&backup.lawWatch[0]?.docId===id,'Workspace backup omitted legal-review watchlist');
  backup.notes={[id]:'Restored note'};
  await upload(backup);
  await respondRestore(false);
  await page.waitForFunction(()=>document.getElementById('toast').textContent==='Đã hủy khôi phục dữ liệu');
  assert(confirmations===0,'Workspace preview should use an in-app dialog instead of a browser confirm');
  assert(JSON.stringify(await notes())===JSON.stringify(original),'Cancelled import changed notes');

  await page.evaluate(()=>{
    const original=Storage.prototype.setItem;
    window.__testStorageSet=original;
    let failed=false;
    Storage.prototype.setItem=function(key,value){
      if(key==='w3_notes'&&!failed){failed=true;throw new DOMException('Test quota failure','QuotaExceededError')}
      return original.call(this,key,value);
    };
  });
  const before=await page.evaluate(()=>Object.fromEntries(['w3_saved','w3_recent','w3_notes','w3_proc','w3_cases','v10_expert_briefs','ccplmt_compliance_profiles_v1','ccplmt_compliance_audit_v1'].map(k=>[k,localStorage.getItem(k)])));
  await upload(backup);
  await respondRestore(true);
  await page.waitForFunction(()=>document.getElementById('toast').textContent.includes('Không thể lưu bản nhập'));
  assert(await page.locator('#storageWarning').isVisible(),'Failed storage write was not announced');
  assert(JSON.stringify(await notes())===JSON.stringify(original),'Failed import changed memory or notes');
  const after=await page.evaluate(()=>Object.fromEntries(['w3_saved','w3_recent','w3_notes','w3_proc','w3_cases','v10_expert_briefs','ccplmt_compliance_profiles_v1','ccplmt_compliance_audit_v1'].map(k=>[k,localStorage.getItem(k)])));
  assert(JSON.stringify(before)===JSON.stringify(after),'Failed import left partial storage changes');
  await page.evaluate(()=>{Storage.prototype.setItem=window.__testStorageSet;delete window.__testStorageSet});
  await upload(backup);
  await respondRestore(true);
  await page.waitForFunction(()=>document.getElementById('toast').textContent==='Đã khôi phục dữ liệu');
  assert(!await page.locator('#storageWarning').count(),'Successful retry did not clear the storage warning');
  await page.reload({waitUntil:'networkidle'});
  assert(JSON.parse((await notes()).disk)[id]==='Restored note','Imported notes did not survive reload');
  const restoredExtras=await page.evaluate(()=>({
    quickNote,
    scale:uiPrefs.scale,
    sidebar:uiPrefs.sidebar,
    reading:readingProgressStore()['qa-backup-reading']?.pct||0,
    citation:citationBasketV13[0]?.label||'',
    lawWatch:(JSON.parse(localStorage.getItem('v16_law_watchlist')||'[]')[0]||{}).docId||''
  }));
  assert(restoredExtras.quickNote==='Backup quick note QA','Restored quick note did not survive reload');
  assert(restoredExtras.scale==='large'&&restoredExtras.sidebar===true,'Restored UI preferences did not survive reload');
  assert(restoredExtras.reading===42,'Restored reading progress did not survive reload');
  assert(restoredExtras.citation==='Căn cứ QA','Restored citation basket did not survive reload');
  assert(restoredExtras.lawWatch===id,'Restored legal-review watchlist did not survive reload');
  const trashProbe=await page.evaluate(async()=>{
    await workspaceTrashPush('quick-note','Recover QA','Ghi chú nhanh QA');
    const id=workspaceTrashRows()[0]?.id||'';
    syncQuickNote('');
    await workspaceTrashRestore(id);
    return {quickNote,remaining:workspaceTrashRows().length};
  });
  assert(trashProbe.quickNote==='Recover QA'&&trashProbe.remaining===0,'Recovery trash did not restore and remove the recovered item');

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
  console.log('Data safety passed: restore preview, invalid/cancelled import, quota rollback, v8 extended backup/restore including legal watchlist, recovery trash, trailing and pagehide reading saves.');
}finally{await browser.close()}
