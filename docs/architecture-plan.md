# 架構規劃：動態歌詞字幕「遊戲機」

> 狀態：規劃草案 v1（2026-10-17）。依據對舊專案 `537062668244faf3f0b6ad7b662c9511d7a87429` 的原始碼閱讀（`src/` 45 檔、約 386KB；`lint` 與 `build:check` 通過）。瀏覽器回歸測試尚未重跑。

## 1. 目標

主機（console）提供解析、時間軸、編輯器、匯出與離線渲染；效果做成卡帶（cart）。
**協助者理解專案後，新增一個卡帶只需新增一個檔案**，不必同時修改五張登記表、手冊清單與縮圖精靈圖。

## 2. 為什麼可行

舊專案已有六種登記入口，只是形狀不一致：

| 種類 | 舊入口 |
|---|---|
| 版型 | `registerLayout`（38 處）＋ 5 個檔案的舊式 `Object.assign(NL…)` |
| 進場／退場 | `ENTER_X`、`EXTRA_EX`（整句）、`EXIT_C`（逐字） |
| 持續特效 | `FXH` |
| 樣式 | `ST` |
| 場景層 | `regScene` |
| 風格包 | `regPack` |

做法是在它們前面加一層統一的卡帶登記（`Console.cart()`），由它分派到既有入口，舊內容不必重寫。

## 3. 目錄規劃

```
kinetic-lyric-console/
├─ core/               主機（不含任何具體效果）
│  ├─ kernel/          設定、解析、建構一句畫面、主迴圈、節拍、載入
│  ├─ api/             卡帶合約：Console.cart()、ctx 外觀層、manifest schema
│  ├─ ui/              面板、句子編輯器、匯出精靈、快捷選單
│  └─ shell/           index.template.html、style.css
├─ carts/              卡帶：一檔一個，資料夾＝種類
│  ├─ layout/ enter/ exit/ fx/ style/ scene/ pack/   （逐字退場併入 exit）
│  └─ _template/       每種的範本
├─ render/             離線渲染（Playwright＋ffmpeg）
├─ tools/              build、new-cart、make-thumbs、gen-docs
├─ test/               卡帶驗證、行為測試、確定性、新舊對照
├─ docs/               導覽與卡帶 API（清單部分由程式產生）
├─ examples/
├─ assets/thumbs/      縮圖精靈圖（tools/make-thumbs.mjs 產生；M4 後 legacy/ 快照已刪除）
└─ .github/            workflows、PR 範本、CODEOWNERS
```

## 4. 不放進 repo 的東西

| 東西 | 理由與替代 |
|---|---|
| 建置出的 `index.html` | 每個 PR 會在 240KB 檔案上衝突。改由 CI 建置並部署 Pages |
| `thumbs/sheet.webp`、`28-thumbs-idx.js` | 二進位檔無法合併。改為每個卡帶自帶小縮圖，精靈圖建置時組 |
| `baseline.html`（176KB 凍結副本） | 以 `test/golden/` 指紋當逐像素基準（M4 前為 `legacy/` 快照；同機器／同版 Chromium 才可比對） |
| 手寫的清單表（`RND_*`、手冊清單） | 由卡帶 manifest 產生（M4 完成：隨機適配＝卡帶的 `rand`，清單＝`docs/catalog.md`；`RND_*` 只剩尚在 `core/` 的版型與內建特效） |
| `node_modules`、`input/`、`output/` | 忽略 |
| 真實歌詞、音樂、影片 | 著作權；測試只用合成內容 |
| CJK 字體檔 | 檔案大、授權各異；只放說明 |
| 臨時除錯腳本、已缺檔的舊測試清單 | 不帶過來 |

## 5. 檔名規則

- 全部 ASCII、小寫、連字號；中文只出現在內容（顯示名稱、手冊文字），不出現在檔名。手冊叫 `docs/guide.zh-TW.md`。
- 不用數字前綴與 `lay-a…l` 字母後綴。用資料夾表達角色、用名稱表達內容；載入順序＝`core` 先、`carts` 依路徑排序，不靠編號。
- 卡帶檔名＝id＝`carts/<種類>/<id>.cart.js`，例如 `carts/layout/ink-bleed.cart.js`。
- 搬遷時產生 `docs/legacy-map.md`，記錄每個舊檔與新位置。

## 6. 卡帶合約（草案）

