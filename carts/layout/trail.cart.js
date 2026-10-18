/* 拖影 */
Console.cart({
  kind: 'layout', id: 'trail', apiVersion: 1,
  label: { zh: '拖影' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const fit = ctx.fit;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const z=fit(sb,big)*.8;for(let i=5;i>=0;i--){const e=CE(c,`font-size:${z}px;opacity:${i?.4/i:1}`);if(i)e.dataset.nm=1;e.textContent=sb.plain;A(e,[{translate:"-6cqw 0"},{translate:"6cqw 0"}],{duration:2400,delay:i*70,iterations:Infinity,direction:"alternate",easing:"ease-in-out",composite:"replace"})}
  },
});
