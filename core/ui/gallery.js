/* ===== [GALLERY] 效果圖鑑：看真實引擎的動畫、依情緒與特徵篩選、挑選後複製給 AI =====
   試看時暫時把 subs 換成一句範例，關閉時完整還原，不寫入歷史、不存檔、不改任何句子。
   開啟時是真正的模態：擋住頂欄、編輯器、快捷鍵與拖放，避免匯出或編輯到範例句；點空白處或按 Esc 關閉。
   ?pick=enter:rise,fx:breathe 只帶效果名稱：名稱必須已登記，否則略過；絕不載入程式碼（見架構文件第 7 節）。 */
const GAL_KINDS=[["enter","進場"],["exit","退場"],["fx","特效"],["style","樣式"],["layout","版型"],["scene","場景"]];
const GAL_TEXT="看見{流星}",GAL_LEN=3,GAL_LEAD=.2;
function galTag(kind,n,pos){const L=kind==="layout"?n:"center",E=kind==="enter"?n:"fade",X=kind==="exit"?n:"fade",P=pos&&!(kind==="layout"&&FULLBLEED.has(n))?"^"+pos:"";
 return`#${L}+${E}+${X}${kind==="fx"?"~"+n:""}${P}${kind==="style"?"@"+n:""}${kind==="scene"?`&${n}:100`:""}`}
function galNames(kind){return{enter:ENTERS,exit:EXITS,fx:FXS,style:[...Object.keys(ST),...Object.keys(STC)],layout:LAYOUTS,scene:SCENE_NAMES}[kind]}
function galLab(kind,n){return kind==="layout"?LAB_LAYOUTS.has(n):kind==="scene"&&!!SCENES[n].lab}
function galDesc(kind,n){const c=Console.carts.find(x=>x.kind===kind&&x.id===n),s=(c&&c.label.zh)||(EFFECT_DESC[kind]&&EFFECT_DESC[kind][n])||"";return s.replace(/\*\*吃 `\{\}`\*\*[：:]?\s*/,"").replace(/[`*◆]/g,"").trim()}
function galItems(kind){return[...new Set(galNames(kind))].map(n=>({kind,name:n,desc:galDesc(kind,n),meta:effectMeta(kind,n)||{energy:"",mood:[],tags:[],use:""},lab:galLab(kind,n)}))}
function galFilter(items,o){const w=(o.q||"").toLowerCase().split(/\s+/).filter(Boolean);return items.filter(x=>(o.lab||!x.lab)&&(!o.energy||x.meta.energy===o.energy)&&(!o.mood||x.meta.mood.includes(o.mood))&&w.every(t=>[x.name,x.desc,x.meta.use,...x.meta.mood,...x.meta.tags].join(" ").toLowerCase().includes(t)))}
function galParsePicks(s){const ok=new Set(GAL_KINDS.map(k=>k[0]));return[...new Set(String(s||"").split(",").map(t=>t.trim()).filter(Boolean))].map(t=>{const i=t.indexOf(":");return[t.slice(0,i),t.slice(i+1)]}).filter(([k,n])=>ok.has(k)&&galNames(k).includes(n)).map(([k,n])=>`${k}:${n}`)}
function galCopyText(picks,memo){const zh=Object.fromEntries(GAL_KINDS);
 const L=picks.map(p=>{const i=p.indexOf(":"),k=p.slice(0,i),n=p.slice(i+1),m=effectMeta(k,n);return`- ${zh[k]} \`${n}\`：${galDesc(k,n)}${m?`（${m.use}）`:""}`});
 return`我在動態歌詞圖鑑選了這些效果，請只用這些替歌詞上標記：\n${L.join("\n")}${memo?`\n備註：${memo}`:""}\n連結參數：?pick=${picks.join(",")}`}
