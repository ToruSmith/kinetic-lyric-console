/* 像素背景：粗像素格的值雜訊，每 0.25 秒換一格 */
Console.cart({
  kind: 'scene', id: 'pixel-bg', apiVersion: 1,
  label: { zh: '像素背景' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'pix', amount: 40, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const sr = u.random;
    const hashN = u.hash;
    const al = u.fade;
       /* 像素背景：粗像素格的值雜訊，每 0.25 秒換一格 */
     const{W,H,t}=p,cs=Math.max(8,H/(p.lite?16:26)),k=Math.floor(t*4);c.fillStyle=p.R;
     for(let y=0;y<H;y+=cs)for(let x=0;x<W;x+=cs){const v=sr(hashN((x/cs|0)+","+(y/cs|0))/1000+k*.173)();if(v>.55){al(c,p,(v-.55)*(.2+.7*p.a));c.fillRect(x,y,cs-1,cs-1)}}
  },
});
