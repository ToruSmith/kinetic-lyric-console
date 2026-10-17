/* ぶら下がり：每字像吊著，從上緣左右擺動 */
Console.cart({
  kind: 'fx', id: 'dangle', apiVersion: 1,
  label: { zh: 'ぶら下がり：每字像吊著，從上緣左右擺動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const l=cl(fw);(l.length?l:[fw]).forEach((c,i)=>{c.style.transformOrigin="50% 0";A(c,[{rotate:"-6deg"},{rotate:"6deg"}],{duration:1500+(i*37)%500,iterations:Infinity,direction:"alternate",easing:"ease-in-out",delay:-i*130})})
  },
});
