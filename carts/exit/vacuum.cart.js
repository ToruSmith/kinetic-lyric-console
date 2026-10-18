/* 向畫面中心縮小吸走 */
Console.cart({
  kind: 'exit', id: 'vacuum', apiVersion: 1,
  label: { zh: '向畫面中心縮小吸走' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  keyframes: [{opacity:1,transform:"none",filter:"blur(0)"},{opacity:0,transform:"scale(0)",filter:"blur(6px)"}],
});
