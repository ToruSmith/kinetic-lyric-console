/* 滿版：跑馬燈，兩排橫向捲動，一排實心一排空心 */
Console.cart({
  kind: 'layout', id: 'marquee', apiVersion: 1,
  label: { zh: '滿版：跑馬燈，兩排橫向捲動，一排實心一排空心' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  flags: { full: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host;
    const sbKs = ctx.sizeScale;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const enter = ctx.enter;
    const ks=sbKs(sb),h=(sb.plain+"　").repeat(6);[[ -11,"0","-50%",""],[13.4,"-50%","0","color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.7)"]].forEach(([off,a,b,css],i)=>{
    const e=txtEl(`left:0;top:${47+off*ks}cqh;margin-top:-.6em;font-size:${(i?14:10)*ks}cqh;white-space:nowrap;letter-spacing:.1em;${css}`);e.textContent=h+h;c.appendChild(e);A(e,[{translate:a+" 0"},{translate:b+" 0"}],{duration:12000,iterations:Infinity,easing:"linear"})});enter(c,"fade")
  },
});
