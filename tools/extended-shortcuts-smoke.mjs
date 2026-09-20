import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({serviceWorkers:'block',acceptDownloads:true});
const page=await context.newPage({viewport:{width:1280,height:900}});
function assert(v,m){if(!v)throw new Error(m)}

try{
 await page.goto(baseURL,{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.LEGALOS_EXTENDED_SHORTCUTS?.ready===true);

 await page.keyboard.press('Alt+6');
 await page.waitForFunction(()=>document.getElementById('upd')?.classList.contains('on'));
 assert(new URL(page.url()).searchParams.get('page')==='upd','Alt+6 did not route to updates');

 await page.keyboard.press('Alt+2');
 await page.waitForFunction(()=>document.getElementById('lib')?.classList.contains('on'));
 assert(new URL(page.url()).searchParams.get('page')==='lib','Alt+2 did not route to library');

 await page.evaluate(()=>go('home'));
 const download=page.waitForEvent('download');
 await page.keyboard.press('Control+e');
 const dl=await download;
 assert(dl.suggestedFilename().endsWith('.json'),'Ctrl+E did not trigger workspace JSON export');

 await page.locator('#openShortcuts').click();
 const text=await page.locator('#shortcutsModal').innerText();
 assert(text.includes('Ctrl E')&&text.includes('Alt 8'),'Shortcut modal did not document extended shortcuts');

 console.log('Extended shortcuts passed: Alt navigation, Ctrl+E export, and shortcut help.');
}finally{
 await context.close();
 await browser.close();
}
