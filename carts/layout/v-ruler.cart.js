/* 左緣一條垂直刻度尺（每 5 格一長刻度），一個強調色小標記停在文字的高度；文字在尺右側，左對齊 */
Console.cart({
  kind: 'layout', id: 'v-ruler', apiVersion: 1,
  label: { zh: '左緣一條垂直刻度尺（每 5 格一長刻度），一個強調色小標記停在文字的高度；文字在尺右側，左對齊' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jFit, capSize, _jBrk, hair, _jT, tick, _jpx, _kIn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
       /* 縦目盛り：左緣一條垂直刻度尺（每 5 格一長刻度），一個強調色小標記停在文字的高度；文字在尺右側，左對齊 */
    const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...sb.plain],n=Math.max(1,_jN(sb.plain)),f=_jFit(n,vw*(port?.7:.6),Math.min(vh*.07,big*.5),port?5:3,1.12),z=capSize(f.z),lines=_jBrk(arr,f.per);if(!lines.length)return;
    const N=25;for(let i=0;i<N;i++){const lg=i%5===0;hair(c,`left:7cqw;width:${lg?2.6:1.4}cqw;top:calc(14cqh + ${(i*(72/(N-1))).toFixed(2)}cqh);transform-origin:left;opacity:${lg?.8:.45}`,_jT(i*14),"X",_jT(200))}
    tick(c,"left:6.4cqw;top:50%;margin-top:-.25em;font-size:12px;width:.9em;height:.9em;border-radius:50%",_jT(300));
    const e=txtEl(`left:${port?14:13}cqw;top:50%;translate:0 -50%;font-size:${_jpx(z)};line-height:1.4;letter-spacing:.08em;white-space:pre;text-align:left`);c.appendChild(e);
    lines.forEach(([a,b])=>{const d=document.createElement("div");e.appendChild(d);list.push(...chars(arr.slice(a,b).join(""),d))});
    _kIn(e,list,sb,_jT(250),0)
  },
});
