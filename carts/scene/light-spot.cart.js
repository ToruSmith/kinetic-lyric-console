/* 光斑：兩道緩動聚光，中心較亮 */
Console.cart({
  kind: 'scene', id: 'light-spot', apiVersion: 1,
  label: { zh: '光斑' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'light', amount: 40, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
       /* 光斑：兩道緩動聚光，中心較亮 */
     const{W,H,t}=p;for(let k=0;k<2;k++){const x=W*(.5+.3*S(t*.31+k*2.4)),y=H*(.45+.25*Math.cos(t*.27+k*1.7)),R=H*(.45+.1*p.bp),g=c.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,k?p.R:p.C);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;al(c,p,.08+.35*p.a);c.fillRect(0,0,W,H)}
  },
});
