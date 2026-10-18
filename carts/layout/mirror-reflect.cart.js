/* 水面倒影 */
Console.cart({
  kind: 'layout', id: 'mirror-reflect', apiVersion: 1,
  label: { zh: '水面倒影' },
  author: 'kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const fit = ctx.fit;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const enter = ctx.enter;
    const D = ctx.enterMs;
    const z=fit(sb,big)*.9,col=txtEl(`inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:${z}px;letter-spacing:.12em`);c.appendChild(col);
    const e=document.createElement("div");e.style.cssText="line-height:1.15;white-space:pre";list.push(...chars(sb.plain,e));
    const rf=document.createElement("div"),mk="linear-gradient(to top,rgba(0,0,0,.9),transparent 78%)";rf.style.cssText=`line-height:1.15;white-space:pre;transform:scaleY(-1);opacity:.45;-webkit-mask-image:${mk};mask-image:${mk}`;
    chars(sb.plain,rf).forEach((x,i)=>A(x,[{transform:"translateY(0) skewX(0deg)"},{transform:"translateY(.03em) skewX(3deg)"},{transform:"translateY(-.02em) skewX(-3deg)"},{transform:"translateY(0) skewX(0deg)"}],{duration:2600+i*180,iterations:Infinity,easing:"ease-in-out"}));
    const wl=document.createElement("div");wl.style.cssText="width:70cqw;height:2px;background:linear-gradient(90deg,transparent,var(--a),transparent);opacity:.7;margin:.02em 0";col.append(e,wl,rf);
    if(sb.en){enter(e,sb.en,list);A(rf,[{opacity:0},{opacity:.45}],{duration:D()})}
  },
});
