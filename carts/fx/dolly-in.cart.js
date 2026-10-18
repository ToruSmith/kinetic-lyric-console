/* ドリー（鏡頭）：整句期間慢慢推近，只動一次 */
Console.cart({
  kind: 'fx', id: 'dolly-in', apiVersion: 1,
  label: { zh: 'ドリー（鏡頭）：整句期間慢慢推近，只動一次' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{scale:1,translate:"0 0"},{scale:1.12,translate:"0 -.8cqh"}],{duration:Math.max(600,dur*1000),easing:"cubic-bezier(.5,0,.9,.6)"})
  },
});
