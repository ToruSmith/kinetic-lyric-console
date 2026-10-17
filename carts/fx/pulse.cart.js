/* 隨拍脈動（縮放） */
Console.cart({
  kind: 'fx', id: 'pulse', apiVersion: 1,
  label: { zh: '隨拍脈動（縮放）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const bt = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{scale:1.05},{scale:1}],{duration:bt(),iterations:Infinity,easing:"ease-out"})
  },
});
