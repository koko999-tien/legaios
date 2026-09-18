import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},acceptDownloads:true});
const page=await context.newPage();

function assert(condition,message){if(!condition)throw new Error(message)}
async function verifyDownload(download,sentinel){
  assert(/^LegalOS-diagnostics-.*\.json$/.test(download.suggestedFilename()),'Diagnostics download filename is incorrect');
  assert(await download.failure()===null,'Diagnostics download failed');
  const json=await readFile(await download.path(),'utf8');
  const payload=JSON.parse(json);
  assert(payload.schema==='legalos-diagnostics-v1','Downloaded diagnostics JSON has an unexpected schema');
  assert(!json.includes(sentinel),'Downloaded diagnostics leaked private text');
  assert(!Object.hasOwn(payload,'localStorage'),'Downloaded diagnostics contains localStorage data');
}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>!!window.LEGALOS_DIAGNOSTICS?.snapshot);

  const sentinel='PRIVATE_DIAGNOSTIC_SENTINEL_9f13';
  await page.evaluate(value=>{
    localStorage.setItem('w3_notes',JSON.stringify({private:value}));
    localStorage.setItem('w3_cases',JSON.stringify([{name:value,input:{secret:value}}]));
    sessionStorage.setItem('legalos_diag_errors_v1',JSON.stringify([
      {at:new Date().toISOString(),kind:'error',message:value,source:location.origin+'/imports/'+value+'.html',line:1,col:1,private:value}
    ]));
  },sentinel);

  // Check legacy records before a new error can rewrite the session log.
  const legacy=await page.evaluate(()=>window.LEGALOS_DIAGNOSTICS.snapshot());
  assert(!JSON.stringify(legacy).includes(sentinel),'Legacy diagnostic record leaked private text');
  await page.evaluate(value=>{
    window.dispatchEvent(new ErrorEvent('error',{message:value,filename:location.origin+'/assets/js/oss-upgrades.js?private='+value,lineno:7,colno:3}));
    window.dispatchEvent(new PromiseRejectionEvent('unhandledrejection',{promise:Promise.resolve(),reason:new Error(value)}));
  },sentinel);

  const snapshot=await page.evaluate(()=>window.LEGALOS_DIAGNOSTICS.snapshot());
  const text=JSON.stringify(snapshot);
  assert(snapshot.schema==='legalos-diagnostics-v1','Unexpected diagnostics schema');
  assert(snapshot.page?.route,'Diagnostics route is missing');
  assert(snapshot.display?.width===390,'Diagnostics viewport width is incorrect');
  assert(snapshot.capabilities?.localStorage===true,'Diagnostics did not verify localStorage');
  assert(snapshot.errors?.some(x=>x.kind==='error'&&x.source==='/assets/js/oss-upgrades.js'&&x.line===7&&x.col===3),'Safe runtime error location was not captured');
  assert(snapshot.errors?.some(x=>x.kind==='unhandledrejection'),'Promise rejection was not captured');
  assert(!await page.evaluate(value=>sessionStorage.getItem('legalos_diag_errors_v1').includes(value),sentinel),'Session diagnostic log retained private text');
  assert(!text.includes(sentinel),'Diagnostics leaked workspace/note content');
  assert(!Object.prototype.hasOwnProperty.call(snapshot,'localStorage'),'Diagnostics must not serialize localStorage contents');

  // On mobile the discoverable path is Settings, not the desktop floating-search button.
  await page.locator('#settingsBtn').click();
  await page.waitForTimeout(80);
  assert(await page.locator('#diagExportBtn').count()===1,'Diagnostics export button is missing from settings');
  assert(await page.locator('#diagExportBtn').isVisible(),'Diagnostics export button is not visible in settings');
  const settingsDownloadPromise=page.waitForEvent('download');
  await page.locator('#diagExportBtn').click();
  const settingsDownload=await settingsDownloadPromise;
  await verifyDownload(settingsDownload,sentinel);
  await page.locator('#settingsClose').click();
  await page.waitForFunction(()=>!document.getElementById('settingsDrawer').classList.contains('on')&&!document.getElementById('drawerScrim').classList.contains('on'));

  // The command palette is also available through its keyboard shortcut even when auxiliary buttons are hidden.
  await page.keyboard.press('Control+K');
  await page.locator('#cmdQ').fill('chẩn đoán');
  await page.waitForTimeout(80);
  const diag=page.locator('#cmdList [data-cmd^="diag:"]').first();
  assert(await diag.count()===1,'Diagnostics action is missing from command palette');
  const downloadPromise=page.waitForEvent('download');
  await diag.click();
  const download=await downloadPromise;
  await verifyDownload(download,sentinel);

  console.log('LegalOS diagnostics smoke test passed.');
  console.log('  captures technical browser errors');
  console.log('  excludes workspace/note content');
  console.log('  mobile Settings exports a readable, privacy-safe JSON file');
  console.log('  command-palette export downloads JSON');
}finally{
  await context.close();
  await browser.close();
}
