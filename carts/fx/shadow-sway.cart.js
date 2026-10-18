/* 影が揺れる：字的影子方向與長度慢慢擺動 */
Console.cart({
  kind: 'fx', id: 'shadow-sway', apiVersion: 1,
  label: { zh: '影が揺れる：字的影子方向與長度慢慢擺動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'color' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const a=[];for(let k=0;k<=8;k++){const t=k/8*Math.PI*2,ang=Math.PI/3+Math.PI/4*Math.sin(t),L=.8+.3*Math.sin(t*1.7+1);a.push({filter:`drop-shadow(${(Math.cos(ang)*L).toFixed(3)}cqh ${(Math.sin(ang)*L).toFixed(3)}cqh 0 color-mix(in srgb,var(--a) 45%,rgba(0,0,0,.7)))`,offset:k/8})}A(fw,a,{duration:5500,iterations:Infinity,easing:"linear"})
  },
});
