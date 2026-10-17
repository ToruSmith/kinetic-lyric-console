/* ===== [MOTION-L] 文字樣式（@）：JIZURA 移植第四批的 6 個樣式。進場／退場／保持／鏡頭已搬成卡帶。
   樣式暫留在這裡（之後搬成 carts/style）。部分部品改寫自 JIZURA（原作者 hakoniwa，MIT，授權見根目錄 THIRD_PARTY_NOTICES.md）。 ===== */
Object.assign(ST,{
 "grad-v":e=>{_lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(180deg,var(--c) 15%,var(--a) 95%)";x.style.webkitBackgroundClip=x.style.backgroundClip="text";x.style.color="transparent";x.style.webkitTextFillColor="transparent"})},   /* 縦グラデ（上本色→下強調色） */
 "extrude-3d":e=>addSh(e,Array.from({length:12},(_,i)=>`${((i+1)*.012).toFixed(3)}em ${((i+1)*.012).toFixed(3)}em 0 color-mix(in srgb,var(--a) 70%,#000)`).join(",")),   /* 立体（短而實的 3D 厚度，比 longshadow 短） */
 "echo-diag":e=>addSh(e,".04em -.04em 0 color-mix(in srgb,var(--a) 70%,transparent),.08em -.08em 0 color-mix(in srgb,var(--a) 45%,transparent),.12em -.12em 0 color-mix(in srgb,var(--a) 22%,transparent)"),   /* 輪郭の残響 ≈（斜向殘影，不是空心輪廓） */
 condensed:e=>{e.style.scale=".8 1.05"},   /* 長体 */
 extended:e=>{e.style.scale="1.08 .86"},   /* 平体（寬度上限 1.08，避免超出畫面） */
 "step-baseline":e=>{_lv(e).forEach((x,i)=>{x.style.translate=`0 ${(i%2?1:-1)*.09}em`})}});   /* 段違い：奇偶字上下交錯 */
