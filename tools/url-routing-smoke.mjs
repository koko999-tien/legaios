import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({serviceWorkers:'block'});
const page=await context.newPage({viewport:{width:1280,height:900}});
function assert(v,m){if(!v)throw new Error(m)}
function u(path=''){return new URL(path,baseURL).toString()}

try{
  await page.goto(u('?page=lib&q=GPMT'),{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));
  assert(await page.locator('#q').inputValue()==='GPMT','Library deep link did not restore q');
  assert(new URL(page.url()).searchParams.get('page')==='lib','Library deep link lost page parameter');

  const ids=await page.evaluate(()=>({doc:D[0]?.id,proc:P[0]?.id}));
  assert(ids.doc&&ids.proc,'Test data is missing document/procedure ids');

  await page.goto(u('?page=art&doc='+encodeURIComponent(ids.doc)),{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.getElementById('art')?.classList.contains('on'));
  assert(await page.locator('#abody h1').count()===1,'Document deep link did not open article view');
  assert(new URL(page.url()).searchParams.get('doc')===ids.doc,'Document deep link lost doc id');

  await page.goto(u('?page=pone&proc='+encodeURIComponent(ids.proc)),{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.getElementById('pone')?.classList.contains('on'));
  assert(await page.locator('#pbody h1').count()===1,'Procedure deep link did not open procedure view');

  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.locator('nav.links [data-go="lib"]').first().click();
  await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));
  assert(new URL(page.url()).searchParams.get('page')==='lib','Navigation did not push page route');

  await page.locator('#q').fill('nước thải');
  await page.waitForTimeout(220);
  assert(new URL(page.url()).searchParams.get('q')==='nước thải','Library search was not reflected in URL');

  await page.locator('nav.links [data-go="work"]').first().click();
  await page.waitForFunction(()=>document.getElementById('work')?.classList.contains('on'));
  assert(new URL(page.url()).searchParams.get('page')==='work','Workspace navigation did not update URL');

  await page.goBack();
  await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));
  assert(await page.locator('#q').inputValue()==='nước thải','Back navigation did not restore library query');

  console.log('URL routing passed: deep links, query sync, and back navigation.');
}finally{
  await context.close();
  await browser.close();
}
