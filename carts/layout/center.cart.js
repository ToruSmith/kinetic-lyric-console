/* 置中，最適合搭配樣式與進場動畫，**最安全、通用的選擇** */
Console.cart({
  kind: 'layout', id: 'center', apiVersion: 1,
  label: { zh: '置中，最適合搭配樣式與進場動畫，**最安全、通用的選擇**' },
  author: 'kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const SWd = ctx.sw;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const z=Math.min(big*.55,SWd()/Math.max(sb.plain.length,3)*.9);
    const e=txtEl(`left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font-size:${z}px;letter-spacing:.15em;padding-left:.15em`);c.appendChild(e);
    list.push(...chars(sb.plain,e));if(sb.en)enter(e,sb.en,list)
  },
});
