/* 対角配置：句子切成兩段放在對角，一條細線拐彎連過去 */
Console.cart({
  kind: 'layout', id: 'corners', apiVersion: 1,
  label: { zh: '対角配置：句子切成兩段放在對角，一條細線拐彎連過去' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jIdx, _jBrk, capSize, _jpx, hair, _jT, tick, _lEn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const D = ctx.enterMs;
     const vw=SWd(),vh=SHd(),port=vw<vh,txt=sb.plain.trim(),G=[...txt].filter(x=>!/\s/.test(x));if(G.length<2)return;
    let A0,B0;const sp=txt.split(/[,，、;；\s]+/).filter(Boolean);
    if(sp.length>=2){const k=Math.ceil(sp.length/2),lat=/\s/.test(txt)&&G.filter(ch=>/[\x21-\x7e]/.test(ch)).length>G.length*.6;A0=sp.slice(0,k).join(lat?" ":"");B0=sp.slice(k).join(lat?" ":"")}
    else{const a=[...txt],k=Math.ceil(a.length/2);A0=a.slice(0,k).join("").trim();B0=a.slice(k).join("").trim()}
    if(!A0||!B0)return;
    const anti=_jIdx(sb)%2===1,maxPer=port?5:9,ar=[...A0],br=[...B0],la=_jBrk(ar,maxPer),lb=_jBrk(br,maxPer);if(!la.length||!lb.length)return;
    const bw=vw*(port?.84:.58),mx=Math.max(...la.map(([a,b])=>b-a),...lb.map(([a,b])=>b-a));
    const z=capSize(Math.min(bw/(mx*1.1),vh*(port?.24:.3)/(Math.max(la.length,lb.length)*1.1),big*.7),.22);
    const mk=(arr,ls,right,css)=>{const e=txtEl(`${css};font-size:${_jpx(z)};line-height:1.1;letter-spacing:.02em;text-align:${right?"right":"left"}`);c.appendChild(e);
     ls.forEach(([a,b])=>{const d=document.createElement("div");d.style.whiteSpace="pre";e.appendChild(d);list.push(...chars(arr.slice(a,b).join(""),d))});return e};
    const ea=mk(ar,la,anti,`${anti?"right":"left"}:7.5cqw;top:13cqh`),eb=mk(br,lb,!anti,`${anti?"left":"right"}:7.5cqw;bottom:13cqh`);
    const hA=la.length*z*1.1,yLine=`calc(13cqh + ${_jpx(hA+z*.16)})`,xe=anti?"left:7.5cqw":"right:7.5cqw";
    hair(c,`left:7.5cqw;right:7.5cqw;top:${yLine};transform-origin:${anti?"right":"left"};opacity:.6`,_jT(150),"X",D()*.8);
    const v=hair(c,`${anti?"left":"right"}:7.5cqw;top:${yLine};bottom:calc(13cqh + ${_jpx(lb.length*z*1.1+z*.16)});height:auto;width:1px;transform-origin:top;opacity:.6`,_jT(150)+D()*.5,"Y",D()*.5);
    tick(c,`${anti?"left":"right"}:calc(7.5cqw - .25em);bottom:calc(13cqh + ${_jpx(lb.length*z*1.1+z*.16)} - .25em);font-size:${_jpx(z*.5)}`,_jT(150)+D()*.95,D()*.3);
    const d1=_jT(120);_lEn(sb,ea,list.filter(x=>ea.contains(x)),0,[{opacity:0,transform:`translateX(${anti?2:-2}cqw)`},{opacity:1,transform:"none"}]);
    _lEn(sb,eb,list.filter(x=>eb.contains(x)),d1+D()*.3,[{opacity:0,transform:`translateX(${anti?-2:2}cqw)`},{opacity:1,transform:"none"}])
  },
});
