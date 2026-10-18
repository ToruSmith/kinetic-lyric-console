/* 長句拆成最多 3 行堆疊，行與行交替靠左、靠右 */
Console.cart({
  kind: 'layout', id: 'stack', apiVersion: 1,
  label: { zh: '長句拆成最多 3 行堆疊，行與行交替靠左、靠右' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const t=[...sb.plain],n=Math.min(3,Math.max(1,t.length)),k=Math.ceil(t.length/n);
    const e=txtEl(`inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 8cqw;font-size:${big*.9}px;line-height:1.05;letter-spacing:.05em`);c.appendChild(e);
    for(let i=0;i<n;i++){const r=document.createElement("div");r.textContent=t.slice(i*k,i*k+k).join("");r.style.textAlign=i%2?"right":"left";e.appendChild(r);A(r,[{opacity:0,transform:`translateX(${i%2?8:-8}cqw)`},{opacity:1,transform:"none"}],{duration:D(),delay:i*150})}
  },
});
