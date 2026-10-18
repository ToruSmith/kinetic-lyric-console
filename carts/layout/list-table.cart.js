/* 像目錄或表格，每行一條細分隔線；用換行分行，行內用 ｜ 分成「項目｜內容」兩欄；單行長句自動拆成 2～4 行 */
Console.cart({
  kind: 'layout', id: 'list-table', apiVersion: 1,
  label: { zh: '像目錄或表格，每行一條細分隔線；用換行分行，行內用 ｜ 分成「項目｜內容」兩欄；單行長句自動拆成 2～4 行' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jBrk, capSize, _jpx, _jLate, _jT, hair } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 一覧表：像目錄或表格，每行一條細分隔線；用換行分行，行內用 ｜ 分成「項目｜內容」兩欄；單行長句自動拆成 2～4 行 */
    const vw=SWd(),vh=SHd(),port=vw<vh;let rows=sb.plain.split("\n").map(s=>s.trim()).filter(Boolean);
    if(rows.length<2){const arr=[...rows[0]||""],n=Math.max(1,_jN(sb.plain));rows=_jBrk(arr,Math.max(4,Math.ceil(n/Math.min(4,Math.max(2,Math.ceil(n/8)))))).map(([a,b])=>arr.slice(a,b).join(""))}
    rows=rows.slice(0,6);const cells=rows.map(r=>r.split(/[｜|\t]/).map(s=>s.trim()));
    const mx=Math.max(...cells.map(x=>_jN(x.join(""))),1),z=capSize(Math.min(vh*.075,vw*(port?.78:.6)/(mx*1.12+1),big*.5),.1);
    const box=document.createElement("div");box.style.cssText=`position:absolute;left:${port?8:14}cqw;right:${port?8:14}cqw;bottom:12cqh;display:flex;flex-direction:column`;c.appendChild(box);
    cells.forEach((cs,i)=>{const row=document.createElement("div");row.style.cssText=`position:relative;display:flex;justify-content:space-between;align-items:baseline;gap:1em;padding:${_jpx(z*.3)} 0;font-size:${_jpx(z)}`;box.appendChild(row);
     cs.forEach((t,j)=>{const e=txtEl(`position:relative;line-height:1.3;letter-spacing:.06em;white-space:pre-wrap;${cs.length>1&&j===0?"font-size:.62em;opacity:.75;":""}`);e.textContent="";row.appendChild(e);const l=chars(t,e);list.push(...l);
      const n0=ctx.animCount();if(sb.en)enter(e,sb.en,l);else A(e,[{opacity:0,transform:"translateX(-1.5cqw)"},{opacity:1,transform:"none"}],{duration:D()});_jLate(n0,_jT(i*120+150))});
     hair(row,"left:0;right:0;bottom:0;opacity:.5;transform-origin:left",_jT(i*120),"X",_jT(300))})
  },
});
