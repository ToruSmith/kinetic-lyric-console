/* 資料監視器（右下）：波形折線＋長條 */
Console.cart({
  kind: 'scene', id: 'data-monitors', apiVersion: 1,
  label: { zh: '資料監視器（右下）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'over', group: 'mon', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const S = Math.sin;
       /* 資料監視器（右下）：波形折線＋長條 */
     const{W,H,t}=p,w=W*(W>H?.2:.4),h=H*.1,x=W-w-H*.04,y=H-h-H*.04;c.strokeStyle=p.R;lw(c,p,.002);al(c,p,.3+.5*p.a);c.strokeRect(x,y,w,h);c.beginPath();
     for(let i=0;i<=40;i++){const u=i/40,v=.5+.3*S(u*9+t*3)*S(u*3-t)+.1*p.bp;i?c.lineTo(x+u*w,y+h*(1-v)):c.moveTo(x+u*w,y+h*(1-v))}c.stroke();
     c.fillStyle=p.G2;for(let i=0;i<8;i++){const v=.2+.7*Math.abs(S(t*(1+i*.2)+i));al(c,p,.35+.4*p.a);c.fillRect(x+w*.05+i*w*.045,y-h*.1-h*.5*v,w*.03,h*.5*v)}
  },
});
