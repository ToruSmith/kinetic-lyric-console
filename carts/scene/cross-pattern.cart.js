/* 十字圖案：規則的加號陣列，緩慢旋轉 */
Console.cart({
  kind: 'scene', id: 'cross-pattern', apiVersion: 1,
  label: { zh: '十字圖案' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'cross', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
       /* 十字圖案：規則的加號陣列，緩慢旋轉 */
     const{W,H,t}=p,s=Math.min(W,H)/(p.lite?8:12),z=s*.18;c.strokeStyle=p.C;lw(c,p,.003,1.5);al(c,p,.06+.3*p.a);c.beginPath();
     for(let y=s/2;y<H;y+=s)for(let x=s/2;x<W;x+=s){const a=t*.3*((x+y)/s%2?1:-1)*.2;const ca=Math.cos(a),sa=Math.sin(a);c.moveTo(x-z*ca,y-z*sa);c.lineTo(x+z*ca,y+z*sa);c.moveTo(x+z*sa,y-z*ca);c.lineTo(x-z*sa,y+z*ca)}c.stroke()
  },
});
