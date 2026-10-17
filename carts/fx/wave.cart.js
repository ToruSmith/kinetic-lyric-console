/* 逐字波動 */
Console.cart({
  kind: 'fx', id: 'wave', apiVersion: 1,
  label: { zh: '逐字波動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    let l=cl(fw);if(!l.length)l=[fw];l.forEach((c,i)=>A(c,[{translate:"0 0"},{translate:"0 -1.2cqh"},{translate:"0 0"},{translate:"0 1.2cqh"},{translate:"0 0"}],{duration:1800,delay:0,iterations:Infinity,easing:"ease-in-out",iterationStart:(i*.12)%1}))
  },
});
