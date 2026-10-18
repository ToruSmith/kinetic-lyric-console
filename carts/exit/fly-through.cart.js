/* 衝向鏡頭放大並模糊 */
Console.cart({
  kind: 'exit', id: 'fly-through', apiVersion: 1,
  label: { zh: '衝向鏡頭放大並模糊' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{opacity:1,transform:"none",filter:"blur(0)"},{opacity:0,transform:"scale(3)",filter:"blur(8px)"}],
});
