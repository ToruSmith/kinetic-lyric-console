/* ===== [FX-ENTER-EXIT] 退場表 EXTRA_EX / 持續特效表 FXH（wave shimmer gradient-flow chromatic outline-pulse highlight-word）/ ring 輔助 / 版型 B：scroll orbit diagonal marquee circle-badge zoom-tunnel split-screen ===== */
let scr=[],curFont="";
const HOLD=[{opacity:1,filter:"none"},{opacity:1,offset:.85},{opacity:0}];
const EXTRA_EX={shatter:HOLD};
const EXTRA_FK={};
const EXIT_C={};   /* 逐字退場：EXIT_C[名稱]=(字元素,索引,總字數,種子亂數)=>{kf,dur(占退場長度比例,預設.6),at(延遲比例),ease}；整句版放在 EXTRA_EX 當沒有 .ch 時的退路 */
const tel=fw=>[...fw.querySelectorAll('[style*="font-family"]')],cl=fw=>[...fw.querySelectorAll(".ch")];
const FXH={};
const ring=(c,txt,n,css,R,cfg)=>{const r=document.createElement("div");r.className="w";c.appendChild(r);
 const t=[...txt];while(t.length<n)t.push(...[...txt,"・"]);t.length=Math.max(n,1);
 t.forEach((ch,i)=>{const a=cfg.arc?(i/(t.length-1||1)-.5)*cfg.arc:i*360/t.length,e=txtEl(`left:50%;top:50%;${css};transform:translate(-50%,-50%) rotate(${a}deg) translateY(-${R}cqh)`);e.textContent=ch;r.appendChild(e);A(e,[{opacity:0},{opacity:1}],{duration:D()*.5,delay:i*(cfg.step||40)})});return r};
ENTERS.push("scramble","split-reveal");EXITS.push("shatter");
/* ===== 階段 2（JIZURA 移植）：新增進場／退場／保持。只往表裡加，不改既有項目；進場的表在 04-anim.js 的 enter()。
   來源對照（JIZURA key）：blur-stagger＝blurStagger／track-in＝trackIn／skew-in＝skewIn／wipe＝wipe／clock-wipe＝clockWipe／neon-on＝neonOn；
   vacuum＝vacuumOut／sweep-cover＝sweepCover／wipe-out＝wipe／clock-out＝clockOut；breathe＝breathe／track-breathe＝trackBreathe／zoom-slow＝zoomSlow／focus-rack＝focusRack。
   部分部品改寫自 JIZURA（原作者 hakoniwa，MIT，備份於 ToruSmith/JIZURA；授權全文見根目錄 LICENSE）：只讀數值與動作設計，用關鍵影格重寫。 ===== */
/* 時計ワイプ：conic-gradient 遮罩，角度寫死在 36 段關鍵影格裡（相鄰兩段的遮罩圖會交叉淡化，看起來是連續掃過）。
   不能用「註冊 --ang 再在遮罩裡 var(--ang)」：動畫值裡的 var() 取的是動畫前的底值，--ang 動起來遮罩也不會跟著變（已在 Chromium 實測）。
   純時間函數（WAAPI 暫停＋由時間設定）。不支援 conic 遮罩時退回斜向擦除（CLOCK_DIAG）。 */
const CLOCK_OK=!!(window.CSS&&CSS.supports&&(CSS.supports("mask-image","conic-gradient(#000 0deg,transparent 0)")||CSS.supports("-webkit-mask-image","conic-gradient(#000 0deg,transparent 0)")));
const CLOCK_KF=inn=>{const a=[];for(let k=0;k<=36;k++){const d=(10*k).toFixed(0),m=inn?`conic-gradient(#000 ${d}deg,transparent 0)`:`conic-gradient(transparent ${d}deg,#000 0)`;a.push({maskImage:m,WebkitMaskImage:m,offset:k/36})}return a},
 CLOCK_DIAG=["polygon(-1% 0,0% 0,-30% 100%,-1% 100%)","polygon(-1% 0,130% 0,100% 100%,-1% 100%)"];
/* 退場 */
{const BAR="linear-gradient(var(--a),var(--a))";
Object.assign(EXTRA_EX,{
 "clock-out":CLOCK_OK?CLOCK_KF(0):[{clipPath:CLOCK_DIAG[1]},{clipPath:CLOCK_DIAG[0]}]})}
/* 保持 */
ENTERS.push("blur-stagger","track-in","skew-in","wipe","clock-wipe","neon-on");EXITS.push("clock-out");
