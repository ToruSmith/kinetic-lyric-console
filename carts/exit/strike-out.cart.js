/* 線で消す：每字先被畫一條強調色線，再壓扁消失 */
const swL = (i,n)=>i/Math.max(1,n-1);
Console.cart({
  kind: 'exit', id: 'strike-out', apiVersion: 1,
  label: { zh: '線で消す：每字先被畫一條強調色線，再壓扁消失' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{opacity:1,transform:"none"},{opacity:1,transform:"none",offset:.5},{opacity:0,transform:"scaleY(.05)"}],
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    c.style.backgroundImage="linear-gradient(var(--a),var(--a))";c.style.backgroundRepeat="no-repeat";c.style.backgroundPosition="0 56%";   /* 線畫在每個字自己的背景上，用同一段動畫的 backgroundSize 拉出 */
    return{kf:[{opacity:1,transform:"none",backgroundSize:"0% .07em"},{opacity:1,transform:"none",backgroundSize:"100% .07em",offset:.45},{opacity:1,transform:"none",backgroundSize:"100% .07em",offset:.6},{opacity:0,transform:"scaleY(.05)",backgroundSize:"100% .07em"}],dur:.6,at:swL(i,n)*.4}
  },
});
