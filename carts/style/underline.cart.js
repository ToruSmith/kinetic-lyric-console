/* 底線（強調色） */
Console.cart({
  kind: 'style', id: 'underline', apiVersion: 1,
  label: { zh: '底線（強調色）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['通用'], tags: ['關鍵字'], use: '簡單強調', draft: true },
  scope: 'element',
  apply(ctx) {
    // text-decoration 不會傳進 inline-block 的逐字元素，所以畫在每個字上
    ctx.perChar().forEach(e => { e.style.textDecoration="underline";e.style.textDecorationColor="var(--a)";e.style.textDecorationThickness=".07em";e.style.textUnderlineOffset=".16em"; });
  },
});
