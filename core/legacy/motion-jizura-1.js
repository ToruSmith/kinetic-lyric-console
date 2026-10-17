/* ===== [MOTION-K] 文字樣式（@）：JIZURA 移植第二批的 6 個樣式。進場／退場／保持已搬成卡帶（carts/enter、carts/exit、carts/fx）。
   樣式暫留在這裡（之後搬成 carts/style）。部分部品改寫自 JIZURA（原作者 hakoniwa，MIT，授權見根目錄 THIRD_PARTY_NOTICES.md）。 ===== */
Object.assign(ST,{
 underline:e=>{e.style.textDecoration="underline";e.style.textDecorationColor="var(--a)";e.style.textDecorationThickness=".07em";e.style.textUnderlineOffset=".16em"},   /* 下線 */
 strike:e=>{e.style.textDecoration="line-through";e.style.textDecorationColor="var(--a)";e.style.textDecorationThickness=".07em"},   /* 取り消し線 */
 marker:e=>{_lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(transparent 58%,color-mix(in srgb,var(--a) 55%,transparent) 58%,color-mix(in srgb,var(--a) 55%,transparent) 92%,transparent 92%)"})},   /* 蛍光ペン（字下半的半透明色帶，不蓋字） */
 "shadow-soft":e=>addSh(e,"0 .06em .3em rgba(0,0,0,.65)"),   /* ぼかし影 */
 "shadow-offset":e=>addSh(e,".07em .07em 0 rgba(0,0,0,.7)"),   /* ずらし影 */
 "tracking-wide":e=>{e.style.letterSpacing=`calc(${e.style.letterSpacing||"0em"} + .14em)`}});   /* 字間広め */
