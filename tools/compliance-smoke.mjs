import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
function assert(value,message){if(!value)throw new Error(message)}
function isoAfter(days){
  const d=new Date();d.setDate(d.getDate()+days);
  return d.toISOString().slice(0,10);
}
async function go(id){
  await page.evaluate(id=>go(id),id);
  await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('on'),id);
}

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(()=>{
    localStorage.removeItem('ccplmt_compliance_profiles_v1');
    complianceProfiles=[];
    currentComplianceId=null;
  });
  await page.reload({waitUntil:'networkidle'});

  assert(await page.locator('#homeCompliancePulse [data-compliance-new]').count()===1,'Empty home state does not invite the first compliance profile');

  await go('work');
  await page.locator('[data-compliance-new]').first().click();
  await page.locator('#cpName').fill('Nhà máy QA');
  await page.locator('#cpSector').fill('Sản xuất thử nghiệm');
  await page.locator('#cpLocation').fill('KCN QA');
  await page.locator('#cpPhase').selectOption('operation');
  await page.locator('#cp-water').selectOption('yes');
  await page.locator('#cp-air').selectOption('yes');
  await page.locator('#cp-ctnh').selectOption('yes');
  await page.locator('#cp-epr').selectOption('yes');
  await page.locator('#cp-knk').selectOption('unknown');
  await page.locator('#cpGpmtNumber').fill('GPMT-QA-01');
  await page.locator('#cpGpmtExpires').fill(isoAfter(20));
  await page.locator('[data-compliance-save]').click();

  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('ccplmt_compliance_profiles_v1')||'[]').length===1);
  assert((await page.locator('#complianceProfileList').innerText()).includes('Nhà máy QA'),'Saved compliance profile is missing from the workspace');
  assert(await page.locator('#complianceProfileDetail .compliance-track').count()>=4,'Declared signals did not produce the expected legal-review branches');
  const detailText=(await page.locator('#complianceProfileDetail').innerText()).toLowerCase();
  assert(detailText.includes('không phải kết luận'),'Compliance detail lost the non-conclusion boundary');
  assert(detailText.includes('gpmt-qa-01'),'User-declared permit context is missing from task guidance');

  await page.locator('#cpTaskTitle').fill('Kiểm tra lịch quan trắc nội bộ');
  await page.locator('#cpTaskDate').fill(isoAfter(10));
  await page.locator('[data-compliance-task-add]').click();
  assert((await page.locator('#complianceProfileDetail').innerText()).includes('Kiểm tra lịch quan trắc nội bộ'),'Manual compliance deadline was not added');
  assert((await page.locator('#complianceStats').innerText()).includes('Việc ≤30 ngày'),'Compliance deadline summary is missing');

  await go('home');
  assert((await page.locator('#homeCompliancePulse').innerText()).includes('Nhà máy QA'),'Home does not surface the active compliance profile');
  assert((await page.locator('#homeResumeTitle').innerText()).includes('Nhà máy QA'),'Returning-user card does not prioritize the compliance profile');

  await go('upd');
  await page.locator('[data-lawtab="impact"]').click();
  assert((await page.locator('#complianceRadarHub').innerText()).includes('Nhà máy QA'),'Legal update hub is not profile-aware');
  assert((await page.locator('#complianceRadarHub').innerText()).includes('không phải kết luận'),'Profile-aware radar overstates legal applicability');

  const downloadPromise=page.waitForEvent('download');
  await page.evaluate(()=>exportWorkspace());
  const download=await downloadPromise;
  const path=await download.path();
  const fs=await import('node:fs/promises');
  const exported=JSON.parse(await fs.readFile(path,'utf8'));
  assert(exported.schema==='ccplmt-workspace-v2','Workspace export schema was not upgraded');
  assert(Array.isArray(exported.complianceProfiles)&&exported.complianceProfiles[0]?.name==='Nhà máy QA','Workspace export omitted compliance profiles');

  await page.reload({waitUntil:'networkidle'});
  await go('work');
  assert((await page.locator('#complianceProfileList').innerText()).includes('Nhà máy QA'),'Compliance profile did not persist across reload');

  await page.setViewportSize({width:390,height:844});
  await go('work');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  assert(overflow<=1,'Compliance workspace causes mobile horizontal overflow: '+overflow+'px');

  console.log('Compliance workspace smoke test passed.');
  console.log('  profile creation + persistence checked');
  console.log('  signal-driven legal branches checked');
  console.log('  manual deadline + user-declared GPMT date checked');
  console.log('  home pulse + profile-aware legal radar checked');
  console.log('  workspace export includes compliance profiles');
  console.log('  mobile 390px overflow checked');
}finally{
  await browser.close();
}
