import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});

function assert(condition,message){if(!condition)throw new Error(message)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(()=>window.go?.('lib'));
  await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));

  const boxes=page.locator('#docs [data-compare]');
  assert(await boxes.count()>=2,'Need at least two legal documents for compare smoke test');
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await page.locator('#compareOpen').click();
  await page.waitForFunction(()=>document.getElementById('compareModal')?.classList.contains('on'));

  assert(await page.locator('#compareBody .compare-structured').count()===1,'Structured compare summary is missing');
  assert(await page.locator('#compareBody .compare-fact-row').count()>=7,'Structured compare metadata rows are incomplete');
  assert(await page.locator('#compareBody .compare-ref-col').count()===3,'Legal-reference comparison columns are incomplete');
  assert(await page.locator('#compareBody .compare-grid .compare-col').count()===2,'Side-by-side legal summaries are missing');

  const overflow=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(overflow.scroll<=overflow.viewport+2,`Compare modal overflows mobile viewport: ${overflow.scroll}px > ${overflow.viewport}px`);

  console.log('LegalOS structured compare smoke test passed.');
  console.log('  metadata comparison rendered');
  console.log('  common/unique legal-reference groups rendered');
  console.log('  mobile viewport has no horizontal overflow');
}finally{
  await browser.close();
}
