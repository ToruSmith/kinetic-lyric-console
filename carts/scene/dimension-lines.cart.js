/* 寸法線：畫面上緣與左緣各一條帶箭頭的尺寸線，線上有小短刻（像製圖標註），不寫數字 */
Console.cart({
  kind: 'scene', id: 'dimension-lines', apiVersion: 1,
  label: { zh: '寸法線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'tech' },
  source: 'https://github.com/852wa/JIZURA',
  layer: 'over', group: 'dim', amount: 50, cost: '輕',
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const al = u.fade;
       /* 寸法線：畫面上緣與左緣各一條帶箭頭的尺寸線，線上有小短刻（像製圖標註），不寫數字 */
     const{W,H}=p,m=H*.05,a=H*.014;c.strokeStyle=p.C;c.lineWidth=Math.max(1,H*.0022);al(c,p,.3+.5*p.a);c.beginPath();
     c.moveTo(m,m);c.lineTo(W-m,m);c.moveTo(m,m);c.lineTo(m+a*1.6,m-a*.6);c.moveTo(m,m);c.lineTo(m+a*1.6,m+a*.6);c.moveTo(W-m,m);c.lineTo(W-m-a*1.6,m-a*.6);c.moveTo(W-m,m);c.lineTo(W-m-a*1.6,m+a*.6);
     c.moveTo(m,m-a);c.lineTo(m,m+a);c.moveTo(W-m,m-a);c.lineTo(W-m,m+a);
     c.moveTo(m,m);c.lineTo(m,H-m);c.moveTo(m,m);c.lineTo(m-a*.6,m+a*1.6);c.moveTo(m,m);c.lineTo(m+a*.6,m+a*1.6);c.moveTo(m,H-m);c.lineTo(m-a*.6,H-m-a*1.6);c.moveTo(m,H-m);c.lineTo(m+a*.6,H-m-a*1.6);
     c.moveTo(m-a,H-m);c.lineTo(m+a,H-m);c.stroke()
  },
});
