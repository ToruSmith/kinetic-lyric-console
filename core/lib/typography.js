/* ===== [LIB-TYPOGRAPHY] 排版共用小工具（hair／tick／capSize／_jT／_jBrk／_jFit／_jLate…）。
   原本散在 JIZURA 移植版型的檔案裡，被許多版型共用；搬成卡帶後，卡帶經 ctx.lib 取用（見 core/api/console.js）。
   內容與搬遷前逐字相同（部分改寫自 JIZURA，原作者 hakoniwa，MIT，授權見根目錄 THIRD_PARTY_NOTICES.md）。 ===== */
const _kIn=(e,list,sb,d0,dy=1.2)=>{if(sb.en){const n0=anims.length;enter(e,sb.en,list);_jLate(n0,d0)}else A(e,[{opacity:0,transform:`translateY(${dy}cqh)`},{opacity:1,transform:"none"}],{duration:D(),delay:d0})};
const _kCjk=s=>/[^\x00-\x7f]/.test(s);
/* 取「關鍵字」：{} 內第一段；沒有就取最長的字詞（有空白時）或正中間的字。回傳 [起,止) */
function _kKey(arr,hl){
 let a=hl.indexOf(true);if(a>=0){let b=a;while(b<arr.length&&hl[b])b++;return[a,b]}
 const s=arr.join("");if(/\s/.test(s.trim())){let best=[0,0],i=0;s.split(/(\s+)/).forEach(w=>{if(w.trim()&&w.length>best[1]-best[0])best=[i,i+w.length];i+=w.length});return best}
 const m=Math.floor(arr.length/2);return[m,m+1]}
/* 進場：有指定進場就交給 enter()，並整體延後 d0；否則用預設淡入上移 */
function _lEn(sb,el,list,d0,kf){
 if(sb.en){const n0=anims.length;enter(el,sb.en,list);_jLate(n0,d0)}
 else A(el,kf||[{opacity:0,transform:"translateY(1.2cqh)"},{opacity:1,transform:"none"}],{duration:D(),delay:d0})}
/* 文字寬度（em）：用 canvas 量（含字距），量不到退回估計值 */
let _lCtx=null;
function _lW(t,fam,ls){
 try{_lCtx=_lCtx||document.createElement("canvas").getContext("2d");_lCtx.font=`${CONFIG.weight} 100px ${fam}`;
  const w=_lCtx.measureText(t).width/100;if(w>0)return w+[...t].length*ls}catch(e){}
 return _jCw(t)+[...t].length*ls}
const _lFam=()=>FONTS[curFont||CONFIG.font]||curFont||CONFIG.font;
/* hair(c,css,delay,ax,dur)：在容器 c 加一條 1px 髮絲線。css 給位置與長度（cqw／cqh）與 transform-origin，後寫的宣告會蓋掉預設（例如 background:var(--a)）。
   進場 scaleX（ax="Y" 則 scaleY）0→1；delay／dur 單位 ms，dur 預設 D()*.8。細陰影讓線在深淺背景都看得見。 */
function hair(c,css,delay=0,ax="X",dur){
 const e=document.createElement("div");e.dataset.nm=1;
 e.style.cssText=`position:absolute;height:1px;background:var(--c);box-shadow:0 0 2px rgba(0,0,0,.6);${css||""}`;c.appendChild(e);
 A(e,[{transform:`scale${ax}(0)`},{transform:`scale${ax}(1)`}],{duration:dur==null?D()*.8:dur,delay});return e}
/* tick(c,css,delay,dur)：小方點，邊長預設 .5em（可由 css 覆寫 width／height／border-radius）；進場 scale 0→1。 */
function tick(c,css,delay=0,dur){
 const e=document.createElement("div");e.dataset.nm=1;
 e.style.cssText=`position:absolute;width:.5em;height:.5em;background:var(--a);box-shadow:0 0 2px rgba(0,0,0,.6);${css||""}`;c.appendChild(e);
 A(e,[{transform:"scale(0)"},{transform:"scale(1)"}],{duration:dur==null?D()*.5:dur,delay});return e}
