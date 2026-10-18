/* 平衡圓：橫桿隨時間傾斜，兩端圓大小相反 */
Console.cart({
  kind: 'scene', id: 'balancing-circles', apiVersion: 1,
  label: { zh: '平衡圓' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'circles', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const TAU = Math.PI * 2;
       /* 平衡圓：橫桿隨時間傾斜，兩端圓大小相反 */
     const{W,H,t}=p,a=S(t*.7)*.12*(1+.4*p.bp),L=W*.28,cx=W/2,cy=H*.78;c.save();c.translate(cx,cy);c.rotate(a);c.strokeStyle=c.fillStyle=p.R;lw(c,p,.004,2);al(c,p,.2+.5*p.a);
     c.beginPath();c.moveTo(-L,0);c.lineTo(L,0);c.stroke();c.beginPath();c.arc(-L,-H*.06,H*.06*(1+.3*S(t*.7)),0,TAU);c.fill();c.beginPath();c.arc(L,-H*.045,H*.045*(1-.3*S(t*.7)),0,TAU);c.fill();c.restore();
     c.beginPath();c.moveTo(cx,cy);c.lineTo(cx-H*.04,H);c.lineTo(cx+H*.04,H);c.closePath();al(c,p,.15+.3*p.a);c.fill()
  },
});
