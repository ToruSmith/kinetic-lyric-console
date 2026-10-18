/* 由左向右擦出 */
Console.cart({
  kind: 'layout', id: 'wipe', apiVersion: 1,
  label: { zh: '由左向右擦出' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const CE = ctx.centerIn;
    const fit = ctx.fit;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const e=CE(c,`font-size:${fit(sb,big)}px`);e.textContent=sb.plain;A(e,[{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0 0 0)"}],{duration:D()*1.5,easing:"linear"});
    const b=document.createElement("div");b.style.cssText="position:absolute;top:30cqh;height:40cqh;width:3px;background:#fff;box-shadow:0 0 12px #fff";c.appendChild(b);A(b,[{left:"0",opacity:1},{left:"100%",opacity:1,offset:.98},{left:"100%",opacity:0}],{duration:D()*1.5,easing:"linear"})
  },
});
