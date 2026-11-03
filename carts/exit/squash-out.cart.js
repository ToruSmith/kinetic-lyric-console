/* 縱向壓扁消失 */
Console.cart({
  kind: 'exit', id: 'squash-out', apiVersion: 1,
  label: { zh: '縱向壓扁消失' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['俏皮'], tags: ['變形'], use: '輕快收尾', draft: true },
  keyframes: [{opacity:1,transform:"scaleY(1)"},{opacity:0,transform:"scaleY(.05)"}],
});
