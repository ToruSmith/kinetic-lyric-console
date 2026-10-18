/* 逐字左右搖擺（相位錯開） */
Console.cart({
  kind: 'fx', id: 'sway-char', apiVersion: 1,
  label: { zh: '逐字左右搖擺（相位錯開）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'rot' },
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const l=cl(fw);(l.length?l:[fw]).forEach((c,i)=>A(c,[{rotate:"-4deg"},{rotate:"4deg"}],{duration:2000,iterations:Infinity,direction:"alternate",easing:"ease-in-out",delay:-i*180}))
  },
});
