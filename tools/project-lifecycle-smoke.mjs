import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({serviceWorkers:'block'});
const page=await context.newPage({viewport:{width:1440,height:1000}});
function assert(v,m){if(!v)throw new Error(m)}

try{
 await page.goto(baseURL,{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.LEGALOS_PROJECT_LIFECYCLE?.ready===true);

 await page.evaluate(()=>{
   complianceProfiles=[normalizeComplianceProfile({id:'life-qa',name:'Nhà máy QA',profileType:'project',phase:'preparation'})];
   currentComplianceId='life-qa';
   STORE.set(COMPLIANCE_KEY,complianceProfiles);
   STORE.set('v17_project_lifecycle',{});
   go('work');
   renderComplianceWorkspace();
 });
 await page.waitForFunction(()=>document.getElementById('projectLifecycleV17'));
 assert((await page.locator('#projectLifecycleV17').innerText()).includes('Vòng đời hồ sơ môi trường'),'Lifecycle dashboard title missing');
 assert(await page.locator('#projectLifecycleV17 .lifecycle-column').count()===4,'Lifecycle must render four status columns');
 assert(await page.locator('#projectLifecycleV17 .lifecycle-card').count()===4,'Lifecycle must render four environmental stages');

 await page.locator('[data-lifecycle-stage="dtm"] [data-lifecycle-status="dtm"]').selectOption('doing');
 await page.waitForTimeout(80);
 const dtm=await page.evaluate(()=>LEGALOS_PROJECT_LIFECYCLE.store()['life-qa']?.dtm);
 assert(dtm?.status==='doing','DTM status did not persist');

 await page.locator('[data-lifecycle-stage="gpmt"] [data-lifecycle-due="gpmt"]').fill('2026-12-31');
 await page.locator('[data-lifecycle-stage="gpmt"] [data-lifecycle-note="gpmt"]').fill('Theo dõi hồ sơ GPMT QA');
 await page.waitForTimeout(420);
 const gpmt=await page.evaluate(()=>LEGALOS_PROJECT_LIFECYCLE.store()['life-qa']?.gpmt);
 assert(gpmt?.due==='2026-12-31','GPMT internal due date did not persist');
 assert(gpmt?.note==='Theo dõi hồ sơ GPMT QA','GPMT note did not persist');

 await page.evaluate(()=>LEGALOS_PROJECT_LIFECYCLE.patch('trial',{status:'blocked'}));
 await page.waitForFunction(()=>document.querySelector('[data-lifecycle-stage="trial"]')?.closest('[data-lifecycle-column]')?.dataset.lifecycleColumn==='blocked');

 const trust=await page.locator('#projectLifecycleV17 .lifecycle-trust').innerText();
 assert(trust.includes('do người dùng thiết lập')&&trust.includes('nguồn pháp luật chính thức'),'Lifecycle trust boundary missing');

 console.log('Project lifecycle passed: four stages, Kanban status, due date, note persistence, and trust boundary.');
}finally{
 await context.close();
 await browser.close();
}
