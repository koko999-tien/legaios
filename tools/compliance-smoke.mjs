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
    localStorage.removeItem('ccplmt_compliance_audit_v1');
    complianceProfiles=[];
    complianceAudit=[];
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
  await page.locator('#oblLegalDoc').selectOption('vbhn98');
  await page.locator('#oblLegalDoc').evaluate(el=>el.dispatchEvent(new Event('change',{bubbles:true})));
  const deepOption=page.locator('#oblDeepRef option').filter({hasText:'Điều 39'}).first();
  assert(await deepOption.count()===1,'Structured Điều 39 reference is not available for the consolidated environmental law');
  await page.locator('#oblDeepRef').selectOption(await deepOption.getAttribute('value'));
  await page.locator('#oblLegalAppendix').fill('II');
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
  assert(obligationText.includes('điều 39'),'Structured legal article is missing from the obligation row');
  assert(obligationText.includes('phụ lục ii'),'Appendix reference is missing from the obligation row');
  assert(obligationText.includes('hàng tháng'),'Recurring obligation cadence is missing');
  assert((await page.locator('.audit-list').innerText()).includes('Tạo nghĩa vụ'),'Audit trail did not record obligation creation');

  page.once('dialog',dialog=>dialog.accept());
  await page.locator('[data-obligation-delete]').first().click();
  assert(!(await page.locator('.obligation-register').innerText()).includes('Xác minh nghĩa vụ quan trắc nước thải'),'Deleted obligation is still visible');
  await page.locator('.compliance-profile-detail [data-compliance-undo-last]').click();
  assert((await page.locator('.obligation-register').innerText()).includes('Xác minh nghĩa vụ quan trắc nước thải'),'Undo did not restore the deleted obligation');
  const undoState=await page.evaluate(()=>{
    const deleted=complianceAudit.find(e=>e.action==='delete'&&e.entityType==='obligation');
    return {count:complianceAudit.length,undoneAt:deleted?.undoneAt||'',owner:complianceProfiles[0]?.obligations?.[0]?.owner||''};
  });
  assert(undoState.count>=2,'Audit trail did not persist multiple changes');
  assert(!!undoState.undoneAt,'Undo did not mark the delete audit event as undone');
  assert(undoState.owner==='Bộ phận Môi trường','Undo did not restore the full obligation snapshot');

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

  assert((await page.locator('.permit-register').innerText()).includes('GPMT-QA-01'),'Legacy GPMT fields did not migrate into Permit Register');
  await page.locator('[data-permit-new]').click();
  await page.locator('#permitType').selectOption('water');
  await page.locator('#permitStatus').selectOption('active');
  await page.locator('#permitTitle').fill('Giấy phép tài nguyên nước QA');
  await page.locator('#permitNumber').fill('TNN-QA-02');
  await page.locator('#permitIssuer').fill('Cơ quan QA');
  await page.locator('#permitIssueDate').fill(isoAfter(-30));
  await page.locator('#permitExpiryDate').fill(isoAfter(25));
  await page.locator('#permitReviewDate').fill(isoAfter(8));
  await page.locator('#permitConditions').fill('Theo dõi điều kiện trong file gốc và đối chiếu trước khi kết luận.');
  assert(await page.locator('#permitFileIds option').count()>=1,'Imported file is not available in Permit Register');
  const permitFileValue=await page.locator('#permitFileIds option').first().getAttribute('value');
  await page.locator('#permitFileIds').selectOption([permitFileValue]);
  assert(await page.locator('#permitObligationIds option').count()>=1,'Obligation is not linkable from Permit Register');
  const permitObligationValue=await page.locator('#permitObligationIds option').first().getAttribute('value');
  await page.locator('#permitObligationIds').selectOption([permitObligationValue]);
  await page.locator('[data-permit-save]').click();
  const permitText=(await page.locator('.permit-register').innerText()).toLowerCase();
  assert(permitText.includes('tnn-qa-02'),'Permit Register did not save permit number');
  assert(permitText.includes('cơ quan qa'),'Permit Register did not save issuer');
  assert(permitText.includes('1 nghĩa vụ'),'Permit Register did not preserve obligation linkage');
  const permitLinks=await page.evaluate(()=>{
    const x=complianceProfiles[0]?.permits?.find(p=>p.number==='TNN-QA-02');
    return {files:x?.fileRefs?.map(f=>f.name||f.id)||[],obligations:x?.obligationIds||[]};
  });
  assert(permitLinks.files.some(x=>x.toLowerCase().includes('bien-ban-quan-trac-qa.pdf')),'Permit Register did not preserve source file reference');
  assert(permitLinks.obligations.length===1,'Permit Register did not preserve the selected obligation link');
  assert((await page.locator('.compliance-calendar').innerText()).includes('Giấy phép tài nguyên nước QA'),'Permit review/expiry did not surface in the compliance calendar');
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('[data-permit-delete]').filter({hasText:'Xóa'}).last().click();
  assert(!(await page.locator('.permit-register').innerText()).includes('TNN-QA-02'),'Deleted permit is still visible');
  await page.locator('.compliance-profile-detail [data-compliance-undo-last]').click();
  assert((await page.locator('.permit-register').innerText()).includes('TNN-QA-02'),'Undo did not restore deleted permit');

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
  const updateText=(await page.locator('#complianceRadarHub').innerText()).toLowerCase();
  assert(updateText.includes('đang làm căn cứ cho 1 nghĩa vụ'),'Legal updates do not explain direct obligation impact');
  assert(updateText.includes('điều 39'),'Legal updates lost the structured legal reference');

  await page.evaluate(()=>openDoc('l72'));
  await page.waitForFunction(()=>document.getElementById('art')?.classList.contains('on'));
  assert(await page.locator('#art [data-obligation-from-doc="l72"]').count()===1,'Article view is missing the add-to-obligation-register action');

  const downloadPromise=page.waitForEvent('download');
  await page.evaluate(()=>exportWorkspace());
  const download=await downloadPromise;
  const path=await download.path();
  const fs=await import('node:fs/promises');
  const exported=JSON.parse(await fs.readFile(path,'utf8'));
  assert(exported.schema==='ccplmt-workspace-v7','Workspace export schema was not upgraded for Permit Register');
  assert(Array.isArray(exported.complianceProfiles)&&exported.complianceProfiles[0]?.name==='Nhà máy QA','Workspace export omitted compliance profiles');
  assert(exported.complianceProfiles[0]?.obligations?.length===1,'Workspace export omitted obligation register entries');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.owner==='Bộ phận Môi trường','Workspace export omitted obligation ownership');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.evidence?.length===1,'Workspace export omitted evidence references');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.recurrence==='monthly','Workspace export omitted recurring cadence');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.occurrenceHistory?.length===1,'Workspace export omitted recurring occurrence history');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.legalArticle==='39','Workspace export omitted structured article reference');
  assert(exported.complianceProfiles[0]?.obligations?.[0]?.legalAppendix==='II','Workspace export omitted appendix reference');
  assert(Array.isArray(exported.complianceProfiles[0]?.permits)&&exported.complianceProfiles[0].permits.length>=2,'Workspace export omitted Permit Register entries');
  assert(exported.complianceProfiles[0].permits.some(p=>p.number==='TNN-QA-02'&&p.fileRefs?.length===1&&p.obligationIds?.length===1),'Workspace export lost permit file/obligation links');
  assert(Array.isArray(exported.complianceAudit)&&exported.complianceAudit.length>=2,'Workspace export omitted compliance audit trail');
  assert(exported.complianceAudit.some(e=>e.action==='delete'&&e.undoneAt),'Workspace export lost the undone audit state');

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
  console.log('  obligation source + structured Điều/Khoản/Phụ lục + owner + due basis + evidence checked');
  console.log('  recurring cadence + projected calendar + period completion checked');
  console.log('  article -> obligation register action checked');
  console.log('  home pulse + profile-aware legal updates checked');
  console.log('  audit delete/undo + full obligation snapshot restoration checked');
  console.log('  workspace v7 export includes Permit Register, audit, structured legal refs, recurrence history and evidence references');
  console.log('  mobile 390px overflow checked');
}finally{
  await browser.close();
}
