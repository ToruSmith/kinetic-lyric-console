/* 滿版：多層殘影由小放大衝向鏡頭，穿越隧道感 */
Console.cart({
  kind: 'layout', id: 'zoom-tunnel', apiVersion: 1,
  label: { zh: '滿版：多層殘影由小放大衝向鏡頭，穿越隧道感' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  flags: { full: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const fit = ctx.fit;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const enter = ctx.enter;
    const z=fit(sb,big);for(let i=0;i<5;i++){const e=CE(c,`font-size:${z}px;opacity:.6`);e.textContent=sb.plain;A(e,[{transform:"scale(.6)",opacity:0},{opacity:.5,offset:.3},{transform:"scale(3)",opacity:0}],{duration:2000,delay:i*400,iterations:Infinity,easing:"ease-in"})}
    const m=CE(c,`font-size:${z}px`);m.textContent=sb.plain;enter(m,"zoomin")
  },
});
