/* 波浪花邊：四邊一排半圓扇貝 */
Console.cart({
  kind: 'scene', id: 'scalloped-border', apiVersion: 1,
  label: { zh: '波浪花邊' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'over', group: 'border', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const al = u.fade;
    const PI = Math.PI;
    const TAU = Math.PI * 2;
       /* 波浪花邊：四邊一排半圓扇貝 */
     const{W,H,t}=p,r=H*.022,o=(t*r*.5)%(r*2);c.fillStyle=p.R;al(c,p,.25+.55*p.a);c.beginPath();
     for(let x=-r*2+o;x<W+r;x+=r*2){c.moveTo(x+r,0);c.arc(x,0,r,0,PI);c.moveTo(x+r,H);c.arc(x,H,r,PI,TAU)}
     for(let y=-r*2+o;y<H+r;y+=r*2){c.moveTo(0,y+r);c.arc(0,y,r,PI/2,PI*1.5,true);c.moveTo(W,y+r);c.arc(W,y,r,PI*1.5,PI/2,true)}c.fill()
  },
});
