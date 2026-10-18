/* 太鼓：重拍時突然放大再收 */
Console.cart({
  kind: 'fx', id: 'drum', apiVersion: 1,
  label: { zh: '太鼓：重拍時突然放大再收' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'cam', strong: true },
  play(ctx) {
    const A = ctx.anim;
    const bt = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{scale:1.09},{scale:1,offset:.5},{scale:1}],{duration:bt(),iterations:Infinity,easing:"cubic-bezier(.1,.9,.3,1)"})
  },
});
