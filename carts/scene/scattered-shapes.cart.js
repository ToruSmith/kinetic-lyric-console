/* 散落幾何：三角、方、圓隨機散落並緩轉 */
Console.cart({
  kind: 'scene', id: 'scattered-shapes', apiVersion: 1,
  label: { zh: '散落幾何' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'shapes', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const TAU = Math.PI * 2;
       /* 散落幾何：三角、方、圓隨機散落並緩轉 */
     const{W,H,t,r}=p,n=p.lite?10:16,cl=[p.R,p.G1,p.G2];
     for(let i=0;i<n;i++){const x=r()*W,y=r()*H,z=H*(.03+.05*r()),k=r()*3|0,fill=r()<.5;c.save();c.translate(x,y+S(t*.4+i)*H*.01);c.rotate(t*(.15+.1*(i%3))*(i%2?1:-1)+i);c.fillStyle=c.strokeStyle=cl[i%3];lw(c,p,.003,1.5);al(c,p,(.15+.4*p.a)*(.6+.4*r()));c.beginPath();
      if(k===0){c.moveTo(0,-z);c.lineTo(z,z*.8);c.lineTo(-z,z*.8);c.closePath()}else if(k===1)c.rect(-z*.8,-z*.8,z*1.6,z*1.6);else c.arc(0,0,z*.9,0,TAU);fill?c.fill():c.stroke();c.restore()}
  },
});
