/* 突風：約每 2.2 秒一陣風，字由左而右被吹歪再彈回 */
Console.cart({
  kind: 'fx', id: 'wind-gust', apiVersion: 1,
  label: { zh: '突風：約每 2.2 秒一陣風，字由左而右被吹歪再彈回' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const l=cl(fw);(l.length?l:[fw]).forEach((c,i,a)=>A(c,[{translate:"0 0",rotate:"0deg",offset:0},{translate:".12em 0",rotate:"3deg",offset:.1},{translate:"-.03em 0",rotate:"-1deg",offset:.22},{translate:"0 0",rotate:"0deg",offset:.36},{translate:"0 0",rotate:"0deg",offset:1}],{duration:2200,iterations:Infinity,easing:"ease-out",delay:i*40}))
  },
});
