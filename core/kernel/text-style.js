/* ===== [STYLE] 文字樣式（@）ST / STC / applyStyles、副文（||）addSub。全部以時間驅動（A() 暫停動畫 + 種子亂數），離線渲染可重現 ===== */
const tEls=c=>[...c.querySelectorAll("[data-t]")];
const isV=e=>/^vertical/.test(e.style.writingMode||"");
const charify=c=>{tEls(c).forEach(e=>{if(!isV(e)&&!e.querySelector(".ch")&&!e.children.length&&e.textContent.trim()){const t=e.textContent;e.textContent="";chars(t,e)}});return[...c.querySelectorAll(".ch")]};
const addSh=(e,s)=>{e.style.textShadow=[e.style.textShadow,s].filter(Boolean).join(",")};
const _lv=e=>{const c=[...e.querySelectorAll(".ch")];return c.length?c:[e]};   /* 逐字拆開時，背景裁字／偽元素要畫在每個字上（同 gradient-flow） */
const ST={
 neon:e=>addSh(e,"0 0 .06em #fff,0 0 .3em var(--a),0 0 .7em var(--a),0 0 1.4em var(--a)"),
 "glow-soft":e=>addSh(e,"0 0 .3em rgba(255,255,255,.45),0 0 .9em color-mix(in srgb,var(--a) 70%,transparent)"),
 chromatic:e=>addSh(e,CONFIG.ghostOn?`-.04em 0 color-mix(in srgb,${hex6(CONFIG.ghostA,"#ff285a")} 85%,transparent),.04em 0 color-mix(in srgb,${hex6(CONFIG.ghostB,"#00dcff")} 85%,transparent)`:"-.04em 0 rgba(255,40,90,.85),.04em 0 rgba(0,220,255,.85)"),
 longshadow:e=>addSh(e,Array.from({length:30},(_,i)=>`${(i+1)*.022}em ${(i+1)*.022}em 0 color-mix(in srgb,var(--a) 55%,#000)`).join(",")),
 trail:e=>addSh(e,Array.from({length:8},(_,i)=>`${-(i+1)*.05}em 0 ${(i+1)*.012}em rgba(255,255,255,${(.34-i*.04).toFixed(2)})`).join(",")),
 outline:e=>{e.style.color="transparent";e.style.webkitTextStroke=".04em var(--c)"},
 stamp:e=>Object.assign(e.style,{border:".07em solid var(--a)",color:"var(--a)",padding:".08em .3em",width:"fit-content",marginInline:"auto",rotate:"-4deg",borderRadius:".1em"}),
 /* ---- 階段 3 新增（概念參考 JIZURA 文字加工，MIT；自行以 CSS 實作）---- */
 "double-line":e=>{_lv(e).forEach(x=>{x.style.color="transparent";x.style.webkitTextStroke=".12em var(--a)";x.style.paintOrder="stroke fill";x.dataset.dl=x.textContent})},   /* 二重縁：外層粗描邊（強調色）＋偽元素 ::after（style.css）疊細描邊（字色） */
 "emphasis-dot":e=>{e.style.textEmphasis="filled dot var(--a)";e.style.webkitTextEmphasis="filled dot var(--a)";e.style.textEmphasisPosition=isV(e)?"over right":"over"},
 "shadow-stack":e=>addSh(e,".04em 0 0 color-mix(in srgb,var(--a) 70%,transparent),.08em 0 0 color-mix(in srgb,var(--a) 45%,transparent),.12em 0 0 color-mix(in srgb,var(--a) 22%,transparent)"),
 "split-tone":e=>_lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(180deg,var(--c) 50%,var(--a) 50%)";x.style.webkitBackgroundClip=x.style.backgroundClip="text";x.style.color="transparent";x.style.webkitTextFillColor="transparent"})
};
const STC={
 gradient:c=>{tEls(c).filter(isV).forEach(e=>{e.style.background="linear-gradient(180deg,var(--c),var(--a))";e.style.webkitBackgroundClip=e.style.backgroundClip="text";e.style.color="transparent"});const ch=charify(c),n=Math.max(1,ch.length-1);ch.forEach((x,i)=>{x.style.color=`color-mix(in srgb,var(--c) ${Math.round(100-i/n*100)}%,var(--a))`})},
 karaoke:(c,sb,dur)=>{tEls(c).filter(isV).forEach(e=>{e.style.background="linear-gradient(180deg,#fff 50%,rgba(255,255,255,.3) 50%)";e.style.backgroundSize="100% 200%";e.style.webkitBackgroundClip=e.style.backgroundClip="text";e.style.color="transparent";A(e,[{backgroundPosition:"0 100%"},{backgroundPosition:"0 0"}],{duration:dur*1000,easing:"linear"})});const ch=charify(c),n=Math.max(1,ch.length),t=dur*1000/n;ch.forEach((x,i)=>{x.style.color="rgba(255,255,255,.3)";A(x,[{color:"rgba(255,255,255,.3)"},{color:"#fff",textShadow:"0 0 .4em var(--a)"}],{duration:t,delay:i*t,easing:"linear"})})},
 "gloss-sweep":(c,sb,dur)=>{   /* 光澤掃過：每個字畫亮帶漸層（不畫在父層），逐字延遲掃一次，不循環 */
  const ch=charify(c),els=ch.length?ch:tEls(c).filter(isV);
  els.forEach((x,i)=>{x.style.backgroundImage="linear-gradient(100deg,var(--c) 38%,#fff 50%,var(--c) 62%)";x.style.backgroundSize="300% 100%";x.style.webkitBackgroundClip=x.style.backgroundClip="text";x.style.color="transparent";x.style.webkitTextFillColor="transparent";
   A(x,[{backgroundPosition:"100% 0"},{backgroundPosition:"0% 0"}],{duration:900,delay:D()*.6+i*70,easing:"ease-in-out"})})},
 glitch:c=>{const b="drop-shadow(-.04em 0 rgba(255,40,90,.85)) drop-shadow(.04em 0 rgba(0,220,255,.85))",s="steps(1,end)";
  tEls(c).forEach((e,i)=>A(e,[{translate:"0 0",filter:"none",easing:s},{translate:".02em 0",filter:b,offset:.06,easing:s},{translate:"-.03em .01em",filter:b,offset:.09,easing:s},{translate:"0 0",filter:"none",offset:.12,easing:s},{translate:"-.015em 0",filter:b,offset:.56,easing:s},{translate:"0 0",filter:"none",offset:.59}],{duration:1800+i*230,iterations:Infinity}))}
};
function applyStyles(c,sb,dur){
 let st=(sb.st||"").split(",").filter(x=>ST[x]||STC[x]);
 if(st.length>3){note("單句最多同時 3 個樣式，已忽略多餘的");st=st.slice(0,3)}
 if(st.includes("karaoke")&&st.includes("gradient"))note("karaoke 與 gradient 同時使用會搶同一個顏色，以 karaoke 為準");
 const stRank=k=>k==="underline"||k==="strike"?2:k==="karaoke"?1:0;st.sort((a,b)=>stRank(a)-stRank(b));   /* 底線要畫在每個字上，所以排在會拆字的樣式之後 */
 st.forEach(k=>{if(ST[k])tEls(c).forEach(e=>ST[k](e));else STC[k](c,sb,dur)})}
