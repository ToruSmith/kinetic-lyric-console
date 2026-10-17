/* 陰影幾何：大塊傾斜方塊，帶強調色錯位投影 */
Console.cart({
  kind: 'scene', id: 'shadow-shapes', apiVersion: 1,
  label: { zh: '陰影幾何' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'shadow', amount: 40, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
       /* 陰影幾何：大塊傾斜方塊，帶強調色錯位投影 */
     const{W,H,t,r}=p;
     for(let i=0;i<4;i++){const x=r()*W,y=r()*H,w=W*(.12+.12*r()),h=H*(.2+.2*r()),a=(r()-.5)*.8+S(t*.2+i)*.05,d=H*.012*(1+p.bp);c.save();c.translate(x,y);c.rotate(a);
      c.fillStyle=p.R;al(c,p,.1+.22*p.a);c.fillRect(-w/2+d*2,-h/2+d*2,w,h);c.fillStyle="#000";al(c,p,.1+.25*p.a);c.fillRect(-w/2,-h/2,w,h);c.restore()}
  },
});
