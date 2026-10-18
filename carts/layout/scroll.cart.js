/* 捲動歌詞：同時顯示前後各兩句，目前句最大，其他句模糊淡出（需要上下文，第一句與最後一句會少一邊） */
Console.cart({
  kind: 'layout', id: 'scroll', apiVersion: 1,
  label: { zh: '捲動歌詞：同時顯示前後各兩句，目前句最大，其他句模糊淡出（需要上下文，第一句與最後一句會少一邊）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host;
    const subs = ctx.sentences;
    const sbKs = ctx.sizeScale;
    const txtEl = ctx.text;
    const SHd = ctx.sh;
    const SWd = ctx.sw;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const i=subs.indexOf(sb),ks=sbKs(sb);for(let k=-2;k<=2;k++){const x=subs[i+k];if(!x)continue;const e=txtEl(`left:8cqw;right:8cqw;top:calc(50% + ${k*11*ks}cqh);margin-top:-1em;font-size:${Math.min((k?3.2:5)*1.5*ks*SHd()/100,SWd()*.84*.96/(1.1*Math.max(1,[...x.plain].length)))}px;letter-spacing:.1em;filter:blur(${Math.abs(k)*2}px)`);e.textContent=x.plain;c.appendChild(e);
    A(e,[{translate:"0 9cqh",opacity:0},{translate:"0 0",opacity:k?.8/(Math.abs(k)+.5):1}],{duration:D()*1.3})}
  },
});
