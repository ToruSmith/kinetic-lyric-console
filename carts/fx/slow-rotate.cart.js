/* 極緩慢左右傾斜（±1.2°） */
Console.cart({
  kind: 'fx', id: 'slow-rotate', apiVersion: 1,
  label: { zh: '極緩慢左右傾斜（±1.2°）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'rot' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    A(fw,[{rotate:"-1.2deg"},{rotate:"1.2deg"}],{duration:6000,iterations:Infinity,direction:"alternate",easing:"ease-in-out"})
  },
});
