/* 疊層字：主文後方三層強調色描邊殘影，向右下展開 */
Console.cart({
  kind: 'layout', id: 'layered', apiVersion: 1,
  label: { zh: '疊層字：主文後方三層強調色描邊殘影，向右下展開' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
       /* 疊層字：主文後方三層強調色描邊殘影，向右下展開 */
    const z=_fz(sb,big,1.1);
    for(let i=3;i>=1;i--){const e=CE(c,`font-size:${z}px;letter-spacing:.1em;color:transparent;-webkit-text-stroke:max(1px,.03em) var(--a)`);e.textContent=sb.plain;e.dataset.nm=1;
     A(e,[{opacity:0,translate:"0 0"},{opacity:.7-i*.15,translate:`${i*1.1}cqh ${i*1.1}cqh`}],{duration:D()*1.2,delay:80*i/CONFIG.speed})}
    const e=CE(c,`font-size:${z}px;letter-spacing:.1em`);list.push(...chars(sb.plain,e));if(sb.en)enter(e,sb.en,list)
  },
});
