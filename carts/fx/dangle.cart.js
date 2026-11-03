/* 懸吊：每字像吊著，從上緣左右擺動 */
Console.cart({
  kind: 'fx', id: 'dangle', apiVersion: 1,
  label: { zh: '懸吊：每字像吊著，從上緣左右擺動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['俏皮'], tags: ['旋轉', '逐字'], use: '懸吊晃動的趣味句', draft: true },
  rand: { group: 'rot', domOnly: true },
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const l=cl(fw);(l.length?l:[fw]).forEach((c,i)=>{c.style.transformOrigin="50% 0";A(c,[{rotate:"-6deg"},{rotate:"6deg"}],{duration:1500+(i*37)%500,iterations:Infinity,direction:"alternate",easing:"ease-in-out",delay:-i*130})})
  },
});
