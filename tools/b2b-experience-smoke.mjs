import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({serviceWorkers:'block'});
const page=await context.newPage({viewport:{width:1440,height:1000}});
function assert(v,m){if(!v)throw new Error(m)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>window.LEGALOS_B2B_EXPERIENCE?.ready===true);
  assert(await page.locator('body.legalos-b2b-v17').count()===1,'B2B experience body class missing');

  await page.evaluate(()=>go('corekb'));
  await page.waitForFunction(()=>document.getElementById('corekb')?.classList.contains('on'));
  await page.waitForSelector('#interactiveLegalGraphV17');
  const nodes=await page.locator('#interactiveLegalGraphV17 [data-graph-node]').count();
  assert(nodes>=3,'Interactive legal graph has too few nodes');
  const edges=await page.locator('#interactiveLegalGraphV17 .legal-graph-edge').count();
  assert(edges>=2,'Interactive legal graph has too few edges');
  await page.locator('#interactiveLegalGraphV17 [data-graph-node]').nth(1).click();
  assert(await page.locator('#interactiveLegalGraphV17 [data-graph-node].is-active').count()===1,'Graph node selection did not activate one node');
  assert(await page.locator('#interactiveLegalGraphV17 .legal-graph-detail h3').count()===1,'Graph detail did not render');

  await page.keyboard.press('Control+k');
  await page.waitForFunction(()=>document.getElementById('cmdBg')?.classList.contains('on'));
  await page.locator('#cmdQ').fill('mẫu');
  await page.waitForTimeout(80);
  const paletteText=await page.locator('#cmdList').innerText();
  assert(paletteText.includes('ĐẾN BIỂU MẪU'),'Command palette form branch missing');
  assert(await page.locator('#cmdList [data-cmd^="form:"]').count()>=1,'Command palette form result missing');
  await page.keyboard.press('Escape');

  await page.keyboard.press('Control+k');
  await page.locator('#cmdQ').fill('phân loại dự án');
  await page.waitForTimeout(80);
  assert(await page.locator('#cmdList [data-cmd="classifier:cls"]').count()===1,'Command palette classifier branch missing');
  await page.locator('#cmdList [data-cmd="classifier:cls"]').click();
  await page.waitForFunction(()=>document.getElementById('cls')?.classList.contains('on'));

  const docId=await page.evaluate(()=>D.find(x=>x.id==='vbhn98')?.id||D[0]?.id);
  await page.evaluate(id=>openDoc(id),docId);
  await page.waitForFunction(()=>document.getElementById('art')?.classList.contains('on'));
  await page.waitForSelector('#art .reader-toc-v17');
  assert(await page.locator('#art .reader-toc-v17 button').count()>=1,'Reader sticky TOC has no navigation buttons');

  console.log('B2B experience passed: legal graph, grouped command palette, classifier branch, and reader TOC.');
}finally{
  await context.close();
  await browser.close();
}
