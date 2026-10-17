/* 偏移硬影 */
Console.cart({
  kind: 'style', id: 'shadow-offset', apiVersion: 1,
  label: { zh: '偏移硬影' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const addSh = (el, s) => ctx.shadow(s);
    const e = ctx.el;
    return (addSh(e,".07em .07em 0 rgba(0,0,0,.7)"));
  },
});
