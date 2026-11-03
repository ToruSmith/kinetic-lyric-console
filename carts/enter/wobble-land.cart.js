/* 落下後搖晃定位 */
Console.cart({
  kind: 'enter', id: 'wobble-land', apiVersion: 1,
  label: { zh: '落下後搖晃定位' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['俏皮'], tags: ['彈性', '旋轉'], use: '活潑落地後還在晃動的句子', draft: true },
  keyframes: [{opacity:0,transform:"translateY(-15cqh) rotate(-6deg)"},{opacity:1,transform:"rotate(4deg)",offset:.6},{transform:"rotate(-2deg)",offset:.8},{transform:"none"}],
});
