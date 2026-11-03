/* 由上緣向下折開（3D） */
Console.cart({
  kind: 'enter', id: 'unfold', apiVersion: 1,
  label: { zh: '由上緣向下折開（3D）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['復古', '安靜'], tags: ['3D'], use: '像紙張展開的段落開頭', draft: true },
  keyframes: [{opacity:0,transform:"perspective(700px) rotateX(-90deg)",transformOrigin:"50% 0"},{opacity:1,transform:"none",transformOrigin:"50% 0"}],
});
