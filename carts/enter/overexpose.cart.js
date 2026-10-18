/* 過曝白光漸收成正常 */
Console.cart({
  kind: 'enter', id: 'overexpose', apiVersion: 1,
  label: { zh: '過曝白光漸收成正常' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{opacity:0,filter:"brightness(6) blur(4px)"},{opacity:1,filter:"brightness(1) blur(0)"}],
});
