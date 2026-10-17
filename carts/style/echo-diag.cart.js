/* 輪郭の残響（近似）：右上方向的淡出殘影 */
Console.cart({
  kind: 'style', id: 'echo-diag', apiVersion: 1,
  label: { zh: '輪郭の残響（近似）：右上方向的淡出殘影' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const addSh = (el, s) => ctx.shadow(s);
    const e = ctx.el;
    return (addSh(e,".04em -.04em 0 color-mix(in srgb,var(--a) 70%,transparent),.08em -.08em 0 color-mix(in srgb,var(--a) 45%,transparent),.12em -.12em 0 color-mix(in srgb,var(--a) 22%,transparent)"));
  },
});
