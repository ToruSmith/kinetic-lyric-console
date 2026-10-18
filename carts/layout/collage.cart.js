/* 拼貼風：每個字像剪貼的貼紙，隨機底色與字體（同一句固定） */
Console.cart({
  kind: 'layout', id: 'collage', apiVersion: 1,
  label: { zh: '拼貼風：每個字像剪貼的貼紙，隨機底色與字體（同一句固定）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['grunge'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const sr = ctx.random;
    const FONTS = ctx.fonts;
    const txtEl = ctx.text;
    const SWd = ctx.sw;
    const A = ctx.anim;
    const r=sr(sb.s),fk=Object.values(FONTS),bg=[["#f4efe1","#111"],["#111","#f4efe1"],["#e63946","#fff"],["#ffd166","#111"],["transparent","#fff"]];
    const e=txtEl("inset:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1cqh .6cqw;padding:0 8cqw;letter-spacing:0");c.appendChild(e);
    const z=Math.min(big*.5,SWd()/Math.max(sb.plain.length,4)*.8);
    [...sb.plain].forEach((ch,i)=>{if(/\s/.test(ch))return;const b=bg[r()*bg.length|0],sp=document.createElement("span");sp.textContent=ch;
     sp.style.cssText=`display:inline-block;font-family:${fk[r()*fk.length|0]};font-size:${z*(.7+r()*.8)}px;padding:.08em .14em;background:${b[0]};color:${b[1]};rotate:${(r()-.5)*16}deg;translate:0 ${(r()-.5)*3}cqh;box-shadow:${b[0]==="transparent"?"none":"2px 3px 0 rgba(0,0,0,.4)"}`;
     e.appendChild(sp);A(sp,[{opacity:0,transform:"scale(1.6)"},{opacity:1,transform:"scale(1)"}],{duration:140,delay:i*90,easing:"steps(2)"})})
  },
});
