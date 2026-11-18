/* 底部半透明黑底框字幕，逐字變亮 */
Console.cart({
  kind: 'layout', id: 'subtitle-box', apiVersion: 1,
  label: { zh: '底部半透明黑底框字幕，逐字變亮' },
  author: 'kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'low', mood: ['通用'], tags: ['排版'], use: '底部字幕，最不遮影片', draft: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const enter = ctx.enter;
    const PL = ctx.plate("#2a2a2a");   /* 字幕條：@plate=；null＝原本的半透明黑（以疊在中間調背景上的效果估算對比） */
    const e=txtEl(`left:10cqw;right:10cqw;bottom:8cqh;padding:1.2cqh 2cqw;background:${PL?`color-mix(in srgb,${PL} 75%,transparent)`:"rgba(0,0,0,.55)"};text-align:center;font-size:${sm*1.6}px;letter-spacing:.1em`);c.appendChild(e);
    /* 字色是白色（預設）時維持原本寫法，舊畫面逐像素相同；其他字色跟著 --c */
    const wc=(ctx.colors2().c||ctx.hex6(ctx.config.color,"#ffffff"))==="#ffffff",dimC=wc?"rgba(255,255,255,.4)":"color-mix(in srgb,var(--c) 40%,transparent)",onC=wc?"#fff":"var(--c)";
    const l=chars(sb.plain,e,"color:"+dimC),t=dur*800/l.length;l.forEach((x,i)=>A(x,[{color:dimC},{color:onC}],{duration:t,delay:i*t,easing:"linear"}));enter(e,"fade")
  },
});
