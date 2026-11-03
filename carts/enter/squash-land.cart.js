/* 落下壓扁再回彈 */
Console.cart({
  kind: 'enter', id: 'squash-land', apiVersion: 1,
  label: { zh: '落下壓扁再回彈' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['俏皮'], tags: ['彈性', '變形'], use: '有落地重拍的輕快句', draft: true },
  keyframes: [{opacity:0,transform:"translateY(-20cqh) scaleY(1.2)"},{opacity:1,transform:"translateY(0) scale(1.15,.8)",offset:.6},{opacity:1,transform:"none"}],
});
