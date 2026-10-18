/* 市松（近似）：棋盤格分兩階段浮現 */
Console.cart({
  kind: 'enter', id: 'checker-in', apiVersion: 1,
  label: { zh: '市松（近似）：棋盤格分兩階段浮現' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  play(ctx) {
    const A = ctx.anim;
    const el = ctx.el;
    const l = ctx.charEls;
    const d = ctx.duration;
       /* 市松：棋盤格分兩階段浮現（先一半格子，再細格補滿） ≈ */
    const ck=(s,o)=>`repeating-conic-gradient(#000 0 25%,transparent 0 50%) ${o} / ${s} ${s}`,kf=[],m=v=>({maskImage:v,WebkitMaskImage:v}),S="steps(1,end)";
    const H="linear-gradient(transparent,transparent)";
    [[H,0],[ck(".36em","0 0"),.22],[`${ck(".36em","0 0")},${ck(".18em",".09em .09em")}`,.5],["linear-gradient(#000,#000)",.78]].forEach(([v,o])=>kf.push({opacity:1,...m(v),offset:o,easing:S}));
    kf.push({opacity:1,...m("linear-gradient(#000,#000)"),offset:1});
    A(el,kf,{duration:d})
  },
});