/* capSize(z,ratio)：字級不超過畫面高度的 ratio（預設 .28），避免大字遮影片。 */
const capSize=(z,ratio=.28)=>Math.min(z,SHd()*ratio);
/* ---- 本檔內部輔助（_j 開頭，避免和別檔撞名）---- */
const _jT=ms=>ms/CONFIG.speed*tK;
/* 依速度與短句縮放係數換算延遲／長度 */
const _jpx=x=>x.toFixed(2)+"px";
const _jN=s=>[...s].filter(c=>!/\s/.test(c)).length;
const _jFull=sb=>(sb.raw!=null?sb.raw:sb.plain).replace(/[{}]/g,"").trim();
/* {} 版型的 plain 會拿掉 {} 內的字，要完整句子改由 raw 還原；sb.hl 與它逐字對齊 */
const _jPunct=/[、。，．,.!?！？」』）)〕】》〉…ー:;：；%]/;
/* 不可出現在行首；全幅字送り也把它們黏在前一字 */
const _jOpen=/[「『（(〔【《〈“‘]/;
const _jCw=s=>[...s].reduce((a,ch)=>a+(/[\x21-\x7e]/.test(ch)?.58:1.04),0);
/* 斷行：回傳 [起,止) 索引範圍陣列（索引對齊 arr，不丟字）；先依 \n 硬斷，再依 per 平均斷；拉丁文在空白處斷，中日文不讓標點落行首 */
function _jBrk(arr,per){
 const out=[],n=arr.length,segs=[];let s=0;
 for(let i=0;i<=n;i++)if(i===n||arr[i]==="\n"){segs.push([s,i]);s=i+1}
 const push=(a,b)=>{while(a<b&&/\s/.test(arr[a]))a++;while(b>a&&/\s/.test(arr[b-1]))b--;if(b>a)out.push([a,b])};
 segs.forEach(([s0,e0])=>{
  const len=e0-s0;if(len<=per){push(s0,e0);return}
  const tg=Math.ceil(len/Math.ceil(len/per)),lat=arr.slice(s0,e0).filter(ch=>/[\x21-\x7e]/.test(ch)).length>len*.6;
  let a=s0;
  while(a<e0){
   if(e0-a<=tg){push(a,e0);break}
   let b=a+tg;
   if(lat){let j=b;while(j>a&&arr[j]!==" ")j--;if(j>a)b=j;else{j=b;while(j<e0&&arr[j]!==" ")j++;b=j}}
   else while(b<e0&&_jPunct.test(arr[b]))b++;
   push(a,b);a=b}});
 return out}
/* 字數 n 放進寬 maxW、最多 Lmax 行：回傳每行字數 per 與字級 z（cw＝每字寬度 em） */
function _jFit(n,maxW,z0,Lmax,cw){
 let per=Math.max(1,Math.floor(maxW/(z0*cw)));if(Math.ceil(n/per)>Lmax)per=Math.ceil(n/Lmax);
 return{per,z:Math.min(z0,maxW/(per*cw))}}
/* 把「這次 enter() 新建的動畫」整體往後延 ms（enter() 本身沒有 delay 參數；動畫仍是暫停＋由時間設定，依然是純函數） */
function _jLate(n0,ms){for(let i=n0;i<anims.length;i++){const f=anims[i].effect,t=f.getTiming();f.updateTiming({delay:(+t.delay||0)+ms})}}
const _jIdx=sb=>Math.max(0,subs.indexOf(sb));
/* 一行字：把 arr[a..b) 逐字放進 host，{} 內的字（hl 為 true）包進有相對定位的 span 並交給 mark(run) 加標記；回傳 .ch 元素 */
function _jRuns(host,arr,a,b,hl,ef,mark){
 let wrap=null;
 for(let j=a;j<b;j++){
  if(hl[j]){if(!wrap){wrap=document.createElement("span");wrap.style.cssText="position:relative;display:inline-block;line-height:1.1";host.appendChild(wrap);mark(wrap)}
   const s=chars(arr[j],wrap)[0];if(ef)s.style.fontFamily=ef}
  else{wrap=null;chars(arr[j],host)}}
 return[...host.querySelectorAll(".ch")]}
/* ===== [LAY-H] 版型 H（pv 風格文字型，自行實作）：scatter strip cards glow-cards layered falling formula。皆為時間純函數（A() 暫停動畫＋種子亂數 sr()）；顏色取 --c／--a。
   裝飾元素（非主文）標 data-nm（不參與位置量測）；{} 不是這些版型的關鍵字（沿用通用強調 applyHL）。 ===== */
const _fz=(sb,big,k)=>Math.min(fit(sb,big)*k,SWd()*.84/(Math.max(sb.plain.length,3)*1.15));
/* 單行字寬上限：含字距 .1em，直式畫面也放得進 */
const _chs=sb=>[...sb.plain].filter(x=>!/\s/.test(x));
