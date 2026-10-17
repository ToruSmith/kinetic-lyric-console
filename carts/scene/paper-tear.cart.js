/* 撕紙邊：畫面下緣一條不規則撕裂的紙邊＋陰影 */
Console.cart({
  kind: 'scene', id: 'paper-tear', apiVersion: 1,
  label: { zh: '撕紙邊' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'over', group: 'tear', amount: 40, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
       /* 撕紙邊：畫面下緣一條不規則撕裂的紙邊＋陰影 */
     const{W,H,r}=p,n=p.lite?30:60,y0=H*.93,pts=[];for(let i=0;i<=n;i++)pts.push([i/n*W,y0+(r()-.5)*H*.022+S(i*.7)*H*.006]);
     c.beginPath();c.moveTo(0,H);pts.forEach(q=>c.lineTo(q[0],q[1]));c.lineTo(W,H);c.closePath();c.shadowColor="rgba(0,0,0,.6)";c.shadowBlur=H*.015;c.shadowOffsetY=-H*.004;c.fillStyle=p.C;al(c,p,.35+.55*p.a);c.fill()
  },
});
