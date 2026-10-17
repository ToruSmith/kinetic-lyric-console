/* 逐字依序輕微失焦再對焦 */
Console.cart({
  kind: 'fx', id: 'focus-rack', apiVersion: 1,
  label: { zh: '逐字依序輕微失焦再對焦' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    const l=cl(fw);if(!l.length)return;const t=dur*1000/l.length;l.forEach((c,i)=>A(c,[{filter:"blur(0)"},{filter:"blur(1.5px)",offset:.5},{filter:"blur(0)"}],{duration:t*1.6,delay:i*t,easing:"linear"}))
  },
});
