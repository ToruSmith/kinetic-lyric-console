/* 滿版：邊框跑動 */
Console.cart({
  kind: 'layout', id: 'border-run', apiVersion: 1,
  label: { zh: '滿版：邊框跑動' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { full: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CE = ctx.centerIn;
    const fit = ctx.fit;
    const enter = ctx.enter;
    const n="http://www.w3.org/2000/svg",sv=document.createElementNS(n,"svg");sv.setAttribute("viewBox","0 0 100 100");sv.setAttribute("preserveAspectRatio","none");sv.style.cssText="position:absolute;inset:6cqh 6cqw;width:88cqw;height:88cqh";
    const r=document.createElementNS(n,"rect");[["x",0],["y",0],["width",100],["height",100],["fill","none"],["stroke","rgba(255,255,255,.8)"],["stroke-width",2],["pathLength",1],["stroke-dasharray",1],["vector-effect","non-scaling-stroke"]].forEach(([k,v])=>r.setAttribute(k,v));sv.appendChild(r);c.appendChild(sv);
    A(r,[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:D()*3,easing:"ease-in-out"});const e=CE(c,`font-size:${fit(sb,big)}px`);e.textContent=sb.plain;enter(e,sb.en||"fade")
  },
});
