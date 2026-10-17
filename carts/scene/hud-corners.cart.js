/* HUD 四角：L 形角標＋刻度，隨拍閃一下 */
Console.cart({
  kind: 'scene', id: 'hud-corners', apiVersion: 1,
  label: { zh: 'HUD 四角' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'over', group: 'hudc', amount: 50, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
       /* HUD 四角：L 形角標＋刻度，隨拍閃一下 */
     const{W,H,t}=p,m=H*.04,l=H*.09;c.strokeStyle=p.R;lw(c,p,.004,2);al(c,p,.35+.5*p.a+.1*p.bp);c.beginPath();
     [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([x,y,sx,sy])=>{c.moveTo(x,y+sy*l);c.lineTo(x,y);c.lineTo(x+sx*l,y);for(let i=1;i<4;i++){c.moveTo(x+sx*l*(.2+i*.15),y);c.lineTo(x+sx*l*(.2+i*.15),y+sy*l*.1)}});c.stroke()
  },
});
