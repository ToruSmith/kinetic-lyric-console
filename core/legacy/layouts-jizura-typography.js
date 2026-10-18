/* ===== [LAY-J] 版型 J（JIZURA 移植・階段 0＋1，「實驗室」）：margin baseline full-track line-focus scale-steps；共用小工具 hair／tick／capSize。
   部分部品改寫自 JIZURA（原作者 hakoniwa；備份於 ToruSmith/JIZURA）。JIZURA is Copyright (c) 2026 hakoniwa, released under the MIT License（授權全文見本倉庫根目錄 LICENSE 的「Third-party notices」）。
   只讀其設計與數值後用 DOM＋細線重寫，沒有搬 Canvas 程式碼。
   對應：margin＝tyMargin（余白）／baseline＝tyBaseline（罫線組）／full-track＝tyFullTrack（全幅字送り）／line-focus＝tyLineFocus（行中強調）／scale-steps＝tyScaleSteps（級数上げ）。
   皆為時間純函數（A() 暫停動畫＋種子亂數 sr()，不用 Math.random、不累積狀態）；只用文字加細線，不畫底板、不加不透明底色；
   非主文的線與點標 data-nm；不做 JIZURA 自帶的羅馬字、編號、時間碼。baseline／line-focus 吃 {}（BRACE_LAYOUTS）。 ===== */
/* ---- 階段 0：共用小工具 ---- */
            /* 估字寬（em）：半形 .58、全形 1.04 */
   /* 句子編號（輪替用，不用亂數）；縮圖等找不到時當 0 */

/* ---- 階段 1 ---- */
LAB_LAYOUTS.add("margin");LAB_LAYOUTS.add("baseline");LAB_LAYOUTS.add("full-track");LAB_LAYOUTS.add("line-focus");LAB_LAYOUTS.add("scale-steps");





