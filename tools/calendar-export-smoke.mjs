import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1200,height:900},acceptDownloads:true});
const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
function assert(v,m){if(!v)throw new Error(m)}
try{
 await page.goto(baseURL,{waitUntil:'networkidle'});
 await page.evaluate(()=>{
   localStorage.removeItem('ccplmt_compliance_profiles_v1');
   complianceProfiles=[normalizeComplianceProfile({id:'ics-qa',name:'Nhà máy QA / Lịch',deadlines:[{id:'task-1',title:'Kiểm tra quan trắc',date:'2099-04-15',kind:'manual'}],obligations:[{id:'obl-1',title:'Báo cáo định kỳ',status:'active',dueDate:'2099-06-30',dueBasis:'manual',recurrence:'yearly'}]})];
   currentComplianceId='ics-qa';STORE.set('ccplmt_compliance_profiles_v1',complianceProfiles);go('work');renderComplianceWorkspace();
 });
 await page.waitForFunction(()=>window.CCPLMT_CALENDAR_EXPORT?.ready&&document.querySelector('[data-calendar-export-ics]'));
 const probe=await page.evaluate(()=>{const p=complianceProfile(),items=complianceCalendarItems(p),ics=CCPLMT_CALENDAR_EXPORT.build(p,items);return{ics,count:items.length}});
 assert(probe.count>=2,'Calendar export did not include compliance items');
 assert(probe.ics.includes('BEGIN:VCALENDAR')&&probe.ics.includes('END:VCALENDAR'),'ICS wrapper is invalid');
 assert(probe.ics.includes('DTSTART;VALUE=DATE:20990415'),'ICS omitted the manual compliance deadline');
 assert(probe.ics.includes('SUMMARY:Kiểm tra quan trắc'),'ICS omitted event summary');
 assert(probe.ics.includes('không xác nhận thời hạn pháp lý'),'ICS lost the legal-status caveat');
 const dl=page.waitForEvent('download');await page.locator('[data-calendar-export-ics]').click();const d=await dl;
 assert(d.suggestedFilename().endsWith('.ics'),'Calendar export did not download an .ics file');
 console.log('Compliance calendar ICS export passed.');
}finally{await browser.close()}
