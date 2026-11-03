/* 主文後方多層半透明殘影，左右橫移 */
Console.cart({
  kind: 'layout', id: 'trail', apiVersion: 1,
  label: { zh: '主文後方多層半透明殘影，左右橫移' },
  author: 'kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'mid', mood: ['科技', '夢幻'], tags: ['陰影'], use: '拖影速度感', draft: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const fit = ctx.fit;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const z=fit(sb,big)*.8;for(let i=5;i>=0;i--){const e=CE(c,`font-size:${z}px;opacity:${i?.4/i:1}`);if(i)e.dataset.nm=1;e.textContent=sb.plain;A(e,[{translate:"-6cqw 0"},{translate:"6cqw 0"}],{duration:2400,delay:i*70,iterations:Infinity,direction:"alternate",easing:"ease-in-out",composite:"replace"})}
  },
});
