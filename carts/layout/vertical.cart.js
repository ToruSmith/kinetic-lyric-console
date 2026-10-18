/* 直排，靠右，旁邊一條細直線；長句會自動縮小 */
Console.cart({
  kind: 'layout', id: 'vertical', apiVersion: 1,
  label: { zh: '直排，靠右，旁邊一條細直線；長句會自動縮小' },
  author: 'kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const enter = ctx.enter;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const n=Math.max(1,[...sb.plain].length),fs=Math.min(sm*2,SHd()*.74/(n*1.6)),e=txtEl(`right:12cqw;top:12cqh;font-size:${fs}px;writing-mode:vertical-rl;letter-spacing:.6em`);e.textContent=sb.plain;c.appendChild(e);enter(e,sb.en||"fade");
    const ln=document.createElement("div");ln.className="ln";ln.style.cssText="position:absolute;right:8cqw;top:12cqh;width:2px;height:70cqh;transform-origin:top";c.appendChild(ln);A(ln,[{transform:"scaleY(0)"},{transform:"scaleY(1)"}],{duration:D()*2})
  },
});
