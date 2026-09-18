import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();

function assert(condition,message){if(!condition)throw new Error(message)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>!!window.LEGALOS_IDB_RESILIENCE);

  const result=await page.evaluate(async()=>{
    const id='ci-idb-'+Date.now();
    const rec={
      id,
      name:'CI storage probe.txt',
      type:'text/plain',
      ext:'txt',
      size:12,
      category:'reference',
      note:'probe',
      linkedCase:'',
      importedAt:new Date().toISOString(),
      previewText:'LegalOS IndexedDB probe',
      extractStatus:'CI',
      blob:new Blob(['hello legalos'],{type:'text/plain'})
    };
    const ready=await window.LEGALOS_IDB_RESILIENCE.ready();
    const put=await importDbPut(rec);
    const got=await importDbGet(id);
    const all=await importDbAll();
    const deleted=await importDbDelete(id);
    const after=await importDbGet(id);
    return {ready,put,got:got&&{id:got.id,name:got.name,previewText:got.previewText},inAll:all.some(x=>x.id===id),deleted,after};
  });

  assert(result.ready,'Resilient IndexedDB layer did not open');
  assert(result.put,'IndexedDB put fell back unexpectedly');
  assert(result.got?.name==='CI storage probe.txt','IndexedDB get did not return the stored record');
  assert(result.got?.previewText==='LegalOS IndexedDB probe','Stored text was corrupted');
  assert(result.inAll,'Stored record was missing from getAll');
  assert(result.deleted,'IndexedDB delete failed');
  assert(result.after===null,'Deleted record is still readable');

  console.log('Căn cứ Pháp lý Môi trường IndexedDB resilience test passed.');
  console.log('  open / put / get / getAll / delete checked');
}finally{
  await browser.close();
}
