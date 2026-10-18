/* 流光掃過 */
Console.cart({
  kind: 'fx', id: 'shimmer', apiVersion: 1,
  label: { zh: '流光掃過' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'color' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const d=document.createElement("div");d.style.cssText="position:absolute;top:0;bottom:0;width:30cqw;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);mix-blend-mode:overlay;pointer-events:none";fw.appendChild(d);
    A(d,[{transform:"translateX(-40cqw) skewX(-20deg)"},{transform:"translateX(130cqw) skewX(-20deg)",offset:.3},{transform:"translateX(130cqw) skewX(-20deg)"}],{duration:4000,iterations:Infinity,easing:"linear"})
  },
});
