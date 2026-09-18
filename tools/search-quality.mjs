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

  const engineProbe=await page.evaluate(()=>{
    const doc=D.find(d=>/bảo vệ môi trường/i.test(d.ttl))||D[0];
    const result=legalSearchScore(doc,'luat bao ve moi truog');
    return {
      title:doc?.ttl||'',
      matched:!!result.matched,
      fuzzyHits:Number(result.fuzzyHits||0),
      reasons:Array.isArray(result.reasons)?result.reasons:[]
    };
  });
  assert(engineProbe.matched,`Fuzzy engine did not match the target environmental-law document: ${engineProbe.title}`);
  assert(engineProbe.fuzzyHits>=1,`Fuzzy engine reported no typo-tolerant hits: ${JSON.stringify(engineProbe.reasons)}`);
  assert(engineProbe.reasons.some(r=>String(r).toLowerCase().includes('gần đúng')),`Fuzzy engine did not record a near-match reason: ${JSON.stringify(engineProbe.reasons)}`);

  const q=page.locator('#q');
  await q.fill('luat bao ve moi truog');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const typoCount=await page.locator('#docs [data-open]').count();
  assert(typoCount>0,'Typo-tolerant search returned no legal documents');
  const topText=(await page.locator('#docs .doc').first().innerText()).toLowerCase();
  assert(topText.includes('môi trường')||topText.includes('moi truong'),'Top typo-search result is not environment-law related');

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

  const intentProbe=await page.evaluate(()=>detectLegalIntent('Xưởng của tôi có cần giấy phép môi trường không?'));
  assert(intentProbe.labels.includes('Câu hỏi về giấy phép môi trường'),`Conversational intent was not recognized: ${JSON.stringify(intentProbe)}`);

  await q.fill('Xưởng của tôi có cần giấy phép môi trường không?');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const naturalCount=await page.locator('#docs [data-open]').count();
  assert(naturalCount>0,'Conversational GPMT question returned no legal documents');
  const coach=(await page.locator('#searchCoach').innerText()).toLowerCase();
  assert(coach.includes('câu hỏi về giấy phép môi trường'),'Search coach did not explain the detected conversational intent');
  assert(coach.includes('không phải câu trả lời có/không'),'Search coach did not preserve the no-legal-conclusion boundary');

  console.log('LegalOS search quality test passed.');
  console.log(`  fuzzy engine document: ${engineProbe.title}`);
  console.log(`  fuzzy engine hits: ${engineProbe.fuzzyHits}`);
  console.log(`  typo query results: ${typoCount}`);
  console.log('  nonsense query returns zero results');
  console.log('  exact legal-number search still works');
  console.log(`  conversational GPMT query results: ${naturalCount}`);
}finally{
  await browser.close();
}
