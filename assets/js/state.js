const $=id=>document.getElementById(id);

const STORE={
  get(k,fb){try{const v=JSON.parse(window.localStorage.getItem(k));return v??fb}catch{return fb}},
  failedKeys:new Set(),
  warn(k){this.failedKeys.add(k);this.showWarning()},
  showWarning(){
    if(!document.body)return;
    let notice=$('storageWarning');
    if(!this.failedKeys.size){notice?.remove();return}
    if(notice)return;
    notice=document.createElement('div');notice.id='storageWarning';notice.setAttribute('role','alert');
    notice.style.cssText='position:sticky;top:0;z-index:400;padding:12px 16px;background:#fff4ce;color:#493500;font-size:14px;line-height:1.5;border-bottom:2px solid #8a6500';
    notice.textContent='Không thể lưu một số thay đổi trên thiết bị này. Giữ trang đang mở và sao chép nội dung vừa nhập trước khi tải lại hoặc đóng trang.';
    document.body.prepend(notice);
  },
  set(k,v){try{window.localStorage.setItem(k,JSON.stringify(v));this.failedKeys.delete(k);this.showWarning();return true}catch{this.warn(k);return false}},
  setBatch(entries){
    const previous=new Map(),written=[];
    try{
      const encoded=entries.map(([k,v])=>[k,JSON.stringify(v)]);
      for(const [k] of encoded)previous.set(k,window.localStorage.getItem(k));
      for(const [k,v] of encoded){window.localStorage.setItem(k,v);written.push(k)}
      entries.forEach(([k])=>this.failedKeys.delete(k));this.failedKeys.delete('workspace-import');this.showWarning();return true;
    }catch{
      for(const k of written.reverse()){
        try{const old=previous.get(k);if(old===null)window.localStorage.removeItem(k);else window.localStorage.setItem(k,old)}catch{this.warn(k)}
      }
      this.warn('workspace-import');return false;
    }
  }
};
document.addEventListener('DOMContentLoaded',()=>STORE.showWarning(),{once:true});
const MULTITAB_DATA_KEYS=new Set(['w3_saved','w3_recent','w3_notes','w3_proc','w3_cases','v10_expert_briefs','ccplmt_compliance_profiles_v1','ccplmt_compliance_audit_v1','v8_quick_note','v13_citation_basket','v13_citation_meta','v14_reading_progress','v15_workspace_trash','v16_law_watchlist','v15_compliance_revision']);
function showExternalDataChangeNotice(){
  if(document.getElementById('externalDataChange'))return;
  const notice=document.createElement('div');notice.id='externalDataChange';notice.setAttribute('role','status');
  notice.style.cssText='position:sticky;top:0;z-index:399;display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--wb,#fff4ce);color:var(--text,#1f2937);border-bottom:1px solid var(--bd,#d7dce2);font-size:12px;line-height:1.45';
  const text=document.createElement('span');text.style.flex='1';text.textContent='Dữ liệu đã thay đổi ở tab khác. Tải lại trang trước khi tiếp tục chỉnh sửa để tránh ghi đè phiên mới hơn.';
  const reload=document.createElement('button');reload.type='button';reload.textContent='Tải lại';reload.style.cssText='min-height:34px;padding:6px 10px;border:1px solid currentColor;border-radius:6px;background:transparent;color:inherit;font-weight:700';reload.onclick=()=>location.reload();
  const close=document.createElement('button');close.type='button';close.setAttribute('aria-label','Đóng cảnh báo');close.textContent='×';close.style.cssText='min-width:34px;min-height:34px;border:0;background:transparent;color:inherit;font-size:18px';close.onclick=()=>notice.remove();
  notice.append(text,reload,close);document.body.prepend(notice);
}
window.addEventListener('storage',e=>{if(e.storageArea===localStorage&&e.key&&MULTITAB_DATA_KEYS.has(e.key)&&e.oldValue!==e.newValue)showExternalDataChangeNotice()});
let saved=STORE.get("w3_saved",[]);
let recent=STORE.get("w3_recent",[]);
let notes=STORE.get("w3_notes",{});
let procDone=STORE.get("w3_proc",{});
let cases=STORE.get("w3_cases",[]);
let lastAnalysis=null;
let expertBriefs=STORE.get("v10_expert_briefs",[]);
let lastExpertAnalysis=null;

let libraryView=STORE.get("v8_library_view","list");
let libraryDensity=STORE.get("v13_library_density","compact");
let libraryAssistOpen=STORE.get("v13_library_assist",false);
let savedOnlyMode=STORE.get("v8_saved_only",false);
let quickNote=STORE.get("v8_quick_note","");
let uiPrefs=STORE.get("v8_ui_prefs",{scale:"normal",density:"comfortable",sidebar:false});
let wizardState={pid:null,index:0};

let compareSelected=[];
let currentCaseId=null;
let currentUpdateYear="all";
let searchTimer=null;
let legalSearchMode=STORE.get("v11_search_mode","smart");
let legalSearchHistory=STORE.get("v11_search_history",[]);
let currentArticleDocId=null;
let coreKbTheme="all";
