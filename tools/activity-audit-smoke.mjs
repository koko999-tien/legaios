import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({serviceWorkers:'block'});
const page=await context.newPage({viewport:{width:1280,height:900}});
function assert(v,m){if(!v)throw new Error(m)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(()=>{
    localStorage.removeItem('v17_activity_audit');
    window.LEGALOS_ACTIVITY_AUDIT?.render();
    logActivity('doc','qa-doc-1','QA văn bản 1');
    logActivity('proc','qa-proc-1','QA quy trình 1');
  });
  await page.evaluate(()=>go('work'));
  await page.waitForFunction(()=>document.getElementById('work')?.classList.contains('on'));
  await page.waitForFunction(()=>document.getElementById('activityAuditV17'));

  const count=await page.evaluate(()=>window.LEGALOS_ACTIVITY_AUDIT?.rows().length||0);
  assert(count===2,'Activity audit did not retain two distinct events');
  const text=await page.locator('#activityAuditV17').innerText();
  assert(text.includes('QA văn bản 1')&&text.includes('QA quy trình 1'),'Activity audit UI did not render events');
  assert(text.includes('không phải log bất biến'),'Activity audit trust boundary is missing');

  const download=page.waitForEvent('download');
  await page.locator('[data-audit-export]').click();
  const dl=await download;
  assert(dl.suggestedFilename().endsWith('nhat-ky-hoat-dong.json'),'Activity audit export filename is wrong');

  page.once('dialog',d=>d.accept());
  await page.locator('[data-audit-clear]').click();
  await page.waitForFunction(()=>window.LEGALOS_ACTIVITY_AUDIT?.rows().length===0);

  console.log('Activity audit passed: capture, render, export, trust note, and clear.');
}finally{
  await context.close();
  await browser.close();
}
