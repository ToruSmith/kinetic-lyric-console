/* 一刀両断（近似）：字分成左右兩半掉開 */
Console.cart({
  kind: 'exit', id: 'slash-out', apiVersion: 1,
  label: { zh: '一刀両断（近似）：字分成左右兩半掉開' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,transform:"none"},{opacity:1,transform:"scaleX(1.02)",offset:.25},{opacity:0,transform:"translateY(14cqh) rotate(6deg)"}],
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    const L=i<n/2;return{kf:[{opacity:1,transform:"none"},{opacity:0,transform:L?"translate(-5cqw,16cqh) rotate(-10deg)":"translate(5cqw,22cqh) rotate(10deg)"}],dur:.55,at:.12+(L?0:.04),ease:"cubic-bezier(.5,0,1,.6)"}
  },
});
