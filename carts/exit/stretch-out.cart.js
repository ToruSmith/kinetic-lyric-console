/* 橫向收窄成一條線 */
Console.cart({
  kind: 'exit', id: 'stretch-out', apiVersion: 1,
  label: { zh: '橫向收窄成一條線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{opacity:1,transform:"scaleX(1)"},{opacity:0,transform:"scaleX(0)"}],
});
