/* 圓潤白色厚描邊貼紙字＋彩色字心，逐字彈跳、交替傾斜 */
Console.cart({
  kind: 'layout', id: 'cute-outline', apiVersion: 1,
  label: { zh: '圓潤白色厚描邊貼紙字＋彩色字心，逐字彈跳、交替傾斜' },
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
       /* 可愛描邊：圓潤白色厚描邊貼紙字＋彩色字心，逐字彈跳、交替傾斜 */
    const z=_fz(sb,big,1),e=CE(c,`font-size:${z}px;letter-spacing:.04em;font-weight:900;color:var(--a);-webkit-text-stroke:.16em #fff;paint-order:stroke fill;text-shadow:.05em .08em 0 rgba(0,0,0,.28)`),ch=chars(sb.plain,e);list.push(...ch);
    ch.forEach((x,i)=>{x.style.rotate=(i%2?4:-4)+"deg";if(!sb.en)A(x,[{opacity:0,transform:"translateY(8cqh) scale(.4)"},{opacity:1,transform:"translateY(-2cqh) scale(1.15)",offset:.6},{opacity:1,transform:"none"}],{duration:D(),delay:i*80/CONFIG.speed})});
    if(sb.en)enter(e,sb.en,list)
  },
});
