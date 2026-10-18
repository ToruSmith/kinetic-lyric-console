/* 白底對話泡泡，彈性出現 */
Console.cart({
  kind: 'layout', id: 'bubble', apiVersion: 1,
  label: { zh: '白底對話泡泡，彈性出現' },
  author: 'kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const e=CE(c,"");const b=document.createElement("div");b.style.cssText=`position:relative;background:#fff;color:#111;border-radius:3cqh;padding:3cqh 4cqw;font-size:${sm*2.2}px;letter-spacing:.15em;max-width:80cqw`;b.textContent=sb.plain;
    const t=document.createElement("div");t.style.cssText="position:absolute;left:12%;bottom:-2cqh;width:4cqh;height:4cqh;background:#fff;transform:rotate(45deg)";b.appendChild(t);e.appendChild(b);
    A(b,[{opacity:0,transform:"scale(.4,1.3)"},{opacity:1,transform:"scale(1.15,.88)",offset:.5},{transform:"scale(.97,1.04)",offset:.75},{transform:"scale(1)"}],{duration:D()})
  },
});
