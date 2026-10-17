/* コマ撮り：逐字停格跳向定位，每格姿勢不同 */
const hh = (a,b)=>{const x=Math.sin(a*12.9898+b*78.233)*43758.5453;return x-Math.floor(x)};
Console.cart({
  kind: 'enter', id: 'stop-motion', apiVersion: 1,
  label: { zh: 'コマ撮り：逐字停格跳向定位，每格姿勢不同' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const spL = () => ctx.speed;
    const el = ctx.el;
    const l = ctx.charEls;
    const d = ctx.duration;
       /* コマ撮り：逐字停格跳向定位，每格姿勢略不同（索引雜湊，不是亂數） */
    const K=5;
    if(l&&l.length)l.forEach((c,i)=>{const kf=[];
     for(let k=0;k<K-1;k++){const f=1-Math.pow(k/(K-1),3),ang=hh(i,81)*6.2832,Dd=.7+.5*hh(i,83),r=(a)=>(hh(i*7+k,a)-.5)*2;
      kf.push({opacity:k===0?0:1,transform:`translate(${(Math.cos(ang)*Dd*f+r(84)*.05).toFixed(3)}em,${(Math.sin(ang)*Dd*f+r(85)*.05).toFixed(3)}em) rotate(${(r(86)*22*f).toFixed(1)}deg) scale(${(1+r(88)*.14*f).toFixed(3)})`,offset:k/K,easing:"steps(1,end)"})}
     kf.push({opacity:1,transform:"none",offset:1});
     A(c,kf,{duration:d,delay:i*60/spL()})});
    else A(el,[{opacity:0},{opacity:1}],{duration:d,easing:"steps(4,end)"})
  },
});
