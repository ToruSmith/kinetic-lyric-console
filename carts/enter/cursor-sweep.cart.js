/* カーソル掃引：強調色細棒由左掃到右，字被掃到就出現 */
Console.cart({
  kind: 'enter', id: 'cursor-sweep', apiVersion: 1,
  label: { zh: 'カーソル掃引：強調色細棒由左掃到右，字被掃到就出現' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  play(ctx) {
    const A = ctx.anim;
    const el = ctx.el;
    const l = ctx.charEls;
    const d = ctx.duration;
       /* カーソル掃引：一條強調色細棒由左掃到右，字被掃到就出現 */
    if(!el.style.position)el.style.position="relative";
    const bar=document.createElement("div");bar.dataset.nm=1;bar.style.cssText="position:absolute;top:-.05em;bottom:-.05em;left:0;width:.09em;background:var(--a);box-shadow:0 0 .2em var(--a);pointer-events:none";el.appendChild(bar);
    A(bar,[{left:"-2%",opacity:1},{left:"100%",opacity:1,offset:.85},{left:"102%",opacity:0}],{duration:d,easing:"cubic-bezier(.3,.6,.4,1)"});
    if(l&&l.length)l.forEach((c,i)=>A(c,[{opacity:0,transform:"translateX(-.3em) scale(.7)"},{opacity:1,transform:"none"}],{duration:d*.3,delay:d*.8*i/l.length/1+0,easing:"cubic-bezier(.2,.9,.3,1)"}));
    else A(el,[{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0)"}],{duration:d*.85,easing:"cubic-bezier(.3,.6,.4,1)"})
  },
});
