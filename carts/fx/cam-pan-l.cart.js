/* 鏡頭左移（<3% 畫面寬） */
Console.cart({
  kind: 'fx', id: 'cam-pan-l', apiVersion: 1,
  label: { zh: '鏡頭左移（<3% 畫面寬）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'low', mood: ['通用'], tags: ['鏡頭', '位移'], use: '長句的緩慢橫移', draft: true },
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{translate:"1.5cqw 0"},{translate:"-1.5cqw 0"}],{duration:dur*1000,easing:"linear"})
  },
});
