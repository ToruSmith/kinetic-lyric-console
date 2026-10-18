/* 閃爍幾下後熄滅 */
Console.cart({
  kind: 'exit', id: 'flicker-out', apiVersion: 1,
  label: { zh: '閃爍幾下後熄滅' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{opacity:1,offset:0},{opacity:0,offset:.15},{opacity:1,offset:.3},{opacity:0,offset:.45},{opacity:.6,offset:.6},{opacity:0,offset:.8},{opacity:0}],
});
