/* 扭轉斜切縮小消失 */
Console.cart({
  kind: 'exit', id: 'twist-out', apiVersion: 1,
  label: { zh: '扭轉斜切縮小消失' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['力量', '俏皮'], tags: ['旋轉', '變形'], use: '情緒強烈的收尾', draft: true },
  keyframes: [{opacity:1,transform:"none"},{opacity:0,transform:"rotate(12deg) skewX(25deg) scale(.7)"}],
});
