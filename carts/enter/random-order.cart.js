/* 逐字以固定的打亂順序淡入（同一句每次相同） */
Console.cart({
  kind: 'enter', id: 'random-order', apiVersion: 1,
  label: { zh: '逐字以固定的打亂順序淡入（同一句每次相同）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  play(ctx) {
    const A = ctx.anim;
    const el = ctx.el;
    const l = ctx.charEls;
    const d = ctx.duration;
    if(!l||!l.length){A(el,[{opacity:0},{opacity:1}],{duration:d});return}const n=l.length;let k=3;const g=(a,b)=>b?g(b,a%b):a;while(g(k,n)!==1)k++;l.forEach((c,i)=>A(c,[{opacity:0},{opacity:1}],{duration:d*.5,delay:((i*k+3)%n)/n*d*.6}))
  },
});
