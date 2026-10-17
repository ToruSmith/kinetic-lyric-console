/* 逐字沿固定的雜訊軌跡漂移（非亂數） */
Console.cart({
  kind: 'fx', id: 'noise-drift', apiVersion: 1,
  label: { zh: '逐字沿固定的雜訊軌跡漂移（非亂數）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const l=cl(fw);(l.length?l:[fw]).forEach((c,i)=>{const a=[];for(let k=0;k<=5;k++){const h=Math.sin((i+1)*12.9898+k*78.233)*43758.5453,x=((h-Math.floor(h))-.5)*.9,g=Math.sin((i+1)*39.346+k*11.135)*43758.5453,y=((g-Math.floor(g))-.5)*.9;a.push({translate:`${k%5?x.toFixed(3):0}cqh ${k%5?y.toFixed(3):0}cqh`,offset:k/5})}A(c,a,{duration:5000,iterations:Infinity,easing:"ease-in-out",delay:-i*400})})
  },
});
