/* 打字機：逐字出現，後面跟著閃爍游標，字比較小 */
Console.cart({
  kind: 'layout', id: 'typewriter', apiVersion: 1,
  label: { zh: '打字機：逐字出現，後面跟著閃爍游標，字比較小' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['tech'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const e=txtEl(`left:8cqw;right:8cqw;top:50%;margin-top:-1em;font-size:${sm*1.8}px;white-space:pre-wrap`);c.appendChild(e);
    const l=chars(sb.plain,e),t=dur*600/l.length;l.forEach((x,i)=>A(x,[{opacity:0},{opacity:1}],{duration:1,delay:i*t}));
    const cu=document.createElement("span");cu.textContent="▏";e.appendChild(cu);A(cu,[{opacity:1},{opacity:1,offset:.5},{opacity:0,offset:.5},{opacity:0}],{duration:1000,iterations:Infinity,easing:"linear"})
  },
});
