/* 像牌子一樣向後倒下（3D） */
Console.cart({
  kind: 'exit', id: 'tip-over', apiVersion: 1,
  label: { zh: '像牌子一樣向後倒下（3D）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['俏皮', '復古'], tags: ['3D', '旋轉'], use: '像牌子倒下的段落收尾', draft: true },
  keyframes: [{opacity:1,transform:"perspective(800px) rotateX(0)"},{opacity:0,transform:"perspective(800px) rotateX(80deg)"}],
});
