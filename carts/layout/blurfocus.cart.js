/* 由模糊且字距很寬的狀態慢慢對焦 */
Console.cart({
  kind: 'layout', id: 'blurfocus', apiVersion: 1,
  label: { zh: '由模糊且字距很寬的狀態慢慢對焦' },
  author: 'kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const CE = ctx.centerIn;
    const fit = ctx.fit;
    const A = ctx.anim;
    const CONFIG = ctx.config;
    const D = ctx.enterMs;
    const e=CE(c,`font-size:${fit(sb,big)}px`);e.textContent=sb.plain;A(e,[{opacity:0,filter:"blur(22px)",letterSpacing:"1.2em"},{opacity:1,filter:"blur(0)",letterSpacing:CONFIG.spacing+"em"}],{duration:D()*1.6})
  },
});
