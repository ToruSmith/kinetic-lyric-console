/* 照準線：貫穿畫面的細十字＋中央小圓，圓緩慢呼吸；中央留白（不穿過文字中心） */
Console.cart({
  kind: 'scene', id: 'crosshair', apiVersion: 1,
  label: { zh: '照準線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'tech' },
  source: 'https://github.com/852wa/JIZURA',
  layer: 'over', group: 'cross2', amount: 50, cost: '輕',
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
    const PI = Math.PI;
       /* 照準線：貫穿畫面的細十字＋中央小圓，圓緩慢呼吸；中央留白（不穿過文字中心） */
     const{W,H,t}=p,x=W/2,y=H/2,r=H*.035*(1+.15*S(t*1.6)+.1*p.bp),gap=r*1.6;c.strokeStyle=p.R;c.lineWidth=Math.max(1,H*.0022);al(c,p,.25+.45*p.a);c.beginPath();
     c.moveTo(0,y);c.lineTo(x-gap,y);c.moveTo(x+gap,y);c.lineTo(W,y);c.moveTo(x,0);c.lineTo(x,y-gap);c.moveTo(x,y+gap);c.lineTo(x,H);c.moveTo(x+r,y);c.arc(x,y,r,0,PI*2);c.stroke()
  },
});
