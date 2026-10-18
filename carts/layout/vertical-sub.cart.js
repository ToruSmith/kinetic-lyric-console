/* 主文橫排偏左，右側一條直排淡色回聲字＋細線 */
Console.cart({
  kind: 'layout', id: 'vertical-sub', apiVersion: 1,
  label: { zh: '主文橫排偏左，右側一條直排淡色回聲字＋細線' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 直式副文：主文橫排偏左，右側一條直排淡色回聲字＋細線 */
    const z=_fz(sb,big,.85),vh=SHd(),e=txtEl(`left:6cqw;top:50%;margin-top:${-z*.6}px;font-size:${z}px;line-height:1.2;letter-spacing:.1em;white-space:nowrap`);c.appendChild(e);list.push(...chars(sb.plain,e));enter(e,sb.en||"rise",list);
    const v=txtEl(`right:7cqw;top:10cqh;writing-mode:vertical-rl;font-size:${Math.min(z*.55,vh*.085)}px;letter-spacing:.3em;opacity:.6;color:var(--a);max-height:80cqh`);delete v.dataset.t;v.dataset.nm=1;v.textContent=sb.plain;c.appendChild(v);A(v,[{opacity:0},{opacity:.55}],{duration:D()*1.3,delay:D()*.4});
    const ln=document.createElement("div");ln.style.cssText="position:absolute;right:4cqw;top:10cqh;bottom:10cqh;width:1px;background:var(--a);opacity:.5;transform-origin:top";ln.dataset.nm=1;c.appendChild(ln);A(ln,[{transform:"scaleY(0)"},{transform:"scaleY(1)"}],{duration:D()*1.5})
  },
});
