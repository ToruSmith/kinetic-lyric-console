# 貢獻：做一個卡帶

1. 執行 `npm run new-cart -- <種類> <你的-id>`（例：`npm run new-cart -- layout my-cool-layout`），會從 [`carts/_template/`](carts/_template/) 複製範本到 `carts/<種類>/<你的-id>.cart.js` 並換好 `id`；也可以手動複製。接著改 `label.zh` 與內容。
2. 欄位與 `ctx` 見 [`docs/cart-api.md`](docs/cart-api.md)；可參考同資料夾的示範卡帶。
3. 本機驗證（不需推送，不耗 Actions 額度）：
   ```
   npm ci
   npm run build && npm run lint
   CHROME_PATH=<chromium 路徑，可省略> node test/carts.mjs
   ```
   新增或改名卡帶後再跑 `npm run catalog && npm run cheatsheet`，自動更新 `docs/catalog.md`、README 數量與 `docs/ai-cheatsheet.md`（CI 與 `npm run check` 會檢查它們是不是最新）。
   `lint` 擋掉連網、儲存、計時器、亂數、時間等違規；`test/carts.mjs` 檢查登記、有效果、逐像素確定性、九宮格位置、不連網。
4. 開 PR。每個卡帶一個檔案，不需要手改其他檔案；PR 內請附一張截圖或 `demo` 句。
5. 想讓效果更容易被搜尋與挑選，可以加選填的 `meta`（見 [`docs/cart-api.md`](docs/cart-api.md)），再跑 `npm run effect-index`。
6. 移植自第三方的內容請在 `THIRD_PARTY_NOTICES.md` 保留授權標示，並在卡帶的 `source` 與 `license` 註明。

只想分享一組配色／字體／版型池？不用寫程式：在面板匯出風格包 JSON，詳見 [`docs/data-packs.md`](docs/data-packs.md)。

畫面有意改變時要更新回歸基準。指紋會受字型與 Chromium 版本影響，只有環境相同才能比對。目前的基準在 Linux 沙箱產生（Playwright 1.63.0，字型 Noto Sans CJK）；換環境時，先用改動前的版本重建基準，再比對改動。

重建時新舊兩邊都傳 `dist/index.html`，這樣會納入新增項目，也會順便確認渲染結果可重現：

```
npm run build
WRITE_GOLDEN=test/golden/regress-16x9.json node test/regress.mjs dist/index.html dist/index.html 16:9
WRITE_GOLDEN=test/golden/regress-9x16.json node test/regress.mjs dist/index.html dist/index.html 9:16
WRITE_GOLDEN=test/golden/parts-16x9.json node test/regress-parts.mjs dist/index.html dist/index.html 16:9
WRITE_GOLDEN=test/golden/parts-9x16.json node test/regress-parts.mjs dist/index.html dist/index.html 9:16
```

`test/effects-visible.mjs` 另外檢查效果是否真的有動畫，不依賴基準。

不要提交 `dist/` 等建置產物（縮圖精靈圖是例外，見 `CLAUDE.md` 第 3 條）。
