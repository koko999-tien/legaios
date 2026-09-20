import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1200,height:900},serviceWorkers:'block'});
const page=await context.newPage();
function assert(v,m){if(!v)throw new Error(m)}
let requests=0,lastPayload=null;

await page.route('**/*',async route=>{
  const req=route.request(),url=new URL(req.url());
  if(url.pathname!=='/.netlify/functions/grounded-ai')return route.continue();
  requests++;
  lastPayload=JSON.parse(req.postData()||'{}');
  return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({
    answer:'Từ căn cứ đã chọn, nội dung này cần tiếp tục đối chiếu tại nguồn gốc. [1]\n\nCăn cứ\n[1] Căn cứ thử nghiệm',
    model:'mock-grounded',
    sourceCount:Array.isArray(lastPayload.sources)?lastPayload.sources.length:0
  })});
});

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(()=>{localStorage.removeItem('v13_citation_basket');citationBasketV13=[];go('memo')});
  await page.waitForFunction(()=>document.getElementById('memo')?.classList.contains('on'));
  await page.waitForSelector('#groundedAiPanel');
  await page.locator('#groundedAiQuestion').fill('Tôi cần kiểm tra gì từ các căn cứ này?');
  await page.waitForFunction(()=>window.CCPLMT_GROUNDED_AI?.ready);

  await page.locator('#groundedAiAsk').click();
  await page.waitForFunction(()=>document.getElementById('groundedAiStatus')?.textContent.includes('ít nhất một căn cứ'));
  assert(requests===0,'Grounded AI made a network request without saved citations');

  await page.evaluate(()=>{addCitationV13(D[0].id);window.CCPLMT_GROUNDED_AI.sync()});
  await page.waitForFunction(()=>document.getElementById('groundedAiSourceCount')?.textContent.includes('1 căn cứ'));
  await page.locator('#groundedAiQuestion').fill('Từ căn cứ này, điểm nào cần kiểm tra thêm?');
  await page.locator('#groundedAiAsk').click();
  await page.waitForFunction(()=>document.querySelector('.grounded-ai-output')?.textContent.includes('[1]'));

  assert(requests===1,`Expected exactly one grounded AI request, got ${requests}`);
  assert(lastPayload?.question==='Từ căn cứ này, điểm nào cần kiểm tra thêm?','Grounded AI question payload changed unexpectedly');
  assert(Array.isArray(lastPayload?.sources)&&lastPayload.sources.length===1,'Grounded AI did not send exactly the selected citation');
  assert(Object.keys(lastPayload).sort().join(',')==='question,sources','Grounded AI payload contains unexpected top-level workspace data');
  const source=lastPayload.sources[0];
  assert(!('note' in source)&&!('profile' in source)&&!('file' in source),'Grounded AI leaked private note/profile/file fields');
  assert(['id','document','label','source','text'].every(k=>k in source),'Grounded AI source payload is missing provenance fields');

  const answer=(await page.locator('#groundedAiAnswer').innerText()).toLowerCase();
  assert(answer.includes('mock-grounded'),'Grounded AI UI did not show provider/model provenance');
  assert(answer.includes('căn cứ đã gửi'),'Grounded AI UI did not show the sent-source list');

  const cite=page.locator('.grounded-ai-cite').first();
  assert(await cite.textContent()==='[1]','Grounded AI did not render an interactive citation marker');
  await cite.click();
  await page.waitForFunction(()=>document.getElementById('art')?.classList.contains('on'));
  assert(await page.locator('#abody h1').count()===1,'Grounded AI citation marker did not open the linked legal document');

  await page.locator('#groundedAiClear').click();
  assert((await page.locator('#groundedAiQuestion').inputValue())==='','Grounded AI clear did not reset the question');
  console.log('Grounded AI smoke passed: no-source guard, payload privacy, citation-only request, answer provenance.');
}finally{await browser.close()}
