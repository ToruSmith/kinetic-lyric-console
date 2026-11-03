/* 衝向鏡頭放大並模糊 */
Console.cart({
  kind: 'exit', id: 'fly-through', apiVersion: 1,
  label: { zh: '衝向鏡頭放大並模糊' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['力量', '熱血'], tags: ['縮放', '模糊'], use: '衝向下一段的轉折', draft: true },
  keyframes: [{opacity:1,transform:"none",filter:"blur(0)"},{opacity:0,transform:"scale(3)",filter:"blur(8px)"}],
});
