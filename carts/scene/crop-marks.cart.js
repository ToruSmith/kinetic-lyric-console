/* 裁切標記：四角的裁切標記（L 形，外側各一條短線），輕微隨拍 */
Console.cart({
  kind: 'scene', id: 'crop-marks', apiVersion: 1,
  label: { zh: '裁切標記' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'tech' },
  source: 'https://github.com/852wa/JIZURA',
  layer: 'over', group: 'crop', amount: 50, cost: '輕',
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const al = u.fade;
       /* トンボ：四角的裁切標記（L 形，外側各一條短線），輕微隨拍 */
     const{W,H}=p,m=H*.05,l=H*.05,g=H*.012;c.strokeStyle=p.C;c.lineWidth=Math.max(1,H*.0025);al(c,p,.35+.5*p.a);c.beginPath();
     [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([x,y,sx,sy])=>{c.moveTo(x-sx*(g+l),y);c.lineTo(x-sx*g,y);c.moveTo(x,y-sy*(g+l));c.lineTo(x,y-sy*g)});c.stroke()
  },
});
