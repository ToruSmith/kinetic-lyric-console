/* ===== [DATA-CARTS] 使用者端「資料型卡帶」：目前只收風格包（pack）的 JSON。
   只收資料、不執行任何程式：整份內容經嚴格白名單驗證（欄位、型別、長度、鍵必須是既有設定鍵），再交給 Console.cart(…, {user:true}) 登記，
   與內建風格包走同一條路。存在這台瀏覽器的 localStorage（鍵 klpacks；讀寫失敗就當沒有存），離線渲染（RENDER）不載入——專案檔本來就帶著完整設定。
   格式見 docs/data-packs.md、範例 examples/pack.example.json。 ===== */
const UserPacks=(()=>{
 const LS="klpacks",MAX_PACKS=40,MAX_BYTES=16384,MAX_STR=400,DENY=["presetName"];
 const isObj=o=>o&&typeof o==="object"&&!Array.isArray(o);
 const TOP=["kind","apiVersion","id","label","author","license","config"];
 const known=(csv,all,what,warn)=>String(csv||"").split(",").map(x=>x.trim().split(":")[0]).filter(Boolean).forEach(n=>{if(!all.has(n))warn.push(`${what}「${n}」目前沒有這個項目，會被略過`)});
 /* 檢查並整理一份 JSON；通過回傳 {d, warn}，不通過 throw Error（訊息給使用者看） */
 function check(raw){
  const warn=[];
  if(!isObj(raw))throw new Error("內容必須是 JSON 物件");
  if(JSON.stringify(raw).length>MAX_BYTES)throw new Error(`檔案太大（上限 ${MAX_BYTES/1024} KB）`);
  const un=Object.keys(raw).filter(k=>!TOP.includes(k));if(un.length)throw new Error(`不認得的欄位：${un.join("、")}（可用：${TOP.join("、")}）`);
  if(raw.kind!=="pack")throw new Error('kind 必須是 "pack"（使用者端只能匯入風格包）');
  if(raw.apiVersion!==1)throw new Error("apiVersion 必須是 1");
  if(!isObj(raw.label)||typeof raw.label.zh!=="string")throw new Error("label.zh（風格包名稱）必填");
  const name=raw.label.zh.trim();if(!name||name.length>24)throw new Error("label.zh 要 1～24 個字");
  if(/[<>"'`\\]/.test(name))throw new Error("label.zh 不可含 < > \" ' ` \\");
  for(const k of["author","license"])if(raw[k]!==undefined&&(typeof raw[k]!=="string"||raw[k].length>60))throw new Error(`${k} 必須是 60 字以內的字串`);
  if(!isObj(raw.config)||!Object.keys(raw.config).length)throw new Error("config 必須是非空物件");
  const ks=Object.keys(raw.config);if(ks.length>80)throw new Error("config 欄位太多（上限 80）");
  const cfg={};
  for(const k of ks){
   if(DENY.includes(k))throw new Error(`config 不可包含 ${k}`);
   if(!Object.prototype.hasOwnProperty.call(CFG_DEFAULTS,k))throw new Error(`config 有不認得的設定鍵：${k}（只能用面板上有的設定）`);
   const v=raw.config[k];
   if(!(typeof v==="string"||typeof v==="number"||typeof v==="boolean"))throw new Error(`config.${k} 只能是文字、數字或 true／false`);
   if(typeof v==="string"&&v.length>MAX_STR)throw new Error(`config.${k} 太長（上限 ${MAX_STR} 字）`);
   cfg[k]=v}
  const cc=cfgClean(cfg);if(cc.bad.length)throw new Error(`config 型別不對：${cc.bad.join("、")}`);
  if(cfg.font!==undefined&&!(cfg.font in FONTS))warn.push(`字體「${cfg.font}」目前沒有載入，會改用全域字體`);
  known(cfg.sceneAll,new Set(SCENE_NAMES),"場景",warn);known(cfg.layoutPool,new Set(LAYOUTS),"版型",warn);
  return{d:{kind:"pack",apiVersion:1,label:{zh:name},author:raw.author,license:raw.license,config:cc.r},warn}}
 const mine=new Map();   /* 名稱→原始 JSON（已通過檢查） */
 const freshId=name=>{let b="user-pack-"+hashN(name),id=b,n=1;while(Console.carts.some(c=>c.kind==="pack"&&c.id===id))id=b+"-"+(++n);return id};
 function persist(){try{localStorage.setItem(LS,JSON.stringify([...mine.values()]))}catch(e){}}
 /* 匯入一份（物件）；成功回傳 {name,warn}，失敗 throw Error。同名的「自己匯入的」會被取代；與內建同名會被拒絕 */
 function add(raw,save){
  const {d,warn}=check(raw),name=d.label.zh;
  if(!mine.has(name)&&(STYLE_PACKS.has(name)||PRESETS[name]))throw new Error(`「${name}」與內建的風格包／預設組合同名，請改名`);
  if(!mine.has(name)&&mine.size>=MAX_PACKS)throw new Error(`自己匯入的風格包已達上限（${MAX_PACKS} 個），請先移除幾個`);
  if(mine.has(name))Console.removeUserPack(name);
  const err=Console.cart({...d,id:freshId(name)},{user:true});if(err)throw new Error(err.replace(/^\[cart [^\]]*\]\s*/,""));
  mine.set(name,JSON.parse(JSON.stringify({kind:"pack",apiVersion:1,label:{zh:name},author:d.author,license:d.license,config:d.config})));
  if(save!==false)persist();return{name,warn}}
 function remove(name){if(!mine.has(name))return false;Console.removeUserPack(name);mine.delete(name);persist();return true}
 /* 把目前設定存成一份風格包 JSON：只含「與出廠預設不同」的設定鍵，並排除跟這次歌曲有關的（節拍、偏移、播放進度等） */
 const SONG=["presetName","bpm","offset","beatSrc","lock","aspect","recFps","recLite","autoPerf","guides","snap","emFont"];
 function exportCurrent(name){
  const config={};for(const k of Object.keys(CFG_DEFAULTS)){if(SONG.includes(k))continue;const v=CONFIG[k];
   if(JSON.stringify(v)!==JSON.stringify(CFG_DEFAULTS[k])&&(typeof v==="string"||typeof v==="number"||typeof v==="boolean"))config[k]=v}
  return{kind:"pack",apiVersion:1,label:{zh:name},author:"",license:"",config}}
 function load(){if(RENDER)return;let a=[];try{a=JSON.parse(localStorage.getItem(LS)||"[]")}catch(e){}if(!Array.isArray(a))return;
  a.slice(0,MAX_PACKS).forEach(r=>{try{add(r,false)}catch(e){console.warn("略過一份已存的風格包："+e.message)}})}
 load();
 return Object.freeze({add,remove,check,exportCurrent,names:()=>[...mine.keys()],MAX_BYTES});
})();
