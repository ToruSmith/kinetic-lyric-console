/* 多層景深視差 */
Console.cart({
  kind: 'layout', id: 'parallax-depth', apiVersion: 1,
  label: { zh: '多層景深視差' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const SWd = ctx.sw;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const enter = ctx.enter;
    const T=Math.max(600,dur*1000),z=Math.min(big*.6,SWd()/Math.max(sb.plain.length,3)*.9);
    [{s:2.1,b:9,o:.16,dx:2},{s:1.45,b:3.5,o:.3,dx:5},{s:1,b:0,o:1,dx:9,main:1},{s:1.28,b:6,o:.3,dx:22}].forEach((L0,i)=>{
     const e=txtEl(`left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font-size:${z}px;letter-spacing:.1em;padding-left:.1em;filter:blur(${L0.b}px);opacity:${L0.o}`);e.style.transform="none";c.appendChild(e);if(!L0.main)e.dataset.nm=1;
     if(L0.main){list.push(...chars(sb.plain,e))}else e.textContent=sb.plain;
     A(e,[{translate:`${-L0.dx}cqw -50%`,scale:L0.s*.96},{translate:`${L0.dx}cqw -50%`,scale:L0.s*1.04}],{duration:T,easing:"linear"});
     if(L0.main&&sb.en)enter(e,sb.en,list)})
  },
});
