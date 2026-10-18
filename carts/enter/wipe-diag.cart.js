/* 斜向擦出 */
const CLOCK_DIAG = ["polygon(-1% 0,0% 0,-30% 100%,-1% 100%)", "polygon(-1% 0,130% 0,100% 100%,-1% 100%)"];
Console.cart({
  kind: 'enter', id: 'wipe-diag', apiVersion: 1,
  label: { zh: '斜向擦出' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{clipPath:CLOCK_DIAG[0],opacity:1},{clipPath:CLOCK_DIAG[1],opacity:1}],
  easing: "linear",
});
