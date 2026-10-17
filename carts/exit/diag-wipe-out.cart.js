/* 斜めワイプ退場：一條斜線掃過把字擦掉 */
Console.cart({
  kind: 'exit', id: 'diag-wipe-out', apiVersion: 1,
  label: { zh: '斜めワイプ退場：一條斜線掃過把字擦掉' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{clipPath:"polygon(-30% 0,200% 0,200% 100%,-60% 100%)"},{clipPath:"polygon(130% 0,200% 0,200% 100%,100% 100%)"}],
});
