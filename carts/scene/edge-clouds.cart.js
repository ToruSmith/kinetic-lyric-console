/* 邊緣雲：畫面上下緣一排層疊圓團，緩緩飄移 */
Console.cart({
  kind: 'scene', id: 'edge-clouds', apiVersion: 1,
  label: { zh: '邊緣雲' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'cloud', amount: 40, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
    const TAU = Math.PI * 2;
       /* 邊緣雲：畫面上下緣一排層疊圓團，緩緩飄移 */
     const{W,H,t,r}=p,n=p.lite?10:16;c.fillStyle=p.C;
     for(const top of[1,0])for(let i=0;i<n;i++){const x=(i+.5)/n*W+S(t*.3+i*1.7)*W*.015,R=H*(.07+.06*r()),y=top?-R*.25+S(t*.4+i)*H*.01:H+R*.25-S(t*.4+i)*H*.01;al(c,p,.05+.14*p.a);c.beginPath();c.arc(x,y,R,0,TAU);c.arc(x+R*.8,y+(top?R*.15:-R*.15),R*.7,0,TAU);c.fill()}
  },
});
