/* 手寫：逐字出現並描繪底線；預設用手寫字體，若你指定了字體則尊重你的選擇 */
Console.cart({
  kind: 'layout', id: 'handwrite', apiVersion: 1,
  label: { zh: '手寫：逐字出現並描繪底線；預設用手寫字體，若你指定了字體則尊重你的選擇' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['grunge'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const sr = ctx.random;
    const SWd = ctx.sw;
    const txtEl = ctx.text;
    const CONFIG = ctx.config;
    const FONTS = ctx.fonts;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const curFont = "";
    const r=sr(sb.s),z=Math.min(big*.7,SWd()/Math.max(sb.plain.length,4)*.85);
    const e=txtEl(`inset:0;display:flex;align-items:center;justify-content:center;padding:0 6cqw;font-size:${z}px;letter-spacing:.08em`);e.style.fontFamily=(curFont||CONFIG.font!=="明體")?(FONTS[curFont||CONFIG.font]||FONTS.手寫):FONTS.手寫;   /* 有指定每句字體、或全域字體不是預設明體時，尊重使用者選擇；否則維持手寫（楷體）風 */
    c.appendChild(e);
    const l=chars(sb.plain,e),n=l.length,t=Math.min(dur*600/n,260);
    l.forEach((x,i)=>{x.style.translate=`0 ${(r()-.5)*2}cqh`;x.style.rotate=`${(r()-.5)*5}deg`;A(x,[{clipPath:"inset(-10% 100% -10% 0)"},{clipPath:"inset(-10% 0 -10% 0)"}],{duration:t*1.4,delay:i*t,easing:"linear"})});
    const ln=document.createElement("div");ln.style.cssText=`position:absolute;left:12cqw;right:12cqw;top:calc(50% + ${z*.75}px);height:3px;border-radius:2px;background:var(--a);transform-origin:left`;c.appendChild(ln);A(ln,[{transform:"scaleX(0)"},{transform:"scaleX(1)"}],{duration:n*t,easing:"linear"})
  },
});
