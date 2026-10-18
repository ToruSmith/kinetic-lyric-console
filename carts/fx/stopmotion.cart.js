/* 定格動畫感（每 0.4 秒循環的小幅抖動與傾斜） */
Console.cart({
  kind: 'fx', id: 'stopmotion', apiVersion: 1,
  label: { zh: '定格動畫感（每 0.4 秒循環的小幅抖動與傾斜）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { group: 'jitter', strong: true },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    return (A(fw,[{translate:"0 0",rotate:"0deg"},{translate:"2px 1px",rotate:".6deg"},{translate:"-1px 2px",rotate:"-.5deg"},{translate:"1px -2px",rotate:".3deg"}],{duration:400,iterations:Infinity,easing:"steps(3)"}));
  },
});
