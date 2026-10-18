/* 斜向填色：一道斜切色帶，色帶邊界隨拍推移，漸層向外淡出 */
Console.cart({
  kind: 'scene', id: 'diag-fill', apiVersion: 1,
  label: { zh: '斜向填色' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'split', amount: 50, cost: '輕',
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
       /* 斜向填色：一道斜切色帶，色帶邊界隨拍推移，漸層向外淡出 */
     const{W,H,t}=p,d=W*(.04*S(t*.6)+.05*p.bp),g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,p.G1);g.addColorStop(.5,p.R);g.addColorStop(1,p.G2);
     c.fillStyle=g;al(c,p,.1+.4*p.a);c.beginPath();c.moveTo(W*.55+d,0);c.lineTo(W,0);c.lineTo(W,H);c.lineTo(W*.25+d,H);c.closePath();c.fill()
  },
});
