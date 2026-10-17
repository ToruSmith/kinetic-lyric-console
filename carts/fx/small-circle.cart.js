/* 整句沿小圓軌跡移動（半徑<1% 畫面高） */
Console.cart({
  kind: 'fx', id: 'small-circle', apiVersion: 1,
  label: { zh: '整句沿小圓軌跡移動（半徑<1% 畫面高）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const a=[];for(let k=0;k<=8;k++){const t=k/8*Math.PI*2;a.push({translate:`${(Math.cos(t)*.7).toFixed(3)}cqh ${(Math.sin(t)*.7).toFixed(3)}cqh`,offset:k/8})}A(fw,a,{duration:4000,iterations:Infinity,easing:"linear"})
  },
});
