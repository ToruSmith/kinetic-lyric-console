/* 有機色塊：三團隨時間呼吸變形的圓潤塊 */
Console.cart({
  kind: 'scene', id: 'organic-blob', apiVersion: 1,
  label: { zh: '有機色塊' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'blob', amount: 40, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const TAU = Math.PI * 2;
    const al = u.fade;
    const S = Math.sin;
       /* 有機色塊：三團隨時間呼吸變形的圓潤塊 */
     const{W,H,t,r}=p,n=p.lite?20:40;c.fillStyle=p.R;
     for(let k=0;k<3;k++){const cx=W*(.2+.6*r()),cy=H*(.2+.6*r()),R=H*(.18+.14*r())*(1+.1*p.bp),f=2+k,ph=r()*TAU;al(c,p,(.08+.2*p.a)*(1-k*.2));c.beginPath();
      for(let i=0;i<=n;i++){const a=i/n*TAU,q=R*(1+.18*S(a*f+t*.5+ph)+.1*S(a*(f+2)-t*.7));i?c.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q):c.moveTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q)}c.fill()}
  },
});
