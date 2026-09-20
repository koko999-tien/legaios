import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});

function assert(condition,message){if(!condition)throw new Error(message)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(()=>window.go?.('lib'));
  await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));
  await page.waitForFunction(()=>!!window.LEGALOS_SEARCH_V2?.ready);

  const engineProbe=await page.evaluate(()=>{
    const doc=D.find(d=>/bảo vệ môi trường/i.test(d.ttl))||D[0];
    const result=legalSearchScore(doc,'luat bao ve moi truog');
    return {
      title:doc?.ttl||'',
      matched:!!result.matched,
      fuzzyHits:Number(result.fuzzyHits||0),
      coverage:Number(result.coverage||0),
      quality:String(result.quality||''),
      reasons:Array.isArray(result.reasons)?result.reasons:[]
    };
  });
  assert(engineProbe.matched,`Fuzzy engine did not match the target environmental-law document: ${engineProbe.title}`);
  assert(engineProbe.fuzzyHits>=1,`Fuzzy engine reported no typo-tolerant hits: ${JSON.stringify(engineProbe.reasons)}`);
  assert(engineProbe.reasons.some(r=>String(r).toLowerCase().includes('gần đúng')),`Fuzzy engine did not record a near-match reason: ${JSON.stringify(engineProbe.reasons)}`);
  assert(engineProbe.coverage>=0.5,`Weighted engine coverage is unexpectedly low: ${engineProbe.coverage}`);

  const q=page.locator('#q');
  await q.fill('luat bao ve moi truog');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const typoCount=await page.locator('#docs [data-open]').count();
  assert(typoCount>0,'Typo-tolerant search returned no legal documents');
  const topText=(await page.locator('#docs .doc').first().innerText()).toLowerCase();
  assert(topText.includes('môi trường')||topText.includes('moi truong'),'Top typo-search result is not environment-law related');

  const suggestion=await page.evaluate(()=>window.LEGALOS_SEARCH_V2.suggest('luat bao ve moi truog'));
  assert(/môi trường|moi truong/i.test(suggestion),`Search suggestion did not repair the typo: ${suggestion}`);

  await q.fill('nghi dinh 48 2026');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const looseNumber=(await page.locator('#docs .doc').first().innerText()).toLowerCase();
  assert(looseNumber.includes('48/2026'),`Loose legal-number query did not rank NĐ 48/2026 first: ${looseNumber.slice(0,180)}`);

  await q.fill('hoa chat nguy hiem');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const chemicalTop=(await page.locator('#docs').innerText()).toLowerCase();
  assert(chemicalTop.includes('hóa chất')||chemicalTop.includes('hoa chat'),'Chemical query did not surface the chemical corpus');

  await q.fill('epr tai che bao bi');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const eprTop=(await page.locator('#docs').innerText()).toLowerCase();
  assert(eprTop.includes('epr')||eprTop.includes('tái chế')||eprTop.includes('tai che'),'EPR query did not surface recycling/EPR material');

  await q.fill('quan trac nuoc thai');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const monitoringCount=await page.locator('#docs [data-open]').count();
  assert(monitoringCount>0,'Monitoring/wastewater query returned no documents');
  const monitoringReasons=(await page.locator('#docs .doc').first().innerText()).toLowerCase();
  assert(monitoringReasons.includes('quan trắc')||monitoringReasons.includes('nước thải')||monitoringReasons.includes('nuoc thai'),'Monitoring query returned an unrelated top result');

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

  const dmcIntent=await page.evaluate(()=>detectLegalIntent('ĐMC'));
  assert(dmcIntent.labels.includes('Câu hỏi về ĐMC'),`ĐMC intent was not recognized: ${JSON.stringify(dmcIntent)}`);
  await q.fill('ĐMC');
  await page.locator('#qBtn').click();
  await page.waitForTimeout(180);
  const dmcCount=await page.locator('#docs [data-open]').count();
  if(!dmcCount){
    const dmcDebug=await page.evaluate(()=>D.map(d=>({id:d.id,title:d.ttl,...legalSearchScore(d,'ĐMC')})).sort((a,b)=>b.score-a.score).slice(0,5).map(x=>({id:x.id,title:x.title,score:x.score,matched:x.matched,reasons:x.reasons})));
    console.error('ĐMC top candidates:',JSON.stringify(dmcDebug));
  }
  assert(dmcCount>0,'ĐMC query returned no legal documents');
  const dmcText=(await page.locator('#docs').innerText()).toLowerCase();
  assert(dmcText.includes('bảo vệ môi trường')||dmcText.includes('đmc'),'ĐMC search did not surface an environmental-law source');
  const dmcCoach=(await page.locator('#searchCoach').innerText()).toLowerCase();
  assert(dmcCoach.includes('câu hỏi về đmc'),'Search coach did not explain the ĐMC intent');

  console.log('Căn cứ Pháp lý Môi trường search quality test passed.');
  console.log(`  fuzzy engine document: ${engineProbe.title}`);
  console.log(`  fuzzy engine hits: ${engineProbe.fuzzyHits}`);
  console.log(`  weighted coverage: ${engineProbe.coverage}`);
  console.log(`  typo suggestion: ${suggestion}`);
  console.log('  loose legal-number, chemical, EPR and monitoring queries passed');
  console.log(`  typo query results: ${typoCount}`);
  console.log('  nonsense query returns zero results');
  console.log('  exact legal-number search still works');
  console.log(`  conversational GPMT query results: ${naturalCount}`);
  console.log(`  ĐMC query results: ${dmcCount}`);
}finally{
  await browser.close();
}
