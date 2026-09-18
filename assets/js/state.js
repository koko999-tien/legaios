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
      // Restore only keys written by this attempt; keep in-memory workspace unchanged.
      for(const k of written.reverse()){
        try{const old=previous.get(k);if(old===null)window.localStorage.removeItem(k);else window.localStorage.setItem(k,old)}catch{this.warn(k)}
      }
      this.warn('workspace-import');return false;
    }
  }
};
document.addEventListener('DOMContentLoaded',()=>STORE.showWarning(),{once:true});
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

/* Shared view/search state used across classic-script modules. */
let compareSelected=[];
let currentCaseId=null;
let currentUpdateYear="all";
let searchTimer=null;
let legalSearchMode=STORE.get("v11_search_mode","smart");
let legalSearchHistory=STORE.get("v11_search_history",[]);
let currentArticleDocId=null;
let coreKbTheme="all";
