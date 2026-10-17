/* ティルトダウン（鏡頭）：字從下方升入定位，只動一次 */
Console.cart({
  kind: 'fx', id: 'tilt-down', apiVersion: 1,
  label: { zh: 'ティルトダウン（鏡頭）：字從下方升入定位，只動一次' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{translate:"0 3cqh",scale:1.035},{translate:"0 0",scale:1}],{duration:Math.max(400,dur*1000*.45),easing:"cubic-bezier(.2,.8,.2,1)"})
  },
});
