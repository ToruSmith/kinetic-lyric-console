/* 訊號故障錯位後消失 */
Console.cart({
  kind: 'exit', id: 'glitch-out', apiVersion: 1,
  label: { zh: '訊號故障錯位後消失' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  keyframes: [{opacity:1,transform:"none"},{opacity:1,transform:"translateX(14px) skewX(20deg)",filter:"hue-rotate(90deg)",offset:.3},{opacity:.6,transform:"translateX(-18px)",filter:"hue-rotate(200deg)",offset:.6},{opacity:0,transform:"translateX(6px)"}],
});
