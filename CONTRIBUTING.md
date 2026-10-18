# 貢獻：做一個卡帶

1. 執行 `npm run new-cart -- <種類> <你的-id>`（例：`npm run new-cart -- layout my-cool-layout`），會從 [`carts/_template/`](carts/_template/) 複製範本到 `carts/<種類>/<你的-id>.cart.js` 並換好 `id`；也可以手動複製。接著改 `label.zh` 與內容。
2. 欄位與 `ctx` 見 [`docs/cart-api.md`](docs/cart-api.md)；可參考同資料夾的示範卡帶。
3. 本機驗證（不需推送，不耗 Actions 額度）：
   ```
   npm ci
   npm run build && npm run lint
   CHROME_PATH=<chromium 路徑，可省略> node test/carts.mjs
   ```
   `lint` 擋掉連網、儲存、計時器、亂數、時間等違規；`test/carts.mjs` 檢查登記、有效果、逐像素確定性、九宮格位置、不連網。
4. 開 PR。每個卡帶一個檔案、不需要改其他檔案；PR 內請附一張截圖或 `demo` 句。
5. 移植自第三方的內容請在 `THIRD_PARTY_NOTICES.md` 保留授權標示，並在卡帶的 `source` 與 `license` 註明。

不要提交 `dist/` 等建置產物（縮圖精靈圖是例外，見 `CLAUDE.md` 第 3 條）。
