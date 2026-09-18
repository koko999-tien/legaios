import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});

function assert(condition,message){if(!condition)throw new Error(message)}

async function openDocById(id){
  await page.evaluate(docId=>window.openDoc?.(docId),id);
  await page.waitForFunction(()=>document.getElementById('art')?.classList.contains('on'));
}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});

  const core=['l72','nd08','nd05','l146','nd48','tt09','nd110','tt24epr'];
  for(const id of core){
    const meta=await page.evaluate(docId=>window.metaOf?.(docId)||null,id);
    assert(meta,'Missing metadata for '+id);
    assert(meta.src&&/^https:\/\//.test(meta.src),'Missing official source for '+id);
    assert(meta.verified===true,'Trust metadata is not verified for '+id);
    assert(meta.issued,'Missing issued date for '+id);
    assert(meta.eff,'Missing effective date for '+id);

    const review=await page.evaluate(docId=>window.professorVerified?.(docId)||null,id);
    assert(review,'Missing trust review for '+id);
    assert(review.checked==='18/09/2026','Trust review date is stale for '+id+': '+review.checked);
  }

  for(const id of ['l72','nd08','nd05']){
    const rel=await page.evaluate(docId=>window.metaOf?.(docId)?.rel||'',id);
    assert(/hết hiệu lực một phần/i.test(rel),'Partial-effect warning missing for '+id+': '+rel);
  }

  await openDocById('l72');
  const badges=(await page.locator('#abody .legal-badge-row').innerText()).trim();
  assert(/Đã kiểm chứng 18\/09\/2026/.test(badges),'Article view does not expose current trust-review date');
  assert(await page.locator('#abody a.official').count()>0,'Article view is missing official-source link');
  const coverage=(await page.locator('#abody .data-coverage').innerText()).trim();
  assert(/Nội dung đang xem: tóm tắt của hệ thống/.test(coverage),'Article does not clearly identify the system summary');
  const officialLabels=await page.locator('#abody a.official').allTextContents();
  assert(officialLabels.some(text=>/Mở văn bản gốc/.test(text)),'Official-source action is not labeled as opening the original document');

  console.log('Căn cứ Pháp lý Môi trường core legal trust test passed.');
  console.log('  8 core BVMT/EPR documents checked');
  console.log('  official source + issued/effective dates checked');
  console.log('  partial-effect warnings checked for Law 72, ND 08 and ND 05');
  console.log('  article trust badge checked');
}finally{
  await browser.close();
}
