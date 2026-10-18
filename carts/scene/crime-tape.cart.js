/* 警戒膠帶：兩條交叉斜帶，黑色斜紋＋文字（帶色取強調色，位於畫面邊緣不蓋主文） */
Console.cart({
  kind: 'scene', id: 'crime-tape', apiVersion: 1,
  label: { zh: '警戒膠帶' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'grunge' },
  layer: 'over', group: 'tape', amount: 45, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const al = u.fade;
    const MONO = 'ui-monospace,Consolas,Menlo,monospace';
       /* 警戒膠帶：兩條交叉斜帶，黑色斜紋＋文字（帶色取強調色，位於畫面邊緣不蓋主文） */
     const{W,H,t}=p,h=H*.06,f=h*.55,txt="  LYRIC SCENE · DO NOT CROSS ·",L=txt.length*f*.62;
     for(const[x0,y0,x1,y1] of[[-W*.05,H*.18,W*1.05,H*.06],[-W*.05,H*.9,W*1.05,H*.8]]){c.save();c.translate(x0,y0);c.rotate(Math.atan2(y1-y0,x1-x0));const ln=Math.hypot(x1-x0,y1-y0);
      c.fillStyle=p.R;al(c,p,.5+.45*p.a);c.fillRect(0,-h/2,ln,h);c.fillStyle="#000";al(c,p,.5+.4*p.a);for(let x=-h+(t*h*.3)%(h*1.6);x<ln;x+=h*1.6){c.beginPath();c.moveTo(x,-h/2);c.lineTo(x+h*.5,-h/2);c.lineTo(x+h*.5-h*.4,h/2);c.lineTo(x-h*.4,h/2);c.fill()}
      c.font=`bold ${f}px ${MONO}`;c.textBaseline="middle";c.fillStyle="#000";al(c,p,.85);for(let x=-L+(t*f*2)%L;x<ln;x+=L)c.fillText(txt,x,0);c.restore()}
  },
});
