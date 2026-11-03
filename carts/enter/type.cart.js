/* 打字機：逐字瞬間出現 */
Console.cart({
  kind: 'enter', id: 'type', apiVersion: 1,
  label: { zh: '打字機：逐字瞬間出現' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['科技', '復古', '安靜'], tags: ['逐字'], use: '像打字或內心獨白的句子', draft: true },
  play(ctx) {
    const A = ctx.anim;
    const sp = () => ctx.speed;
    const el = ctx.el;
    const l = ctx.charEls;
    const d = ctx.duration;
    if(l&&l.length)l.forEach((c,i)=>A(c,[{opacity:0},{opacity:1}],{duration:1,delay:i*Math.max(40,d*.7/l.length)/sp(),easing:"steps(1,end)"}));else A(el,[{opacity:0},{opacity:1}],{duration:d})
  },
});
