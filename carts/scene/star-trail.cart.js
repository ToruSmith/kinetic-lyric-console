/* 星軌：繞著畫面外極點旋轉的星點與弧形拖尾 */
Console.cart({
  kind: 'scene', id: 'star-trail', apiVersion: 1,
  label: { zh: '星軌' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'star', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const TAU = Math.PI * 2;
    const S = Math.sin;
    const al = u.fade;
       /* 星軌：繞著畫面外極點旋轉的星點與弧形拖尾 */
     const{W,H,t,r}=p,n=p.lite?24:48,px=W*.7,py=-H*.2,w=.05;c.strokeStyle=p.C;lw(c,p,.0025,1);
     for(let i=0;i<n;i++){const R=H*(.35+r()*1.1),a0=r()*TAU,a=a0+t*w,l=.12+.25*r(),tw=.6+.4*S(t*2+i);al(c,p,(.3+.65*p.a)*tw);c.beginPath();c.arc(px,py,R,a-l,a);c.stroke()}
  },
});
