/* 逐字波動 */
Console.cart({
  kind: 'fx', id: 'wave', apiVersion: 1,
  label: { zh: '逐字波動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'char' },
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    let l=cl(fw);if(!l.length)l=[fw];l.forEach((c,i)=>A(c,[{translate:"0 0"},{translate:"0 -1.2cqh"},{translate:"0 0"},{translate:"0 1.2cqh"},{translate:"0 0"}],{duration:1800,delay:0,iterations:Infinity,easing:"ease-in-out",iterationStart:(i*.12)%1}))
  },
});
