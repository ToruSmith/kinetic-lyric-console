/* 隨拍輕輕跳起 */
Console.cart({
  kind: 'fx', id: 'beat-jump', apiVersion: 1,
  label: { zh: '隨拍輕輕跳起' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const bt = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{translate:"0 0"},{translate:"0 -1.6cqh",offset:.3},{translate:"0 0"}],{duration:bt(),iterations:Infinity,easing:"ease-out"})
  },
});
