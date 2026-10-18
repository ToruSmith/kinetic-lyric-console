/* 底部半透明黑底框字幕，逐字變亮 */
Console.cart({
  kind: 'layout', id: 'subtitle-box', apiVersion: 1,
  label: { zh: '底部半透明黑底框字幕，逐字變亮' },
  author: 'kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const enter = ctx.enter;
    const e=txtEl(`left:10cqw;right:10cqw;bottom:8cqh;padding:1.2cqh 2cqw;background:rgba(0,0,0,.55);text-align:center;font-size:${sm*1.6}px;letter-spacing:.1em`);c.appendChild(e);
    const l=chars(sb.plain,e,"color:rgba(255,255,255,.4)"),t=dur*800/l.length;l.forEach((x,i)=>A(x,[{color:"rgba(255,255,255,.4)"},{color:"#fff"}],{duration:t,delay:i*t,easing:"linear"}));enter(e,"fade")
  },
});
