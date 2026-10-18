/* 段階ズーム（鏡頭）：2～3 次快速小推（每次 +4%），只動一次 */
Console.cart({
  kind: 'fx', id: 'step-zoom', apiVersion: 1,
  label: { zh: '段階ズーム（鏡頭）：2～3 次快速小推（每次 +4%），只動一次' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    const ms=Math.max(600,dur*1000),T=[.3,.58,.8].slice(0,2+(ms>2500?1:0)),kf=[{scale:1,offset:0}];let s=1;T.forEach(t=>{kf.push({scale:s,offset:t});s+=.04;kf.push({scale:s,offset:Math.min(.99,t+70/ms)})});kf.push({scale:s,offset:1});A(fw,kf,{duration:ms,easing:"linear"})
  },
});