const SUB_OWN=new Set();   /* 自己負責畫副文（||）的版型（ruby／footnote），addSub 不再重複畫 */
function addSub(sb,c,small,left){
 if(!sb.sub||SUB_OWN.has(sb.lay))return;
 const e=txtEl(`${left?"left:6cqw;bottom:6.5cqh;":"left:0;right:0;bottom:6cqh;text-align:center;padding-left:.55em;"}font-size:${small*.62}px;letter-spacing:.55em;font-weight:300;white-space:pre-wrap`);
 delete e.dataset.t;e.textContent=sb.sub;c.appendChild(e);A(e,[{opacity:0},{opacity:.6}],{duration:D()*1.4,delay:D()*.6})}

/* ===== [COLOR] 每句顏色：寫在 @ 樣式欄裡的 鍵=值（與樣式名稱用逗號隔開，不佔「最多 3 個樣式」的名額）=====
   @c=字色 a=強調色 sh=陰影色（none＝關閉）plate=底板色 dim=光圈壓暗 0–100 pal=色組名稱（CONFIG.palettes）。色碼可寫 #1a1208、1a1208 或 3 碼。
   沒寫時完全不介入。粒子、場景等畫在畫布上的氛圍特效仍用全域強調色。 */
const COLOR_KEYS=["c","a","sh","plate","dim","pal"];
const hexN=v=>{const m=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(v==null?"":v).trim());if(!m)return"";let h=m[1];if(h.length===3)h=[...h].map(x=>x+x).join("");return"#"+h.toLowerCase()};
function stKV(st){const o={};(st||"").split(",").forEach(t=>{const i=t.indexOf("=");if(i>0)o[t.slice(0,i).trim()]=t.slice(i+1).trim()});return o}
function sbColors(sb){
 const kv=stKV(sb&&sb.st),P=(kv.pal&&CONFIG.palettes&&CONFIG.palettes[kv.pal])||{},g=k=>kv[k]!==undefined?kv[k]:P[k]!==undefined?String(P[k]):undefined;
 const o={c:hexN(g("c")),a:hexN(g("a")),plate:hexN(g("plate"))},sh=g("sh"),dm=parseFloat(g("dim"));
 if(sh!==undefined)o.sh=/^(none|0|off)$/i.test(sh)?"none":hexN(sh);
 if(isFinite(dm))o.dim=Math.max(0,Math.min(100,dm));return o}
