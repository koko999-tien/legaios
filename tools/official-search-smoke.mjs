import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900},serviceWorkers:'block'});
const page=await context.newPage();
function assert(x,m){if(!x)throw new Error(m)}
try{
  let officialRequests=0;
  await page.route('**/*',route=>{
    const url=new URL(route.request().url());
    if(url.pathname!=='/.netlify/functions/official-search')return route.continue();
    officialRequests++;
    return route.fulfill({
      status:200,
      contentType:'application/json',
      body:JSON.stringify({
        query:url.searchParams.get('q')||'',
        provider:'mock',
        verified:false,
        results:[
          {title:'Nghị định 48/2026/NĐ-CP',url:'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=187432',host:'vbpl.vn'},
          {title:'Hệ thống văn bản Chính phủ',url:'https://vanban.chinhphu.vn/',host:'vanban.chinhphu.vn'}
        ],
        directSources:[{name:'CSDL quốc gia VBPL',url:'https://vbpl.vn/Pages/vbpq-timkiem.aspx',host:'vbpl.vn'}]
      })
    });
  });
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(()=>window.go?.('lib'));
  await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));
  await page.waitForFunction(()=>window.LEGALOS_OFFICIAL_SEARCH_V4?.ready);
  const privacy=(await page.locator('.official-search-v4-privacy').innerText()).toLowerCase();
  assert(privacy.includes('không gửi hồ sơ'),'Search V4 privacy boundary is missing');
  await page.locator('#q').fill('nước thải');
  assert(!(await page.locator('#officialSearchBtn').isDisabled()),'Search V4 button stayed disabled after entering a query');
  await page.locator('#officialSearchBtn').click();
  await page.waitForTimeout(1200);
  const probe=await page.evaluate(()=>({
    items:document.querySelectorAll('.official-search-v4-item').length,
    state:document.getElementById('officialSearchState')?.textContent||'',
    button:document.getElementById('officialSearchBtn')?.textContent||'',
    disabled:!!document.getElementById('officialSearchBtn')?.disabled,
    html:document.getElementById('officialSearchResults')?.innerHTML||''
  }));
  assert(probe.items===2,`Search V4 render probe failed: requests=${officialRequests} probe=${JSON.stringify(probe)}`);
  assert(officialRequests===1,`Expected one opt-in web request, got ${officialRequests}`);
  const links=await page.locator('.official-search-v4-item a').evaluateAll(a=>a.map(x=>x.href));
  assert(links.every(x=>/^https:\/\/(?:[^/]+\.)?(?:vbpl\.vn|vanban\.chinhphu\.vn|congbao\.chinhphu\.vn|chinhphu\.vn|vbpl\.moj\.gov\.vn)\//.test(x)),`Non-official result escaped allowlist: ${JSON.stringify(links)}`);
  const badge=(await page.locator('.official-search-v4-unverified').first().innerText()).toLowerCase();
  assert(badge.includes('chưa kiểm định'),'Web result is not visibly separated from verified local data');
  console.log('Official Search V4 browser smoke passed.');
}finally{await browser.close()}
