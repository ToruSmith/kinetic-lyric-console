/* 螢幕邊框：雙層內縮邊框，四角缺口 */
Console.cart({
  kind: 'scene', id: 'screen-border', apiVersion: 1,
  label: { zh: '螢幕邊框' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'over', group: 'border', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
       /* 螢幕邊框：雙層內縮邊框，四角缺口 */
     const{W,H}=p,m=H*.035,q=m*.5;c.strokeStyle=p.R;lw(c,p,.006,2);al(c,p,.3+.6*p.a);c.strokeRect(m,m,W-2*m,H-2*m);lw(c,p,.002);al(c,p,.2+.4*p.a);c.strokeRect(m+q,m+q,W-2*(m+q),H-2*(m+q));
     c.fillStyle=p.R;al(c,p,.4+.5*p.a);[[m,m],[W-m,m],[m,H-m],[W-m,H-m]].forEach(([x,y])=>c.fillRect(x-q*.5,y-q*.5,q,q))
  },
});
