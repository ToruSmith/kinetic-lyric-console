/* 文字被切成 24 條細條，上下交錯滑入（百葉窗） */
Console.cart({
  kind: 'layout', id: 'blinds', apiVersion: 1,
  label: { zh: '文字被切成 24 條細條，上下交錯滑入（百葉窗）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const fit = ctx.fit;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const N=24,z=fit(sb,big);for(let i=0;i<N;i++){const e=CE(c,`font-size:${z}px;clip-path:inset(0 ${(1-(i+1)/N)*100}% 0 ${i/N*100}%)`);e.textContent=sb.plain;
    A(e,[{opacity:0,translate:`0 ${i%2?10:-10}cqh`},{opacity:1,translate:"0 0"}],{duration:D(),delay:i*30})}
  },
});
