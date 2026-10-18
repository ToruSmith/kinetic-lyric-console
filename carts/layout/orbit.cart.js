/* 文字沿圓弧排列並緩慢旋轉 */
Console.cart({
  kind: 'layout', id: 'orbit', apiVersion: 1,
  label: { zh: '文字沿圓弧排列並緩慢旋轉' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const ring = (c,txt,n,css,R,cfg)=>{const r=document.createElement("div");r.className="w";c.appendChild(r);
     const t=[...txt];while(t.length<n)t.push(...[...txt,"・"]);t.length=Math.max(n,1);
     t.forEach((ch,i)=>{const a=cfg.arc?(i/(t.length-1||1)-.5)*cfg.arc:i*360/t.length,e=txtEl(`left:50%;top:50%;${css};transform:translate(-50%,-50%) rotate(${a}deg) translateY(-${R}cqh)`);e.textContent=ch;r.appendChild(e);A(e,[{opacity:0},{opacity:1}],{duration:D()*.5,delay:i*(cfg.step||40)})});return r};
    const r=ring(c,sb.plain,sb.plain.length,`font-size:${sm*1.8}px;letter-spacing:0`,Math.min(30,SWd()/SHd()*34),{arc:Math.min(320,sb.plain.length*16),step:70});A(r,[{transform:"rotate(-20deg)"},{transform:"rotate(30deg)"}],{duration:dur*1000,easing:"linear"})
  },
});
