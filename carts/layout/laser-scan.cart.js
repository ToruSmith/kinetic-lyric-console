/* 亮線掃過露出文字（偶數句橫向、奇數句直向） */
Console.cart({
  kind: 'layout', id: 'laser-scan', apiVersion: 1,
  label: { zh: '亮線掃過露出文字（偶數句橫向、奇數句直向）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { full: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const subs = ctx.sentences;
    const fit = ctx.fit;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const i=subs.indexOf(sb),vert=i%2===1,z=fit(sb,big),S=Math.min(Math.max(dur*450,700),1800),SW=SWd(),SH=SHd();
    const e=CE(c,`font-size:${z}px;letter-spacing:.12em`);e.textContent=sb.plain;const cl=vert?"inset(0 0 100% 0)":"inset(0 100% 0 0)";
    A(e,[{clipPath:cl},{clipPath:"inset(0)"}],{duration:S,easing:"linear"});
    const mk=css=>{const d=document.createElement("div");d.style.cssText="position:absolute;pointer-events:none;"+css;c.appendChild(d);return d};
    const end=vert?`0 ${SH}px`:`${SW}px 0`,mv=d=>A(d,[{translate:"0 0",opacity:1},{translate:end,opacity:1,offset:.97},{translate:end,opacity:0}],{duration:S*1.03,easing:"linear"});
    const gl="0 0 2cqh 4px var(--a),0 0 6cqh var(--a)";
    mv(mk(vert?`left:0;right:0;top:0;height:3px;background:var(--a);box-shadow:${gl}`:`top:0;bottom:0;left:0;width:3px;background:var(--a);box-shadow:${gl}`));
    mv(mk(vert?`left:0;right:0;top:-14cqh;height:14cqh;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--a) 35%,transparent))`:`top:0;bottom:0;left:-14cqw;width:14cqw;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--a) 35%,transparent))`));
    const gr=mk("inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 4cqh),repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 4cqh)");
    A(gr,[{clipPath:cl,opacity:1},{clipPath:"inset(0)",opacity:1,offset:.5},{clipPath:"inset(0)",opacity:.35}],{duration:S*1.5,easing:"linear"})
  },
});
