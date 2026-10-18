/* 漸層流動 */
Console.cart({
  kind: 'fx', id: 'gradient-flow', apiVersion: 1,
  label: { zh: '漸層流動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'color', domOnly: true },
  play(ctx) {
    const cl = () => ctx.charEls();
    const tel = () => ctx.textEls();
    const A = ctx.anim;
    const fw = ctx.el;
    /* 有逐字 .ch 時，漸層要畫在每個字上：background-clip:text 不會穿過帶動畫的 inline-block 子框，套在父層字會整句消失（只剩光暈） */
    const ch=cl(fw),els=ch.length?ch:tel(fw);
    els.forEach((e,i)=>{e.style.cssText+=";background-image:linear-gradient(90deg,#fff,var(--a),#fff,var(--a));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent";
    A(e,[{backgroundPosition:"0 0"},{backgroundPosition:"300% 0"}],{duration:4000,delay:ch.length?-i*350:0,iterations:Infinity,easing:"linear"})})
  },
});
