/* 句子切成上下兩半，各自從左右滑入，中間一條線 */
Console.cart({
  kind: 'layout', id: 'split-screen', apiVersion: 1,
  label: { zh: '句子切成上下兩半，各自從左右滑入，中間一條線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const fit = ctx.fit;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const t=[...sb.plain],k=Math.ceil(t.length/2),z=fit(sb,big);
    [[t.slice(0,k).join(""),`bottom:calc(50% + ${z*.3}px)`,-1],[t.slice(k).join(""),`top:calc(50% + ${z*.3}px)`,1]].forEach(([x,top,d],i)=>{const e=txtEl(`left:0;right:0;${top};text-align:center;font-size:${z}px;line-height:1.1`);e.textContent=x;c.appendChild(e);A(e,[{opacity:0,translate:`${d*25}cqw 0`},{opacity:1,translate:"0 0"}],{duration:D(),delay:i*150})});
    const l=document.createElement("div");l.className="ln";l.style.cssText="position:absolute;left:10cqw;right:10cqw;top:50%";c.appendChild(l);A(l,[{transform:"scaleX(0)"},{transform:"scaleX(1)"}],{duration:D()})
  },
});
