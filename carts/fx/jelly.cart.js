/* 果凍式橫縮縱伸交替 */
Console.cart({
  kind: 'fx', id: 'jelly', apiVersion: 1,
  label: { zh: '果凍式橫縮縱伸交替' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    A(fw,[{scale:"1.03 .97"},{scale:".97 1.03"}],{duration:900,iterations:Infinity,direction:"alternate",easing:"ease-in-out"})
  },
});
