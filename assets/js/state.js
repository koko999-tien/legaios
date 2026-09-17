const $=id=>document.getElementById(id);

const STORE={
  get(k,fb){try{const v=JSON.parse(window.localStorage.getItem(k));return v??fb}catch{return fb}},
  set(k,v){try{window.localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}}
};
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


