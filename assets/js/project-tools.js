/* Căn cứ Pháp lý Môi trường — update feed, screening presets, risk meter and case export. */
function renderUpdates(year=currentUpdateYear){
  currentUpdateYear=year;
  const list=NWS.filter(n=>year==="all"||String(n[0]).startsWith(year));
  $("ulist").innerHTML=list.length?list.map((n,i)=>{
    const d=D.find(x=>n[1].includes(x.ttl.split(" —")[0])||x.ttl.includes(n[1].split(" —")[0]));
    const m=d?metaOf(d.id):{};
    return `<details class="update-compact-item"${i===0?' open':''}>
      <summary><span class="update-date">${n[0]}</span><b>${n[1]}</b><span class="update-open">⌄</span></summary>
      <div class="update-compact-body"><p>${n[2]}</p><div class="row">${d?`<button class="tiny" data-open="${d.id}" type="button">Mở văn bản</button>`:''}${m.src?`<a class="tiny" href="${m.src}" target="_blank" rel="noopener">Nguồn ↗</a>`:''}</div></div>
    </details>`;
  }).join(""):`<div class="empty">Không có mục trong năm này.</div>`;
  document.querySelectorAll("#updateFilter [data-year]").forEach(b=>b.classList.toggle("on",b.dataset.year===year));
}
function validateClassifier(){
  let ok=true;
  ["cap","area","ww","tr","hz","air"].forEach(id=>{
    const el=$(id),v=Number(el.value);
    const bad=!Number.isFinite(v)||v<0;
    el.classList.toggle("invalid",bad);
    if(bad)ok=false;
  });
  if(!ok)toast("Kiểm tra lại các trường số: không được âm");
  return ok;
}
function applyPreset(name){
  const data={
    industrial:{kind:"industrial",cap:60000,area:55,ww:60,tr:70,hz:80,air:2200,sens:"no"},
    mining:{kind:"mining",cap:35000,area:45,ww:25,tr:30,hz:30,air:500,sens:"yes"},
    solar:{kind:"solar",cap:50000,area:70,ww:5,tr:5,hz:0,air:0,sens:"no"},
    clear:{kind:"other",cap:0,area:0,ww:0,tr:0,hz:0,air:0,sens:"no"}
  }[name];
  if(!data)return;
  Object.entries(data).forEach(([k,v])=>{$(k).value=v});
  if(name==="clear")$("caseName").value="";
  toast(name==="clear"?"Đã xóa dữ liệu nhập":"Đã nạp dữ liệu mẫu");
}
function renderRiskMeter(group){
  const map={IV:1,III:2,II:3,I:4},n=map[group]||1;
  return `<div class="risk-meter" aria-label="Mức sàng lọc">${[1,2,3,4].map(i=>`<span class="${i<=n?"on":""}"></span>`).join("")}</div>`;
}
function caseExport(c){
  const text=[
    `# ${c.name}`,
    ``,
    `- Thời điểm lưu: ${new Date(c.createdAt).toLocaleString("vi-VN")}`,
    `- Trạng thái phân nhóm: ${c.result.group||"Chưa kết luận"}`,
    `- ĐTM: ${c.result.dtm===null?"Cần tra đúng phụ lục/đối tượng":(c.result.dtm?"Cần rà ĐTM":"Chưa kết luận bắt buộc")}`,
    `- GPMT: ${c.result.gp===null?"Cần xác định đối tượng + nguồn thải":(c.result.gp?"Cần xem xét":"Chưa kết luận")}`,
    ``,
    `## Dữ liệu đầu vào`,
    ...Object.entries(c.input).map(([k,v])=>`- ${k}: ${v}`),
    ``,
    `## Điểm cần kiểm tra`,
    ...(c.result.notes.length?c.result.notes.map(x=>`- ${x}`):["- Không có cảnh báo kỹ thuật từ số liệu."]),
    ``,
    `## Ghi chú`,
    c.userNote||"",
    ``,
    `> Kết quả chỉ là sàng lọc học tập, không phải kết luận pháp lý.`
  ].join("\n");
  const blob=new Blob([text],{type:"text/markdown;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=(c.name.replace(/[\\/:*?"<>|]+/g,"-")||"hoso")+".md";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
