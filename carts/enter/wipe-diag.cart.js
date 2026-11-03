/* 斜向擦出 */
const CLOCK_DIAG = ["polygon(-1% 0,0% 0,-30% 100%,-1% 100%)", "polygon(-1% 0,130% 0,100% 100%,-1% 100%)"];
Console.cart({
  kind: 'enter', id: 'wipe-diag', apiVersion: 1,
  label: { zh: '斜向擦出' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['通用'], tags: ['擦除'], use: '段落切換或設計感標題', draft: true },
  keyframes: [{clipPath:CLOCK_DIAG[0],opacity:1},{clipPath:CLOCK_DIAG[1],opacity:1}],
  easing: "linear",
});
