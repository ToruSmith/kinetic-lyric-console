/* **吃 `{}`**：`{}` 關鍵字放大成強調色，其餘小字排在旁邊；沒寫 `{}` 時取前 2 字 */
Console.cart({
  kind: 'layout', id: 'keyword', apiVersion: 1,
  label: { zh: '**吃 `{}`**：`{}` 關鍵字放大成強調色，其餘小字排在旁邊；沒寫 `{}` 時取前 2 字' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { brace: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const e=txtEl("inset:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;padding:0 8cqw;letter-spacing:.3em");c.appendChild(e);let ks=0;
    const parts=sb.raw.split(/(\{[^}]*\})/).filter(Boolean);if(!sb.br.length)parts.splice(0,1,`{${sb.raw.slice(0,2)}}`,sb.raw.slice(2));
    parts.forEach(p=>{const k=/^\{/.test(p),t=k?p.slice(1,-1):p,sp=document.createElement("span");sp.textContent=t;sp.style.cssText=k?`font-size:${big*.8}px;color:var(--a);margin:0 1cqw;letter-spacing:0;display:inline-block`:`font-size:${big*.267}px;opacity:.75;white-space:pre-wrap`;e.appendChild(sp);
     k?A(sp,[{opacity:0,transform:"scale(.4)"},{opacity:1,transform:"scale(1.12)",offset:.6},{opacity:1,transform:"scale(1)"}],{duration:D(),delay:(ks++)*200}):A(sp,[{opacity:0},{opacity:.75}],{duration:D()})})
  },
});
