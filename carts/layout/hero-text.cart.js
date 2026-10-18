/* 粗體巨字＋六層強調色擠出立體陰影，重重砸入 */
Console.cart({
  kind: 'layout', id: 'hero-text', apiVersion: 1,
  label: { zh: '粗體巨字＋六層強調色擠出立體陰影，重重砸入' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const CE = ctx.centerIn;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 英雄字：粗體巨字＋六層強調色擠出立體陰影，重重砸入 */
    const z=_fz(sb,big,1.15),ex=[];for(let i=1;i<=6;i++)ex.push(`${(i*.018).toFixed(3)}em ${(i*.022).toFixed(3)}em 0 color-mix(in srgb,var(--a) ${100-i*9}%,#000)`);
    const e=CE(c,`font-size:${z}px;letter-spacing:.06em;font-weight:900;text-shadow:${ex.join(",")}`);list.push(...chars(sb.plain,e));
    if(sb.en)enter(e,sb.en,list);else A(e,[{opacity:0,transform:"scale(2.4) rotate(-3deg)"},{opacity:1,transform:"scale(.94) rotate(0)",offset:.6},{opacity:1,transform:"none"}],{duration:D()*.9,easing:"cubic-bezier(.2,.9,.2,1)"})
  },
});