const _lum=h=>{const n=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*n[0]+.7152*n[1]+.0722*n[2]};
const colorContrast=(x,y)=>{const a=_lum(x),b=_lum(y);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
/* 底板色（拍立得相片、翻板方塊、字幕條等）：這句 plate= ＞ 色組 ＞ 全域 CONFIG.plate ＞ 版型預設 def（代表色）。
   與這句的字色對比不足 3:1 且 CONFIG.plateAuto 不是 false 時，自動改用相反明暗的底板。
   回傳 null＝沒有指定、對比也足夠 → 版型維持原本的畫法（舊專案畫面不變）。 */
function plateFor(sb,def){
 const C=sbColors(sb),txt=C.c||hexN(CONFIG.color)||"#ffffff",set=C.plate||hexN(CONFIG.plate);let p=set||hexN(def)||"#000000";
 if(CONFIG.plateAuto!==false&&colorContrast(txt,p)<3)return _lum(txt)>.3?"#141a28":"#f3eee2";
 return set?p:null}
/* 把這句的顏色寫進句子根節點：--c／--a 由所有子元素繼承；陰影沿用面板的陰影形狀（沒開陰影時用預設形狀），只換顏色 */
function applySbColors(w,sb){
 const C=sbColors(sb);if(C.c)w.style.setProperty("--c",C.c);if(C.a)w.style.setProperty("--a",C.a);
 if(C.sh==="none"){w.style.textShadow="none";w.style.setProperty("--dsh","none")}
 else if(C.sh){const c=CONFIG,on=!!c.textShadow,geo=on?`${+c.shX||0}cqh ${+c.shY||0}cqh ${Math.max(0,+c.shBlur||0)}cqh`:"0 .185cqh 1.11cqh",al=on?Math.max(0,Math.min(1,(+c.shAlpha)/100))||.35:.35,
  col=`rgba(${[1,3,5].map(i=>parseInt(C.sh.slice(i,i+2),16)).join(",")},${al})`;w.style.textShadow=`${geo} ${col}`;w.style.setProperty("--dsh",`drop-shadow(${geo} ${col})`)}
 return C}
