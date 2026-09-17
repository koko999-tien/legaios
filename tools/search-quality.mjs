import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});

function assert(condition,message){if(!condition)throw new Error(message)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(()=>window.go?.('lib'));
  await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));
  await page.waitForFunction(()=>!!window.LEGALOS_FUZZY_SEARCH);

  const q=page.locator('#q');
  await q.fill('luat bao ve moi truog');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const typoCount=await page.locator('#docs [data-open]').count();
  assert(typoCount>0,'Typo-tolerant search returned no legal documents');
  const topText=(await page.locator('#docs .doc').first().innerText()).toLowerCase();
  assert(topText.includes('môi trường')||topText.includes('moi truong'),'Top typo-search result is not environment-law related');
  const reasons=(await page.locator('#docs .doc').first().innerText()).toLowerCase();
  assert(reasons.includes('gần đúng')||reasons.includes('khớp'),'Typo-search result does not expose match reasoning');

  await q.fill('zzzzzzzzzzzzzz');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(150);
  const nonsenseCount=await page.locator('#docs [data-open]').count();
  assert(nonsenseCount===0,`Nonsense query should return zero results, got ${nonsenseCount}`);

  await q.fill('72/2020/QH14');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(150);
  const exactText=(await page.locator('#docs .doc').first().innerText()).toLowerCase();
  assert(exactText.includes('72/2020')||exactText.includes('bảo vệ môi trường'),'Exact legal-number search regressed');

  console.log('LegalOS search quality test passed.');
  console.log(`  typo query results: ${typoCount}`);
  console.log('  nonsense query returns zero results');
  console.log('  exact legal-number search still works');
}finally{
  await browser.close();
}
