/* ===== [LAY-F] 版型 F：polaroid page-flip ink-bleed laser-scan split-flap wave-path mirror-reflect cylinder iris-frame annotate。皆為時間的純函數（A() 暫停動畫 + 種子亂數）===== */
const PAPER="#f3eee2",INK="#2a2622",NS="http://www.w3.org/2000/svg";
const regProp=(...n)=>n.forEach(x=>{try{CSS.registerProperty({name:x,syntax:"<percentage>",inherits:false,initialValue:"-20%"})}catch(e){}});
Object.assign(NL,{
 "ink-bleed"(sb,c,w,big,sm,dur){const r=sr(sb.s),z=fit(sb,big)*1.05,T=Math.max(800,dur*1000),E=Math.min(T*.55,2000);regProp("--k0","--k1","--k2");
  if(!document.getElementById("inkf")){const s=document.createElementNS(NS,"svg");s.setAttribute("width","0");s.setAttribute("height","0");s.style.position="absolute";
   s.innerHTML='<filter id="inkf" x="-10%" y="-30%" width="120%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>';document.body.appendChild(s)}
  const o=CE(c,`font-size:${z}px;letter-spacing:.1em`);o.style.filter="url(#inkf)";const e=document.createElement("div");e.style.whiteSpace="pre";e.textContent=sb.plain;o.appendChild(e);
  const g=[0,1,2].map(k=>`radial-gradient(circle at ${15+r()*70}% ${30+r()*40}%,#000 var(--k${k}),transparent calc(var(--k${k}) + 14%))`).join(",");e.style.webkitMaskImage=e.style.maskImage=g;
  [0,1,2].forEach(k=>A(e,[{["--k"+k]:"-20%"},{["--k"+k]:"110%"}],{duration:E,delay:k*E*.15,easing:"cubic-bezier(.3,.6,.4,1)"}))},
 
});
const dur=sb=>(sb.e-sb.s)*1000;


