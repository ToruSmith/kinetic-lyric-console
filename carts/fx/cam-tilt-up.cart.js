/* 鏡頭上仰 */
Console.cart({
  kind: 'fx', id: 'cam-tilt-up', apiVersion: 1,
  label: { zh: '鏡頭上仰' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'low', mood: ['通用', '夢幻'], tags: ['鏡頭', '位移'], use: '情緒上揚的句子', draft: true },
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{translate:"0 1.5cqh"},{translate:"0 -1.5cqh"}],{duration:dur*1000,easing:"linear"})
  },
});
