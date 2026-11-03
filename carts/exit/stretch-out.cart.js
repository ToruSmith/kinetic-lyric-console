/* 橫向收窄成一條線 */
Console.cart({
  kind: 'exit', id: 'stretch-out', apiVersion: 1,
  label: { zh: '橫向收窄成一條線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['科技', '復古'], tags: ['變形'], use: '收成一條線的結束', draft: true },
  keyframes: [{opacity:1,transform:"scaleX(1)"},{opacity:0,transform:"scaleX(0)"}],
});