```js
// carts/layout/ink-bleed.cart.js
Console.cart({
  id: 'ink-bleed', kind: 'layout', apiVersion: 1,
  label: { zh: '墨暈', en: 'Ink Bleed' },
  flags: { brace: true },                        // 取代 BRACE_LAYOUTS / FULLBLEED
  rand:  { theme: 'neutral', energy: 'mid' },    // 取代 13-rand.js 的 RND_* 字串
  demo:  '#ink-bleed 看天台上{流星}',             // 範例與縮圖來源
  source: null,                                  // 移植自第三方時填 'JIZURA' 等
  render(ctx, sentence) { /* 只用 ctx.A / ctx.sr / ctx.t，不碰全域 */ },
});
```

規則：
- 卡帶只能使用 `ctx` 外觀層（凍結、有版本號），不直接碰全域，主機內部才能繼續演進。
- **時間的純函數**：只用 `t`、節拍相位、種子亂數；不累積狀態。
- 驗證工具檢查：確定性（同一刻兩次渲染一致）、不超出畫面、尊重九宮格位置（`data-pm`／`data-nm`）、有清理。
- lint 黑名單：`fetch`、`XMLHttpRequest`、`WebSocket`、`eval`、`new Function`、`import()`、`localStorage`、`location`、`Math.random`、`Date.now`、`performance.now`、`setTimeout`、`requestAnimationFrame`。

## 7. 安全分級

1. **進 repo 的卡帶（PR 審查後合併）**：風險低。lint 黑名單＋CI 在 `pull_request` 執行（不使用 `pull_request_target`、不放機密）＋逐像素回歸證明不改變既有畫面。
2. **使用者在網頁載入的卡帶**：
   - 純資料卡帶（風格包、色彩組合、關鍵影格 JSON、場景參數）：用 schema 驗證，安全。
   - 含程式的卡帶：版型直接操作舞台 DOM，**無法真正沙箱化**，只能走信任模式（類使用者腳本）。必須配 CSP `connect-src 'none'`、離線渲染以 `page.route` 擋掉非 `file:`／`data:` 請求、專案匯出記錄卡帶雜湊。
   - **不做 `?cart=網址` 自動載入**：等於一鍵任意程式碼執行，且同一個 GitHub Pages 帳號網域下的專案共用來源。
3. 先做第 1 級；第 2 級先只開放純資料卡帶。

## 8. GitHub Actions 額度守則

- 不使用 `schedule`（cron）。
- 所有 workflow 加 `paths` 過濾（只在 `core/`、`carts/`、`tools/`、`test/`、`docs/`、workflow 本身變動時跑；`legacy/` 與純文件不跑）。
- 加 `concurrency` 並 `cancel-in-progress: true`；加 `timeout-minutes`；`npm ci` 用快取。
- 重的瀏覽器回歸**不在每次 push 跑**：只在 PR（且有路徑變動）或手動 `workflow_dispatch` 觸發。日常驗證在本機／沙箱跑。
- Pages 部署只在 `main` 且相關路徑變動時跑一次。
- 據我所知公開 repo 的標準 runner 不計額度；若仍看到消耗，請到帳號 Settings → Billing 查看是哪個 repo、哪個 workflow。

## 9. 里程碑

| | 內容 |
|---|---|
| M0 | 舊資料快照（`legacy/`）、規劃文件、授權標示 ✅ |
| M1 | 骨架：`core/`、建置工具（取代 `build.mjs`）、卡帶登記層、省額度的 CI 與 Pages 部署 ✅ |
| M2 | `ctx` 外觀層、卡帶驗證工具、與 `legacy/` 的逐像素對照 ✅（`test/carts.mjs`、`test/regress.mjs`；範本與 11 個示範卡帶） |
| M3 | 每種各一個代表性卡帶，舊內容分批搬遷（每批跑回歸，有差異就退回那批） |
| M4 | `CONTRIBUTING`、卡帶範本與 `new-cart` 工具、manifest 產生手冊／縮圖／隨機適配表、刪除 `legacy/` ✅（new-cart、自動卡帶清單、順序過渡層移除、隨機適配表改由卡帶 `rand` 宣告，皆已完成） |

## 10. 待確認

- JIZURA 系列版型的移植範圍與標示（授權為 MIT，需保留 `THIRD_PARTY_NOTICES.md` 的聲明）。
- 舊專案測試缺口（`position`／`coverage`／`chroma`／`post`／`layers` 等腳本已不在舊 repo）需在 M2 補齊，尤其是九宮格位置檢查。
- 使用者端載入卡帶是否要做、做到哪一級（見第 7 節）。
