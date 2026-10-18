/* 以空白／標點分詞，一個詞一個詞快速閃現，例如 `快 跑 不 要 停下來`；沒有空白時每 2 字一組 */
Console.cart({
  kind: 'layout', id: 'flash-words', apiVersion: 1,
  label: { zh: '以空白／標點分詞，一個詞一個詞快速閃現，例如 `快 跑 不 要 停下來`；沒有空白時每 2 字一組' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const CE = ctx.centerIn;
    const SWd = ctx.sw;
    const A = ctx.anim;
    let t=sb.plain.split(/[\s，。、,.！!？?]+/).filter(Boolean);if(t.length<2){const ch=[...sb.plain];t=[];for(let i=0;i<ch.length;i+=2)t.push(ch.slice(i,i+2).join(""))}
    const d=dur*900/t.length;t.forEach((x,i)=>{const e=CE(c,`font-size:${Math.min(big*1.4,SWd()/Math.max(x.length,1)*.8)}px;letter-spacing:.05em`);e.textContent=x;
     A(e,[{opacity:0,transform:"scale(1.15)"},{opacity:1,transform:"scale(1)",offset:.05},{opacity:1,offset:.95},{opacity:0}],{duration:d,delay:i*d,easing:"linear"})})
  },
});
