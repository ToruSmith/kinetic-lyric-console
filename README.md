# kinetic-lyric-console · 動態歌詞字幕工具

把 SRT 歌詞變成**會動的字幕**：版型、進場／退場、持續特效、文字樣式、場景層與風格包，網頁即時預覽，並可離線渲染成 MP4、透明文字層或綠幕影片，給剪輯軟體直接使用。

**▶ 線上使用（免安裝）：<https://torusmith.github.io/kinetic-lyric-console/>**

- **單一 HTML 檔、離線可用**：沒有伺服器、沒有帳號；歌詞、音樂、影片都只在你的瀏覽器裡處理。
- **232 個卡帶**：每個效果就是一個獨立檔案（版型 77、進場 34、退場 37、持續特效 33、文字樣式 14、場景 36、風格包 1），清單見 [`docs/catalog.md`](docs/catalog.md)。
- **確定性渲染**：所有動畫都是時間的純函數，同一份專案每次渲染逐格結果完全相同。
- **有回歸保護**：新舊畫面逐像素指紋、每個卡帶的合約檢查、位置／綠幕／分層／後製測試。

> 本專案是舊專案 [`Web_Lyric_Subtitle_Tool`](https://github.com/ToruSmith/Web_Lyric_Subtitle_Tool) 的「卡帶化」重構（舊專案不再更動）。

## 依你的身分，從這裡開始

| 我是… | 看這裡 |
|---|---|
| **一般使用者**：想把歌詞做成動態字幕 | 下方「[三種使用方式](#三種使用方式)」＋ [`docs/usage.md`](docs/usage.md)（桌面版、本機渲染的完整步驟） |
| **想寫 SRT 特效歌詞的人**（自己寫或請 AI 幫忙） | [**功能手冊與 SRT 標記指南**](docs/manual.md) ＋ 下方「[請 AI 幫你上標記](#請-ai-幫你上標記簡單提示詞)」 |
| **想分享自己配色／字體的人**（不寫程式） | [`docs/data-packs.md`](docs/data-packs.md)：匯入／匯出風格包 JSON |
| **人類貢獻者**：想新增一個效果 | [`CONTRIBUTING.md`](CONTRIBUTING.md) → `npm run new-cart -- layout my-id`，再看 [`docs/cart-api.md`](docs/cart-api.md) |
| **AI 工程師／代理程式**：要改這個 repo | [`CLAUDE.md`](CLAUDE.md)（硬規則）→ [`docs/architecture-plan.md`](docs/architecture-plan.md)（架構與決策）→ [`docs/cart-api.md`](docs/cart-api.md)（卡帶合約）→ [`docs/legacy-map.md`](docs/legacy-map.md)（舊檔對照） |

## 三種使用方式

1. **線上網頁版**：打開上面的連結即可。
2. **桌面版（單檔）**：下載 `kinetic-lyric-console.html`，雙擊用 Chrome／Edge 開啟，不需要 `index.html`、不需要安裝。
3. **本機離線渲染（輸出 MP4／透明字層／綠幕）**：需要 Node.js、ffmpeg 與這個 repo；在網頁匯出「渲染專案」後執行 `node render/run.mjs …`。

三種方式的逐步說明（含 `input/`、`output/` 資料夾怎麼放）→ [`docs/usage.md`](docs/usage.md)。

## 請 AI 幫你上標記（簡單提示詞）

工具的 SRT 可以在每一句歌詞前寫標記，例如：

```
1
00:00:01,000 --> 00:00:03,500
#center+rise+fade^bc 夜色漸漸深了

2
00:00:03,500 --> 00:00:05,000
#slam+zoomin+blur-out~shake^bc@outline 不要{回頭}
```

意思是：`#版型` `+進場` `+退場` `~持續特效` `^位置` `@文字樣式`，`{}` 標出關鍵字。完整名稱與規則都在 [功能手冊](docs/manual.md)——它本來就是寫給 AI 讀的。

**做法**：把手冊 [`docs/manual.md`](docs/manual.md)（整份貼上或上傳）和你的 SRT 一起給 AI，再貼下面其中一段：

**① 整首上標記**
```
請先完整閱讀這份「動態歌詞字幕工具：功能手冊與 SRT 標記指南」。
然後為我的 SRT 每一句加上完整標記，整首風格：【抒情慢歌／熱血／賽博／復古…挑一個或自己描述】。
只能使用手冊裡列出的名稱，輸出格式照手冊第 11 節（一個程式碼區塊、保留原序號與時間碼）。
【貼上你的 SRT】
```

**② 只調整幾句**
```
依照這份手冊，只修改下面第 5、6、12 句的標記：改成更【安靜／更有力】的感覺，其他句子原封不動。
【貼上帶標記的 SRT】
```

**③ 同時要全域設定**
```
依照這份手冊為整首上標記，另外附一小段 config JSON（3–6 個欄位），讓整體配色與字體符合【主題】。
```

拿到 AI 回覆後：存成 `.srt` → 網頁頂欄 **載入 ▾ → 載入字幕** 就能預覽；喜歡的話再用 **匯出** 精靈輸出。名稱寫錯時工具不會壞（未知版型會退回 `lowerleft`），可以直接請 AI「只用手冊裡的名稱重寫」。

> 手冊的名稱表涵蓋舊版既有的項目；之後新增的卡帶請查 [`docs/catalog.md`](docs/catalog.md)。

## 專案結構

```
core/    主機：解析、時間軸、編輯器、匯出；卡帶登記層（api/console.js）
carts/   卡帶，一個效果一個檔案：layout enter exit fx style scene pack（_template 是範本）
render/  離線渲染（Node＋Playwright＋ffmpeg）
tools/   建置（build）、新增卡帶（new-cart）、清單產生（gen-catalog）、縮圖（make-thumbs）
test/    合約、位置、綠幕、分層、後製、行為等測試；golden/ 是畫面指紋基準
docs/    手冊、卡帶合約、架構規劃、使用說明
```

6 個依賴全域畫面功能的版型（text-mask、hanko、ink-bleed、ripple-pool、constellation、particle-form）維持在 `core/legacy/`，不做成卡帶——它們要注入 SVG 濾鏡、註冊 CSS 屬性或使用水面 GL，不符合卡帶「純函式、不碰全域」的規則。

## 開發

```
npm ci
npm run build        # → dist/index.html（單檔）
npm run lint
npm run check        # 完整驗證（約 40–60 分鐘；日常只跑相關測試即可）
npm run regress      # 與 test/golden 指紋比對畫面
```

GitHub Actions 額度有限，驗證優先在本機跑；規則見 [`docs/architecture-plan.md`](docs/architecture-plan.md) 第 8 節。

## 授權

MIT，見 [`LICENSE`](LICENSE)。第三方內容（JIZURA 等）見 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)。
