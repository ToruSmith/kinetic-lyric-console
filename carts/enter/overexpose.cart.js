/* 過曝白光漸收成正常 */
Console.cart({
  kind: 'enter', id: 'overexpose', apiVersion: 1,
  label: { zh: '過曝白光漸收成正常' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['夢幻', '抒情'], tags: ['光效', '模糊'], use: '回憶、光芒或情緒釋放', draft: true },
  keyframes: [{opacity:0,filter:"brightness(6) blur(4px)"},{opacity:1,filter:"brightness(1) blur(0)"}],
});
