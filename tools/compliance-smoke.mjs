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
  await page.locator('#work .section-head [data-compliance-new]').click();
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

  await page.evaluate(async()=>{
    const id='ci-evidence-'+Date.now();
    await importDbPut({
      id,
      name:'Bien-ban-quan-trac-QA.pdf',
      type:'application/pdf',
      ext:'pdf',
      size:128,
      category:'evidence',
      note:'CI evidence',
      linkedCase:'',
      importedAt:new Date().toISOString(),
      previewText:'Bằng chứng QA',
      extractStatus:'CI',
      blob:new Blob(['qa evidence'],{type:'application/pdf'})
    });
    await refreshImportedDocs();
  });

  await page.locator('[data-track-to-obligation="water"]').click();
  await page.locator('#oblTitle').fill('Xác minh nghĩa vụ quan trắc nước thải');
  await page.locator('#oblStatus').selectOption('active');
  await page.locator('#oblOwner').fill('Bộ phận Môi trường');
  await page.locator('#oblDueDate').fill(isoAfter(15));
  await page.locator('#oblRecurrence').selectOption('monthly');
  await page.locator('#oblDueBasis').selectOption('permit');
  await page.locator('#oblDueSource').fill('Theo lịch nội bộ đối chiếu GPMT-QA-01');
  await page.locator('#oblLegalRef').fill('Cần đối chiếu điều khoản và phụ lục trong văn bản gốc');
  await page.locator('#oblEvidenceNote').fill('Biên bản quan trắc được dùng làm bằng chứng làm việc.');
  const evidenceBox=page.locator('#obligationEditor [data-obligation-evidence-id]').first();
  assert(await evidenceBox.count()===1,'Imported evidence is not available in the obligation editor');
  await evidenceBox.check();
  await page.locator('[data-obligation-save]').click();

  const obligationText=(await page.locator('.obligation-register').innerText()).toLowerCase();
  assert(obligationText.includes('xác minh nghĩa vụ quan trắc nước thải'),'Obligation was not saved');
  assert(obligationText.includes('bộ phận môi trường'),'Obligation owner was not saved');
  assert(obligationText.includes('theo giấy phép/hồ sơ'),'Deadline source type is missing');
  assert(obligationText.includes('bien-ban-quan-trac-qa.pdf'),'Evidence reference is missing');
  assert(obligationText.includes('đang thực hiện'),'User-managed obligation status is missing');
  assert(obligationText.includes('hàng tháng'),'Recurring obligation cadence is missing');
  const calendarText=(await page.locator('.compliance-calendar').innerText()).toLowerCase();
  assert(calendarText.includes('xác minh nghĩa vụ quan trắc nước thải'),'Compliance calendar omitted the recurring obligation');
  assert(calendarText.includes('dự kiến theo chu kỳ hàng tháng'),'Compliance calendar does not distinguish projected recurring occurrences');

  const recurrenceBefore=await page.evaluate(()=>{
    const p=complianceProfiles[0],o=p.obligations[0];
    return {dueDate:o.dueDate,next:complianceNextOccurrence(o.dueDate,o.recurrence),history:o.occurrenceHistory.length};
  });
  await page.locator('[data-obligation-complete-period]').click();
  const recurrenceAfter=await page.evaluate(()=>{
    const p=complianceProfiles[0],o=p.obligations[0];
    return {dueDate:o.dueDate,history:o.occurrenceHistory.length,lastDue:o.occurrenceHistory.at(-1)?.dueDate||''};
  });
  assert(recurrenceAfter.history===recurrenceBefore.history+1,'Completing a recurring period did not append occurrence history');
  assert(recurrenceAfter.lastDue===recurrenceBefore.dueDate,'Occurrence history did not preserve the completed due date');
  assert(recurrenceAfter.dueDate===recurrenceBefore.next,'Recurring obligation did not advance to the next due date');

  await page.locator('#cpTaskTitle').fill('Kiểm tra lịch quan trắc nội bộ');
  await page.locator('#cpTaskDate').fill(isoAfter(10));
  await page.locator('[data-compliance-task-add]').click();
  assert((await page.locator('#complianceProfileDetail').innerText()).includes('Kiểm tra lịch quan trắc nội bộ'),'Manual compliance deadline was not added');
  assert((await page.locator('#complianceStats').innerText()).includes('Mục ≤30 ngày'),'Compliance deadline summary is missing');
  assert((await page.locator('#complianceStats').innerText()).includes('Nghĩa vụ đang mở'),'Open-obligation summary is missing');

  await go('home');
  assert((await page.locator('#homeCompliancePulse').innerText()).includes('Nhà máy QA'),'Home does not surface the active compliance profile');
  assert((await page.locator('#homeResumeTitle').innerText()).includes('Nhà máy QA'),'Returning-user card does not prioritize the compliance profile');

  await go('upd');
  await page.locator('[data-lawtab="impact"]').click();
  assert((await page.locator('#complianceRadarHub').innerText()).includes('Nhà máy QA'),'Legal update hub is not profile-aware');
  assert((await page.locator('#complianceRadarHub').innerText()).includes('không phải kết luận'),'Profile-aware legal updates overstate legal applicability');

  await page.evaluate(()=>openDoc('l72'));
  await page.waitForFunction(()=>document.getElementById('art')?.classList.contains('on'));
  assert(await page.locator('#art [data-obligation-from-doc="l72"]').count()===1,'Article view is missing the add-to-obligation-register action');

  const downloadPromise=page.waitForEvent('download');
  await page.evaluate(()=>exportWorkspace());
  const download=await downloadPromise;
  const path=await download.path();
  const fs=await import('node:fs/promises');
  const exported=JSON.parse(await fs.readFile(path,'utf8'));
  assert(exported.schema==='ccplmt-workspace-v4','Workspace export schema was not upgraded for recurring obligations');
  assert(Array.isArray(exported.complianceProfiles)&&exported.complianceProfiles[0]?.name==='Nhà máy QA','Workspace export omitted compliance profiles');
  assert(exported.complianceProfiles[0]?.obligations?.length===1,'Workspace export omitted obligation register entries');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.owner==='Bộ phận Môi trường','Workspace export omitted obligation ownership');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.evidence?.length===1,'Workspace export omitted evidence references');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.recurrence==='monthly','Workspace export omitted recurring cadence');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.occurrenceHistory?.length===1,'Workspace export omitted recurring occurrence history');

  await page.reload({waitUntil:'networkidle'});
  await go('work');
  assert((await page.locator('#complianceProfileList').innerText()).includes('Nhà máy QA'),'Compliance profile did not persist across reload');
  assert((await page.locator('.obligation-register').innerText()).includes('Xác minh nghĩa vụ quan trắc nước thải'),'Obligation register did not persist across reload');

  await page.setViewportSize({width:390,height:844});
  await go('work');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  assert(overflow<=1,'Compliance workspace causes mobile horizontal overflow: '+overflow+'px');

  console.log('Compliance workspace smoke test passed.');
  console.log('  profile creation + persistence checked');
  console.log('  signal-driven legal branches checked');
  console.log('  manual deadline + user-declared GPMT date checked');
  console.log('  obligation source + owner + due basis + evidence checked');
  console.log('  recurring cadence + projected calendar + period completion checked');
  console.log('  article -> obligation register action checked');
  console.log('  home pulse + profile-aware legal updates checked');
  console.log('  workspace v4 export includes recurrence history and evidence references');
  console.log('  mobile 390px overflow checked');
}finally{
  await browser.close();
}
