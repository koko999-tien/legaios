(function(){
'use strict';let task=null;
function load(){
 if(window.CCPLMT_FULL_BACKUP?.ready)return Promise.resolve(window.CCPLMT_FULL_BACKUP);
 if(task)return task;
 task=new Promise((resolve,reject)=>{
  const s=document.createElement('script');s.src='assets/backup/full-backup.js';s.async=true;
  s.onload=()=>window.CCPLMT_FULL_BACKUP?.ready?resolve(window.CCPLMT_FULL_BACKUP):reject(new Error('Full backup did not initialize'));
  s.onerror=()=>{task=null;reject(new Error('Full backup failed to load'))};document.head.appendChild(s);
 });
 return task;
}
document.addEventListener('click',e=>{
 const b=e.target?.closest?.('[data-full-backup-action]');if(!b)return;e.preventDefault();
 const old=b.textContent;b.disabled=true;b.textContent='Đang xử lý…';
 load().then(api=>api.run(b.dataset.fullBackupAction)).catch(err=>{console.error(err);typeof toast==='function'&&toast('Không thể tải phần sao lưu đầy đủ')}).finally(()=>{b.disabled=false;b.textContent=old});
});
window.CCPLMT_FULL_BACKUP_LOADER={load};
})();