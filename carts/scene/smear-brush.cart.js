/* 塗抹筆刷：數道粗筆觸，邊緣以多重細筆毛刺模擬，緩緩橫移 */
Console.cart({
  kind: 'scene', id: 'smear-brush', apiVersion: 1,
  label: { zh: '塗抹筆刷' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'smear', amount: 35, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
       /* 塗抹筆刷：數道粗筆觸，邊緣以多重細筆毛刺模擬，緩緩橫移 */
     const{W,H,t,r}=p,n=p.lite?3:5;c.lineCap="round";c.strokeStyle=p.R;
     for(let k=0;k<n;k++){const y=H*(.15+.7*r()),x0=W*(-.1+.3*r()),L=W*(.5+.5*r()),th=H*(.05+.06*r()),sh=(t*W*.02+k*37)%(W*.08);
      for(let b=0;b<(p.lite?4:9);b++){const yy=y+(b-4)*th/9,wob=S(b*1.7+k)*th*.1;al(c,p,(.04+.1*p.a)*(.6+.4*r()));c.lineWidth=th/9*1.4;c.beginPath();c.moveTo(x0+sh+wob,yy);c.quadraticCurveTo(x0+L*.5+sh,yy+S(t*.4+k+b)*th*.15,x0+L+sh-wob*2,yy+wob);c.stroke()}}
  },
});