const GAL=(()=>{
 if(RENDER)return{open(){},close(){},isOn:()=>false};
 const S={kind:"enter",q:"",energy:"",mood:"",lab:false,picks:[],sel:""};let saved=null,box=null,list=null,tray=null,scrim=null;
 const mk=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
 function preview(kind,n){
  const t=`1\n00:00:00,200 --> 00:00:03,200\n${galTag(kind,n,innerWidth<=760?"tc":"")} ${GAL_TEXT}\n`;
  subs=parseSRT(t);vt=0;cur=-2;lastBuilt=-1;playing=true;S.sel=`${kind}:${n}`;
  if(CONFIG.lock)note("目前有鎖定版型，版型試看會被鎖定覆蓋")}
 function drawTray(){tray.textContent="";
  const head=mk("div","gt",`已選 ${S.picks.length} 個`),memo=mk("input","gm");memo.placeholder="備註，例如：副歌用這些";memo.value=S.memo||"";memo.oninput=()=>S.memo=memo.value;
  const copy=mk("button","primary","複製給 AI"),clr=mk("button","","清空");copy.disabled=clr.disabled=!S.picks.length;
  copy.onclick=()=>galCopy(galCopyText(S.picks,S.memo));clr.onclick=()=>{S.picks=[];draw()};
  const row=mk("div","gr");row.append(copy,clr);tray.append(head,memo,row)}
 function card(x){const id=`${x.kind}:${x.name}`,on=S.picks.includes(id),d=mk("div","gc"+(S.sel===id?" cur":""));d.tabIndex=0;d.dataset.id=id;
  const top=mk("div","gh");top.append(mk("code","",x.name));if(x.meta.energy)top.append(mk("span","gb",{low:"低能量",mid:"中能量",high:"高能量"}[x.meta.energy]));
  const pick=mk("button","gp"+(on?" on":""),on?"已選":"選取");pick.setAttribute("aria-pressed",on);
  pick.onclick=e=>{e.stopPropagation();S.picks=on?S.picks.filter(p=>p!==id):[...S.picks,id];draw()};top.append(pick);
  d.append(top,mk("div","gd",x.desc));if(x.meta.use)d.append(mk("div","gu",x.meta.use));if(x.meta.mood.length)d.append(mk("div","gt2",x.meta.mood.join("・")));
  const go=()=>{preview(x.kind,x.name);list.querySelector(".gc.cur")?.classList.remove("cur");d.classList.add("cur")};
  d.onclick=go;d.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.stopPropagation();go()}};return d}
 function draw(){
  box.querySelectorAll("[data-gk]").forEach(b=>b.classList.toggle("on",b.dataset.gk===S.kind));
  const a=galFilter(galItems(S.kind),S);list.textContent="";box.querySelector("#galN").textContent=`${a.length} 個`;
  a.forEach(x=>list.append(card(x)));if(!a.length)list.append(mk("div","qe","找不到符合的效果"));drawTray()}
 function build(){
  box=mk("div");box.id="gal";box.setAttribute("role","dialog");box.setAttribute("aria-label","效果圖鑑");
  const h=mk("div","gtop");h.append(mk("b","","效果圖鑑"),Object.assign(mk("span","qh"),{id:"galN"}));const x=mk("button","","關閉");x.id="galX";x.onclick=close;h.append(x);
  const tabs=mk("div","gtabs");GAL_KINDS.forEach(([k,z])=>{const b=mk("button","",z);b.dataset.gk=k;b.onclick=()=>{S.kind=k;draw()};tabs.append(b)});
  const q=mk("input");q.id="galQ";q.placeholder="搜尋：抒情、模糊、rise…";q.setAttribute("aria-label","搜尋效果");q.oninput=()=>{S.q=q.value;draw()};
  const en=mk("select");en.id="galE";en.setAttribute("aria-label","能量");[["","全部能量"],["low","低能量"],["mid","中能量"],["high","高能量"]].forEach(([v,t])=>en.add(new Option(t,v)));en.onchange=()=>{S.energy=en.value;draw()};
  const mo=mk("select");mo.id="galM";mo.setAttribute("aria-label","情緒");mo.add(new Option("全部情緒",""));[...new Set(Object.values(BUILTIN_META).flatMap(o=>Object.values(o)).flatMap(m=>m.mood).concat(Console.carts.flatMap(c=>c.meta?c.meta.mood:[])))].sort().forEach(v=>mo.add(new Option(v,v)));mo.onchange=()=>{S.mood=mo.value;draw()};
  const lb=mk("label","gl");const ck=mk("input");ck.type="checkbox";ck.onchange=()=>{S.lab=ck.checked;draw()};lb.append(ck," 含實驗室");
  const f=mk("div","gf");f.append(q,en,mo,lb);list=mk("div","gls");tray=mk("div","gtray");
  box.append(h,tabs,f,mk("div","gn","情緒與能量是草稿，僅供參考。點效果會在畫面上試看。"),list,tray);scrim=mk("div");scrim.id="galS";scrim.onclick=close;document.body.append(scrim,box)}
 function open(){if(saved||recording)return;if(!box)build();
  saved={subs,vt,playing,hasMedia,sel:selIdx,lastBuilt};if(hasMedia)m.pause();hasMedia=false;
  box.classList.add("on");document.body.classList.add("galOn");const first=galFilter(galItems(S.kind),S)[0];if(first)preview(first.kind,first.name);draw();box.querySelector("#galQ").focus()}
 function close(){if(!saved)return;const o=saved;saved=null;box.classList.remove("on");document.body.classList.remove("galOn");
  subs=o.subs;vt=o.vt;hasMedia=o.hasMedia;cur=-2;lastBuilt=o.lastBuilt;selIdx=o.sel;playing=o.playing;$("#play").textContent=playing?"暫停":"播放";if(hasMedia&&playing)m.play();edRender()}
 TICKS.push(()=>{if(saved&&vt>=GAL_LEAD+GAL_LEN+.5){vt=0;cur=-2}if(saved&&!playing)playing=true});
 document.addEventListener("keydown",e=>{if(!saved)return;if(e.key==="Escape"){e.stopPropagation();close();return}
  const typing=box.contains(e.target)&&/INPUT|SELECT/.test(e.target.tagName),card=e.target.classList&&e.target.classList.contains("gc");
  if(card&&(e.key==="Enter"||e.key===" "))return;if(e.key==="Tab"||(typing&&!e.ctrlKey&&!e.metaKey))return;e.stopImmediatePropagation();if(!typing&&(e.key===" "||e.ctrlKey||e.metaKey))e.preventDefault()},true);
 ["dragover","drop"].forEach(t=>document.addEventListener(t,e=>{if(saved){e.preventDefault();e.stopImmediatePropagation()}},true));
 const p=new URLSearchParams(location.search).get("pick");
 if(p!==null)window.addEventListener("load",()=>{S.picks=galParsePicks(p);if(S.picks.length){S.kind=S.picks[0].split(":")[0];open();note(`已載入 ${S.picks.length} 個選取的效果`)}});
 return{open,close,isOn:()=>!!saved,state:S}})();
function galCopy(text){const done=()=>note("已複製，可以貼給 AI"),fall=()=>{const t=document.createElement("textarea");t.value=text;document.body.append(t);t.select();let ok=false;try{ok=document.execCommand("copy")}catch(e){}t.remove();ok?done():prompt("請手動複製：",text)};
 navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(text).then(done,fall):fall()}
$("#galb").onclick=()=>GAL.isOn()?GAL.close():GAL.open();
