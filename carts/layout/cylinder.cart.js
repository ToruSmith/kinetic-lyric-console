/* 滾筒翻轉（會顯示前後句） */
Console.cart({
  kind: 'layout', id: 'cylinder', apiVersion: 1,
  label: { zh: '滾筒翻轉（會顯示前後句）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const subs = ctx.sentences;
    const fit = ctx.fit;
    const CONFIG = ctx.config;
    const D = ctx.enterMs;
    const SWd = ctx.sw;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const dur = sb=>(sb.e-sb.s)*1000;
    const i=subs.indexOf(sb),prev=i>0?subs[i-1].plain:"",next=subs[i+1]?subs[i+1].plain:"",z=fit(sb,big)*.8,R=z*3.4,T=Math.max(800,dur(sb)),X=CONFIG.exit*1000,step=36;
    const a=Math.min(.4,D()*1.3/T),b=Math.max(a+.05,1-X/T);
    const st=document.createElement("div");st.style.cssText=`position:absolute;inset:0;perspective:${SWd()*1.6}px`;c.appendChild(st);
    const dr=document.createElement("div");dr.style.cssText="position:absolute;left:0;right:0;top:50%;height:0;transform-style:preserve-3d";st.appendChild(dr);
    const row=(t,ang,op)=>{if(!t)return;const e=txtEl(`left:0;right:0;top:${-z*.6}px;height:${z*1.2}px;line-height:${z*1.2}px;text-align:center;font-size:${z}px;letter-spacing:.12em;white-space:pre;transform:rotateX(${ang}deg) translateZ(${R}px)`);e.textContent=t;dr.appendChild(e);A(e,op,{duration:T,easing:"linear"})};
    row(prev,step,[{opacity:1},{opacity:.3,offset:a},{opacity:.3}]);row(sb.plain,0,[{opacity:.3},{opacity:1,offset:a},{opacity:1,offset:b},{opacity:.3}]);row(next,-step,[{opacity:.3},{opacity:.3,offset:b},{opacity:1}]);
    A(dr,[{transform:`translateZ(${-R}px) rotateX(${-step}deg)`,easing:"cubic-bezier(.3,.7,.3,1)"},{transform:`translateZ(${-R}px) rotateX(0deg)`,offset:a},{transform:`translateZ(${-R}px) rotateX(0deg)`,offset:b,easing:"cubic-bezier(.7,0,.7,.3)"},{transform:`translateZ(${-R}px) rotateX(${step}deg)`}],{duration:T,easing:"linear"})
  },
});
