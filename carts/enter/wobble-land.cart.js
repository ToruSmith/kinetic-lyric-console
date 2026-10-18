/* 落下後搖晃定位 */
Console.cart({
  kind: 'enter', id: 'wobble-land', apiVersion: 1,
  label: { zh: '落下後搖晃定位' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{opacity:0,transform:"translateY(-15cqh) rotate(-6deg)"},{opacity:1,transform:"rotate(4deg)",offset:.6},{transform:"rotate(-2deg)",offset:.8},{transform:"none"}],
});
