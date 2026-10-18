/* 文字轉 90 度橫躺，沿畫面右緣由上往下讀，旁邊一條細線；字小、佔寬很窄 */
Console.cart({
  kind: 'layout', id: 'tilt-vertical', apiVersion: 1,
  label: { zh: '文字轉 90 度橫躺，沿畫面右緣由上往下讀，旁邊一條細線；字小、佔寬很窄' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, capSize, _jBrk, _jpx, hair, _jT, _kIn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
       /* 縦倒し：文字轉 90 度橫躺，沿畫面右緣由上往下讀，旁邊一條細線；字小、佔寬很窄 */
    const vw=SWd(),vh=SHd(),arr=[...sb.plain],n=Math.max(1,_jN(sb.plain)),M=Math.min(vw,vh);
    const cols=n>26?2:1,per=Math.ceil(n/cols),z=capSize(Math.min(M*.075,vh*.72/(per*1.1),big*.5),.1),lines=_jBrk(arr,per);if(!lines.length)return;
    const e=txtEl(`right:9cqw;top:50%;translate:0 -50%;font-size:${_jpx(z)};line-height:1.5;letter-spacing:.14em;writing-mode:vertical-rl;text-orientation:sideways;white-space:pre`);c.appendChild(e);
    lines.forEach(([a,b])=>{const d=document.createElement("div");d.style.whiteSpace="pre";e.appendChild(d);list.push(...chars(arr.slice(a,b).join(""),d))});
    hair(c,`right:${_jpx(vw*.09+z*(lines.length*1.5+.5))};top:22cqh;width:1px;height:56cqh;transform-origin:top;opacity:.6`,0,"Y",_jT(400));
    _kIn(e,list,sb,_jT(150),0)
  },
});
