/* ===== [ANIM] 動畫工具：A()（全部暫停，每幀由媒體時間設定 currentTime）/ D() / chars / txtEl / enter ===== */
function A(el,kf,o){const a=el.animate(kf,Object.assign({fill:"both",easing:"cubic-bezier(.2,.7,.2,1)"},o));a.pause();anims.push(a);return a}
let tK=1;   /* 短句縮放係數：句長放不下「進場＋退場」時等比縮短（build 內設定；一般句子恆為 1） */
const D=()=>CONFIG.enter*1000/CONFIG.speed*tK;
function chars(txt,parent,css){return[...txt].map(c=>{const s=document.createElement("span");s.className="ch";s.textContent=c;if(css)s.style.cssText=css;parent.appendChild(s);return s})}
function txtEl(css){const d=document.createElement("div");d.style.cssText=`position:absolute;font-family:${FONTS[curFont||CONFIG.font]||curFont||CONFIG.font};font-weight:${CONFIG.weight};letter-spacing:${CONFIG.spacing}em;color:var(--c);${css}`;d.dataset.t="1";return d}
/* ENTER_X：擴充進場表（src/23-motion-k.js 填入）。函式 (el,list,d)；list 為逐字元素（可能為空），自行決定逐字或整句 */
const ENTER_X={};
/* 遮罩式進退場常作用在全寬或全畫面的容器上，文字只佔其中一小塊，百分比會讓動畫一閃而過。
   build() 結束後量出實際內容範圍，把百分比換算成貼合內容的像素值；起訖仍回到原本的完整範圍，避免切掉光暈。 */
let clipQ=[];
const clipTrack=(fn,mode)=>{const n=anims.length;fn();anims.slice(n).forEach(a=>{const k=a.effect.getKeyframes();if(k.some(f=>f.clipPath)&&!k.some(f=>f.backgroundImage)&&!a.effect.target.classList.contains("ch"))clipQ.push({a,mode})})};
function clipBox(el){
 const rs=[],add=r=>{if(r.width>0&&r.height>0)rs.push(r)},box=el.getBoundingClientRect(),all=[el,...el.querySelectorAll("*")];
 const rg=document.createRange();
 for(const e of all){
  if(e.classList.contains("w")&&e!==el&&!e.textContent.trim())continue;
  if([...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())){rg.selectNodeContents(e);add(rg.getBoundingClientRect())}
  if(e===el)continue;
  const r=e.getBoundingClientRect(),cs=getComputedStyle(e);
  if(r.width*r.height>box.width*box.height*.8)continue;
  if(e.tagName==="CANVAS"||e.tagName==="svg"||cs.backgroundImage!=="none"||cs.backgroundColor!=="rgba(0, 0, 0, 0)"||parseFloat(cs.borderTopWidth)||parseFloat(cs.borderLeftWidth)||parseFloat(cs.borderBottomWidth))add(r)}
 if(!rs.length)return null;
 const l=Math.min(...rs.map(r=>r.left)),t=Math.min(...rs.map(r=>r.top)),R=Math.max(...rs.map(r=>r.right)),B=Math.max(...rs.map(r=>r.bottom)),p=Math.max(4,(B-t)*.12);
 return{l:l-box.left-p,t:t-box.top-p,w:R-l+p*2,h:B-t+p*2,W:box.width,H:box.height}}
function clipMap(v,b){
 const px=n=>n.toFixed(2)+"px",num=s=>parseFloat(s)||0,X=s=>b.l+num(s)/100*b.w,Y=s=>b.t+num(s)/100*b.h;
 let m=v.match(/^inset\(([^)]*)\)$/);
 if(m){const q=m[1].trim().split(/\s+/),T=q[0],Rr=q[1]??T,Bb=q[2]??T,Ll=q[3]??Rr;return`inset(${px(b.t+num(T)/100*b.h)} ${px(b.W-b.l-b.w+num(Rr)/100*b.w)} ${px(b.H-b.t-b.h+num(Bb)/100*b.h)} ${px(b.l+num(Ll)/100*b.w)})`}
 m=v.match(/^circle\(([\d.]+)% at ([\d.]+)% ([\d.]+)%\)$/);
 if(m)return`circle(${px(+m[1]/75*Math.hypot(b.w,b.h)/2)} at ${px(X(m[2]))} ${px(Y(m[3]))})`;
 m=v.match(/^polygon\((.*)\)$/);
 if(m)return`polygon(${m[1].split(",").map(p=>{const q=p.trim().split(/\s+/);return px(X(q[0]))+" "+px(Y(q[1]))}).join(",")})`;
 return v}
function clipFit(ms){
 const Q=clipQ;clipQ=[];if(!Q.length)return;
 const at=anims.map(a=>a.currentTime);anims.forEach(a=>{a.currentTime=ms});
 for(const{a,mode}of Q){const b=clipBox(a.effect.target);if(!b||b.w*b.h>b.W*b.H*.8)continue;
  const F=a.effect.getKeyframes().map(({computedOffset,composite,...k})=>({...k,offset:computedOffset}));
  const N=F.map(k=>k.clipPath?{...k,clipPath:clipMap(k.clipPath,b)}:{...k});
  if(mode==="enter"){N[N.length-1].offset=.995;N.push(F[F.length-1])}else{N[0].offset=.005;N.unshift(F[0])}
  a.effect.setKeyframes(N)}
 anims.forEach((a,i)=>{a.currentTime=at[i]})}
