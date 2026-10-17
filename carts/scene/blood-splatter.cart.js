/* 噴濺：中心大滴＋放射小滴＋向下流淌的血痕（用 ghostA 色，不寫死紅色） */
Console.cart({
  kind: 'scene', id: 'blood-splatter', apiVersion: 1,
  label: { zh: '噴濺' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'splat', amount: 40, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const al = u.fade;
    const TAU = Math.PI * 2;
       /* 噴濺：中心大滴＋放射小滴＋向下流淌的血痕（用 ghostA 色，不寫死紅色） */
     const{W,H,t,r}=p,cx=W*(.3+.4*r()),cy=H*(.3+.3*r()),n=p.lite?16:34,g=Math.min(1,t*1.5+.2);c.fillStyle=p.G1;al(c,p,.35+.5*p.a);
     c.beginPath();c.arc(cx,cy,H*.05*g,0,TAU);c.fill();
     for(let i=0;i<n;i++){const a=r()*TAU,d=H*(.07+.3*r())*g,z=H*(.004+.016*r())*(1-d/(H*.4)*.5);c.beginPath();c.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d,Math.max(1,z),0,TAU);c.fill()}
     for(let i=0;i<4;i++){const x=cx+(r()-.5)*H*.1,l=H*(.1+.2*r())*Math.min(1,t*.4),w=H*.008;c.fillRect(x-w/2,cy,w,l);c.beginPath();c.arc(x,cy+l,w*.8,0,TAU);c.fill()}
  },
});
