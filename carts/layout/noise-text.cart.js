/* 主文加兩層色差殘影，每 80ms 換一次抖動位置 */
Console.cart({
  kind: 'layout', id: 'noise-text', apiVersion: 1,
  label: { zh: '主文加兩層色差殘影，每 80ms 換一次抖動位置' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { lab: true },
  rand: { sceneThemes: ['grunge'], strong: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const CONFIG = ctx.config;
    const sr = ctx.random;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const _gh = ()=>[CONFIG.ghostOn?CONFIG.ghostA:"#ff285a",CONFIG.ghostOn?CONFIG.ghostB:"#00dcff"];
       /* 雜訊字：主文加兩層色差殘影，每 80ms 換一次抖動位置 */
    const z=_fz(sb,big,1),[g1,g2]=_gh(),r=sr(sb.s),J=()=>{const a=[];for(let i=0;i<8;i++)a.push({translate:`${((r()-.5)*.14).toFixed(3)}em ${((r()-.5)*.06).toFixed(3)}em`});return a};
    [g1,g2].forEach(col=>{const e=CE(c,`font-size:${z}px;letter-spacing:.1em;color:${col};opacity:.75`);e.textContent=sb.plain;e.dataset.nm=1;delete e.dataset.t;
     A(e,J(),{duration:640,iterations:Infinity,easing:"steps(1)"})});
    const e=CE(c,`font-size:${z}px;letter-spacing:.1em`);list.push(...chars(sb.plain,e));enter(e,sb.en||"fade",list)
  },
});
