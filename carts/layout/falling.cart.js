/* 字雨：背景持續落下的淡字＋主文逐字落下彈跳 */
Console.cart({
  kind: 'layout', id: 'falling', apiVersion: 1,
  label: { zh: '字雨：背景持續落下的淡字＋主文逐字落下彈跳' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { strong: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _chs } = ctx.lib;
    const sr = ctx.random;
    const SWd = ctx.sw;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const CONFIG = ctx.config;
    const CE = ctx.centerIn;
    const chars = ctx.splitChars;
    const D = ctx.enterMs;
       /* 字雨：背景持續落下的淡字＋主文逐字落下彈跳 */
    const r=sr(sb.s),vw=SWd(),z=Math.min(big*.6,vw/Math.max(sb.plain.length,3)*.85),pool=_chs(sb);
    for(let i=0;i<14;i++){const e=txtEl(`left:${((i+.5)/14*100).toFixed(2)}cqw;top:-10cqh;font-size:${z*.35*(.7+r()*.6)}px;opacity:.25;letter-spacing:0;color:var(--a)`);delete e.dataset.t;e.dataset.nm=1;e.textContent=pool[r()*pool.length|0]||"・";c.appendChild(e);
     A(e,[{translate:"0 0"},{translate:"0 130cqh"}],{duration:(2600+r()*2600)/CONFIG.speed,delay:-r()*4000,iterations:Infinity,easing:"linear"})}
    const e=CE(c,`font-size:${z}px;letter-spacing:.1em;padding-left:.1em`),ch=chars(sb.plain,e);list.push(...ch);
    ch.forEach((x,i)=>A(x,[{opacity:0,transform:"translateY(-90cqh)",easing:"cubic-bezier(.55,0,1,.45)"},{opacity:1,transform:"translateY(-80cqh)",offset:.03},{opacity:1,transform:"none",offset:.6,easing:"cubic-bezier(0,.55,.45,1)"},{transform:"translateY(-5cqh)",offset:.78,easing:"cubic-bezier(.55,0,1,.45)"},{transform:"none",offset:.9},{transform:"none"}],{duration:D()*1.6,delay:i*110/CONFIG.speed,easing:"linear"}))
  },
});
