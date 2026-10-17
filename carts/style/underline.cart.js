/* 底線（強調色） */
Console.cart({
  kind: 'style', id: 'underline', apiVersion: 1,
  label: { zh: '底線（強調色）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.textDecoration="underline";e.style.textDecorationColor="var(--a)";e.style.textDecorationThickness=".07em";e.style.textUnderlineOffset=".16em"
  },
});
