/* LegalOS V14 — navigation state, recent activity, comparison and workspace summary UI. */
function currentPage(){
  return document.querySelector(".page.on")?.id||"home";
}
function setCrumb(){
  document.querySelectorAll(".crumb").forEach(x=>x.remove());
  const p=currentPage();
  if(p==="home")return;
  const labels={lib:"Kho văn bản",corekb:"Văn bản trọng tâm",art:"Chi tiết văn bản",expert:"Rà soát hồ sơ",proc:"Lộ trình thủ tục",pone:"Chi tiết quy trình",cls:"Sàng lọc dự án",fee:"Phí & nghĩa vụ",term:"Thuật ngữ",import:"Nhập tài liệu",work:"Hồ sơ công việc",memo:"Căn cứ hồ sơ",upd:"Cập nhật pháp luật"};
  const page=document.querySelector(`#${p} .wrap`);
  if(!page)return;
  const c=document.createElement("div");c.className="crumb";
  c.innerHTML=`<button data-go="home" type="button">Tổng quan</button><span class="sep">/</span><span>${labels[p]||p}</span>`;
  page.insertBefore(c,page.firstChild);
}
function syncMobileNav(){
  const p=currentPage();
  document.querySelectorAll("#mobileQuick [data-go]").forEach(b=>{
    const g=b.dataset.go;
    b.classList.toggle("on",g===p||(p==="art"&&g==="lib")||(p==="pone"&&g==="proc"))
  });
}
function logActivity(type,id,label){
  let arr=STORE.get("w4_activity",[]);
  arr=[{type,id,label,at:new Date().toISOString()},...arr.filter(x=>!(x.type===type&&x.id===id))].slice(0,10);
  STORE.set("w4_activity",arr);
  renderHomeActivity();
}
function renderHomeActivity(){
  const host=$("homeActivity");if(!host)return;
  const arr=STORE.get("w4_activity",[]);
  const icon={doc:"VB",case:"HS",proc:"QT",fee:"₫"};
  host.innerHTML=arr.length?arr.slice(0,6).map(x=>`
    <div class="activity-item">
      <div class="activity-icon">${icon[x.type]||"•"}</div>
      <div><b>${esc(x.label)}</b><small>${new Date(x.at).toLocaleString("vi-VN")}</small></div>
    </div>`).join(""):`<div class="empty-mini">Chưa có hoạt động. Hãy mở một văn bản hoặc tạo hồ sơ đầu tiên.</div>`;
}
function renderHomeContinue(){
  const host=$("homeContinue");if(!host)return;
  const openSteps=[];
  P.forEach(p=>{
    const d=(procDone[p.id]||[]).length;
    if(d>0&&d<p.st.length)openSteps.push({p,d});
  });
  const latest=cases[0];
  const parts=[];
  if(openSteps.length){
    const x=openSteps[0];
    parts.push(`<div class="activity-item"><div class="activity-icon">QT</div><div class="grow"><b>${x.p.ttl}</b><small>${x.d}/${x.p.st.length} bước</small><div class="progress" style="margin-top:7px"><span style="width:${x.d/x.p.st.length*100}%"></span></div><div style="margin-top:8px"><button class="tiny" data-open-proc="${x.p.id}" type="button">Tiếp tục</button></div></div></div>`);
  }
  if(latest){
    parts.push(`<div class="activity-item"><div class="activity-icon">HS</div><div class="grow"><b>${esc(latest.name)}</b><small>Nhóm ${latest.result.group} · ${new Date(latest.createdAt).toLocaleDateString("vi-VN")}</small><div style="margin-top:8px"><button class="tiny" data-open-case="${latest.id}" type="button">Mở hồ sơ</button></div></div></div>`);
  }
  host.innerHTML=parts.length?parts.join(""):`<div class="empty-mini">Chưa có công việc dở dang.</div>`;
}
function toggleCompare(id,on){
  if(on){
    if(!compareSelected.includes(id)){
      if(compareSelected.length>=2){toast("Chỉ chọn tối đa 2 văn bản");return false}
      compareSelected.push(id)
    }
  }else compareSelected=compareSelected.filter(x=>x!==id);
  updateCompareBar();
  return true;
}
function updateCompareBar(){
  $("compareText").textContent=`Đã chọn ${compareSelected.length}/2 văn bản`;
  $("compareBar").classList.toggle("on",compareSelected.length>0);
  document.querySelectorAll("[data-compare]").forEach(c=>c.checked=compareSelected.includes(c.dataset.compare));
}
function clearCompare(){
  compareSelected=[];updateCompareBar();
}
function showCompare(){
  if(compareSelected.length!==2){toast("Chọn đúng 2 văn bản để so sánh");return}
  const a=D.find(x=>x.id===compareSelected[0]),b=D.find(x=>x.id===compareSelected[1]);
  if(!a||!b)return;
  $("compareBody").innerHTML=`<div class="compare-grid">
    <div class="compare-col"><div class="meta"><span class="tag">${a.k}</span><span class="tag">${topicName(a.t)}</span></div><h3>${a.ttl}</h3>${a.b}</div>
    <div class="compare-col"><div class="meta"><span class="tag">${b.k}</span><span class="tag">${topicName(b.t)}</span></div><h3>${b.ttl}</h3>${b.b}</div>
  </div>`;
  $("compareModal").classList.add("on");
}
function closeCompare(){$("compareModal").classList.remove("on")}

function renderWorkspaceStats(){
  if(!$("wkCases"))return;
  $("wkCases").textContent=cases.length;if($("wkExpert"))$("wkExpert").textContent=expertBriefs.length;
  $("wkSaved").textContent=saved.length;
  $("wkNotes").textContent=Object.values(notes).filter(v=>String(v).trim()).length+(String(quickNote||"").trim()?1:0);
  const total=P.reduce((n,p)=>n+p.st.length,0);
  const done=P.reduce((n,p)=>n+(procDone[p.id]||[]).length,0);
  $("wkProgress").textContent=Math.round(total?done/total*100:0)+"%";
}
