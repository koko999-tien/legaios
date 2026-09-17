import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},acceptDownloads:true});
const page=await context.newPage();

function assert(condition,message){if(!condition)throw new Error(message)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>!!window.LEGALOS_DIAGNOSTICS?.snapshot);

  const sentinel='PRIVATE_DIAGNOSTIC_SENTINEL_9f13';
  await page.evaluate(value=>{
    localStorage.setItem('w3_notes',JSON.stringify({private:value}));
    localStorage.setItem('w3_cases',JSON.stringify([{name:value,input:{secret:value}}]));
    window.dispatchEvent(new ErrorEvent('error',{message:'Synthetic LegalOS diagnostic error',filename:location.origin+'/assets/js/test-probe.js',lineno:7,colno:3}));
  },sentinel);

  const snapshot=await page.evaluate(()=>window.LEGALOS_DIAGNOSTICS.snapshot());
  const text=JSON.stringify(snapshot);
  assert(snapshot.schema==='legalos-diagnostics-v1','Unexpected diagnostics schema');
  assert(snapshot.page?.route,'Diagnostics route is missing');
  assert(snapshot.display?.width===390,'Diagnostics viewport width is incorrect');
  assert(snapshot.capabilities?.localStorage===true,'Diagnostics did not verify localStorage');
  assert(snapshot.errors?.some(x=>String(x.message).includes('Synthetic LegalOS diagnostic error')),'Global browser error was not captured');
  assert(!text.includes(sentinel),'Diagnostics leaked workspace/note content');
  assert(!Object.prototype.hasOwnProperty.call(snapshot,'localStorage'),'Diagnostics must not serialize localStorage contents');

  // On mobile the discoverable path is Settings, not the desktop floating-search button.
  await page.locator('#settingsBtn').click();
  await page.waitForTimeout(80);
  assert(await page.locator('#diagExportBtn').count()===1,'Diagnostics export button is missing from settings');
  assert(await page.locator('#diagExportBtn').isVisible(),'Diagnostics export button is not visible in settings');
  await page.locator('#settingsClose').click();

  // The command palette is also available through its keyboard shortcut even when auxiliary buttons are hidden.
  await page.keyboard.press('Control+K');
  await page.locator('#cmdQ').fill('chẩn đoán');
  await page.waitForTimeout(80);
  const diag=page.locator('#cmdList [data-cmd^="diag:"]').first();
  assert(await diag.count()===1,'Diagnostics action is missing from command palette');
  const downloadPromise=page.waitForEvent('download');
  await diag.click();
  const download=await downloadPromise;
  assert(download.suggestedFilename().startsWith('LegalOS-diagnostics-'),'Diagnostics download filename is incorrect');

  console.log('LegalOS diagnostics smoke test passed.');
  console.log('  captures technical browser errors');
  console.log('  excludes workspace/note content');
  console.log('  settings exposes diagnostics export on mobile');
  console.log('  command-palette export downloads JSON');
}finally{
  await context.close();
  await browser.close();
}
