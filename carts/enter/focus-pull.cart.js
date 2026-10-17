/* 對焦：整句從模糊、字距寬鬆淡入到清晰（整句版進場，宣告式，不寫程式）。 */
Console.cart({
  kind: 'enter', id: 'focus-pull', apiVersion: 1,
  label: { zh: '對焦', en: 'Focus Pull' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 終點省略 letterSpacing／filter 以外的屬性：落在元素自己的目前值
  keyframes: [
    { opacity: 0, filter: 'blur(10px)', letterSpacing: '.35em' },
    { opacity: 1, filter: 'blur(0)' },
  ],
});
