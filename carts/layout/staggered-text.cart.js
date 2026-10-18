/* 奇偶字上下錯位，從相反方向滑入 */
Console.cart({
  kind: 'layout', id: 'staggered-text', apiVersion: 1,
  label: { zh: '奇偶字上下錯位，從相反方向滑入' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const CE = ctx.centerIn;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
    const enter = ctx.enter;
       /* 交錯字：奇偶字上下錯位，從相反方向滑入 */
    const z=_fz(sb,big,1),e=CE(c,`font-size:${z}px;letter-spacing:.08em`),ch=chars(sb.plain,e);list.push(...ch);
    ch.forEach((x,i)=>{x.style.position="relative";x.style.top=(i%2?.26:-.26)+"em";if(!sb.en)A(x,[{opacity:0,transform:`translateX(${i%2?8:-8}cqw)`},{opacity:1,transform:"none"}],{duration:D(),delay:i*70/CONFIG.speed})});
    if(sb.en)enter(e,sb.en,list)
  },
});
