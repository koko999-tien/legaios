import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({serviceWorkers:'block'});
const page=await context.newPage({viewport:{width:1280,height:900}});
function assert(v,m){if(!v)throw new Error(m)}

try{
 await page.goto(baseURL,{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.LEGALOS_RECOVERY?.ready===true);
 await page.evaluate(async()=>{await LEGALOS_RECOVERY.clear();localStorage.setItem('w3_saved',JSON.stringify(['luat72']));});
 const row=await page.evaluate(()=>LEGALOS_RECOVERY.saveNow('manual',true));
 assert(row?.id,'Manual recovery snapshot was not created');

 await page.evaluate(()=>localStorage.setItem('w3_saved',JSON.stringify([])));
 const restored=await page.evaluate(async id=>LEGALOS_RECOVERY.restore(id,{confirm:false,reload:false}),row.id);
 assert(restored===true,'Recovery restore returned false');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('w3_saved')||'[]'));
 assert(saved.includes('luat72'),'Recovery restore did not restore localStorage payload');

 await page.evaluate(()=>go('work'));
 await page.waitForFunction(()=>document.getElementById('work')?.classList.contains('on'));
 await page.waitForFunction(()=>document.getElementById('workspaceRecoveryV17'));
 const text=await page.locator('#workspaceRecoveryV17').innerText();
 assert(text.includes('Điểm khôi phục trên thiết bị'),'Recovery UI did not mount');
 assert(text.includes('Không chứa byte PDF/Word'),'Recovery file-scope warning is missing');

 await page.evaluate(()=>STORE.set('w3_cases',[{id:'qa-case',name:'QA',createdAt:new Date().toISOString(),result:{group:'Chưa kết luận'},input:{}}]));
 await page.waitForTimeout(1300);
 const rows=await page.evaluate(()=>LEGALOS_RECOVERY.list());
 assert(rows.length>=2,'Automatic snapshot did not run after workspace storage mutation');

 console.log('Workspace recovery passed: manual save, restore, UI boundary, and automatic snapshots.');
}finally{
 await context.close();
 await browser.close();
}
