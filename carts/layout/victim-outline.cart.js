/* 空心粗描邊字，後方錯位的強調色描邊像粉筆輪廓，輕微抖動 */
Console.cart({
  kind: 'layout', id: 'victim-outline', apiVersion: 1,
  label: { zh: '空心粗描邊字，後方錯位的強調色描邊像粉筆輪廓，輕微抖動' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { lab: true },
  rand: { sceneThemes: ['grunge'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
       /* 受害者描邊：空心粗描邊字，後方錯位的強調色描邊像粉筆輪廓，輕微抖動 */
    const z=_fz(sb,big,1.05),st=`font-size:${z}px;letter-spacing:.1em;font-weight:600;color:transparent;`;
    const b=CE(c,st+`-webkit-text-stroke:max(1.5px,.022em) var(--a)`);b.textContent=sb.plain;b.dataset.nm=1;delete b.dataset.t;A(b,[{translate:".03em .04em",rotate:"-.4deg"},{translate:".05em .02em",rotate:".4deg"}],{duration:420,iterations:Infinity,direction:"alternate",easing:"steps(2)"});
    const e=CE(c,st+`-webkit-text-stroke:max(1.5px,.018em) var(--c)`);list.push(...chars(sb.plain,e));enter(e,sb.en||"fade",list)
  },
});
