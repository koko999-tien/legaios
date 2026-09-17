import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();

function assert(condition,message){if(!condition)throw new Error(message)}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  const results=await page.evaluate(()=>{
    const payloads=[
      '<script>alert(1)</script><p onclick="alert(1)">Nội dung</p>',
      '<a href="javascript:alert(1)" onmouseover="alert(1)">Link xấu</a>',
      '<svg><a xlink:href="javascript:alert(1)">x</a></svg><p>SVG</p>',
      '<math><mi xlink:href="data:x,<script>alert(1)</script>">x</mi></math><p>Math</p>',
      '<iframe srcdoc="<script>alert(1)</script>"></iframe><p>Frame</p>',
      '<form><input name="location"><button formaction="javascript:alert(1)">x</button></form><p>Form</p>',
      '<p id="__proto__" name="constructor" style="background:url(javascript:alert(1))" onfocus="alert(1)">Safe text</p>',
      '<template><img src=x onerror=alert(1)></template><p>Template</p>',
      '<a href="https://example.com/path" target="evil" rel="opener">Nguồn tốt</a>'
    ];
    return payloads.map(raw=>({raw,clean:sanitizeImportedLegalHtml(raw)}));
  });

  for(const {clean} of results){
    const lower=clean.toLowerCase();
    assert(!/<\s*(script|style|iframe|object|embed|svg|math|form|input|button|select|textarea|template)\b/.test(lower),`Dangerous element survived sanitizer: ${clean}`);
    assert(!/\son[a-z]+\s*=/.test(lower),`Event-handler attribute survived sanitizer: ${clean}`);
    assert(!/javascript\s*:/i.test(clean),`javascript: URL survived sanitizer: ${clean}`);
    assert(!/\s(?:id|name|style|srcdoc|formaction)\s*=/.test(lower),`Dangerous/clobbering attribute survived sanitizer: ${clean}`);
  }

  const good=results.at(-1).clean;
  assert(/href="https:\/\/example\.com\/path"/.test(good),'Safe HTTPS link was removed');
  assert(/target="_blank"/.test(good),'Safe external link did not receive target=_blank');
  assert(/rel="noopener noreferrer"/.test(good),'Safe external link did not receive noopener/noreferrer');

  console.log('LegalOS sanitizer security test passed.');
  console.log(`  attack payloads checked: ${results.length-1}`);
  console.log('  safe HTTPS link preservation checked');
}finally{
  await browser.close();
}