function enter(el,kind,list){clipTrack(()=>enterRun(el,kind,list),"enter")}
function enterRun(el,kind,list){
 const d=D();
 if(ENTER_X[kind]){ENTER_X[kind](el,list,d);return}
 /* 階段 2（JIZURA 移植）新增進場：blur-stagger／skew-in／clock-wipe 需要 list／el／CLOCK_OK，所以在表之前單獨處理；wipe／track-in／neon-on 在下面的表 k 內 */
 if(kind==="blur-stagger"&&list){list.forEach((c,i)=>A(c,[{opacity:0,filter:"blur(12px)",transform:"translateY(1cqh)"},{opacity:1,filter:"none",transform:"none"}],{duration:d,delay:i*60/CONFIG.speed}));return}   /* 無 list 時不在表內，退回整句淡入 */
 if(kind==="skew-in"){const v=/vertical/.test(getComputedStyle(el).writingMode||"");A(el,[{opacity:0,transform:v?"translateY(-6cqh) skewY(-20deg)":"translateX(-6cqw) skewX(-20deg)"},{opacity:1,transform:"none"}],{duration:d});return}   /* 直式文字改從上方進入 */
 if(kind==="clock-wipe"){A(el,CLOCK_OK?CLOCK_KF(1):[{clipPath:CLOCK_DIAG[0]},{clipPath:CLOCK_DIAG[1]}],{duration:d,easing:"linear"});return}   /* 時計ワイプ：conic-gradient 遮罩的逐段關鍵影格（var() 不會被動畫的 --ang 取代，所以直接寫死角度） */
   if(kind==="scramble"&&list){list.forEach((c,i)=>{scr.push({c,f:c.textContent,end:i*80/CONFIG.speed+d*.6});A(c,[{opacity:0},{opacity:1}],{duration:d*.3,delay:i*80/CONFIG.speed})});return}
  if(["stagger","ripple","flip"].includes(kind)&&list){const kf={stagger:[{opacity:0},{opacity:1}],ripple:[{opacity:0,transform:"translateY(3cqh)"},{opacity:1,transform:"translateY(-1.5cqh)",offset:.6},{opacity:1,transform:"none"}],flip:[{opacity:0,transform:"perspective(600px) rotateX(90deg)"},{opacity:1,transform:"none"}]}[kind];list.forEach((c,i)=>A(c,kf,{duration:d,delay:i*80/CONFIG.speed}));return}
 const k={fade:[{opacity:0},{opacity:1}],rise:[{opacity:0,transform:"translateY(5cqh)"},{opacity:1,transform:"none"}],
  zoomin:[{opacity:0,transform:"scale(.6)"},{opacity:1,transform:"scale(1)"}],
  drop:[{opacity:0,transform:"translateY(-12cqh)"},{opacity:1,transform:"translateY(1.5cqh)",offset:.7},{opacity:1,transform:"none"}],
  zoomout:[{opacity:0,transform:"scale(1.8)"},{opacity:1,transform:"scale(1)"}],
  spin:[{opacity:0,transform:"perspective(800px) rotateY(90deg)"},{opacity:1,transform:"none"}],
  elastic:[{opacity:0,transform:"scale(0)"},{opacity:1,transform:"scale(1.2)",offset:.5},{transform:"scale(.93)",offset:.75},{transform:"scale(1)"}],
  swing:[{opacity:0,transform:"rotate(-25deg)"},{opacity:1,transform:"rotate(14deg)",offset:.4},{transform:"rotate(-6deg)",offset:.7},{transform:"none"}],
  "split-reveal":[{clipPath:"inset(50% 0 50% 0)",opacity:1},{clipPath:"inset(0)",opacity:1}],iris:[{clipPath:"circle(0% at 50% 50%)",opacity:1},{clipPath:"circle(75% at 50% 50%)",opacity:1}],"mask-up":[{clipPath:"inset(100% 0 0 0)",transform:"translateY(4cqh)"},{clipPath:"inset(0)",transform:"none"}],
  wipe:[{clipPath:"inset(0 100% 0 0)",opacity:1},{clipPath:"inset(0)",opacity:1}],"track-in":[{opacity:0,letterSpacing:".6em"},{opacity:1}],   /* track-in：終點省略 letterSpacing＝落在該元素目前的字距（不寫死） */
  "neon-on":[{opacity:0,textShadow:"0 0 0 transparent",offset:0,easing:"linear"},{opacity:1,offset:.1,easing:"linear"},{opacity:.3,offset:.2,easing:"linear"},{opacity:1,offset:.3,easing:"linear"},{opacity:.6,offset:.4,easing:"linear"},{opacity:1,offset:.5,easing:"linear"},{opacity:1,textShadow:"0 0 16px var(--a)",offset:1}]}[kind]||[{opacity:0},{opacity:1}];
 A(el,k,{duration:d});
}
