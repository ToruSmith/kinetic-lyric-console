# 變更紀錄

格式參考 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)。版本內容以各 [Release](https://github.com/ToruSmith/kinetic-lyric-console/releases) 為準；本檔把使用者看得到的變更集中在一處。

## [未發布]

### 新增
- 卡帶選填的 `meta` 語意資料與 `docs/effect-index.tsv` 索引；規格由程式碼推得，`draft: true` 代表情緒與能量仍待人工審核。
- README 新增「只用圖鑑挑的效果」提示詞，Release 附上 Agent Skill，新增測試列入 CI。
- 補齊 `docs/usage.md`、英文 README 與手冊對圖鑑、檢查器、查詢工具和逐句轉場的說明。
- 逐句轉場：`&trans-wipe` 這類標記只改這一句的句間轉場。
- 效果圖鑑：用真實引擎試看 313 個效果，可篩選、挑選並複製給 AI；支援 `?pick=` 連結。
- `tools/find-effect.mjs`：依情緒、能量、特徵查效果；`docs/agent-skill/kinetic-lyric/` 提供 AI 上標記流程。
- 全部 313 個效果都有語意資料草稿，供圖鑑與查詢工具使用；審核前不放進速查表。新增一次一個主角、動作語氣一致的編排規則。
- `tools/check-srt.mjs`：不需瀏覽器的帶標記 SRT 檢查器。檢查名稱（附建議）、語法與手冊的常見錯誤；`--against` 另外確認時間碼與歌詞沒有被改動。

### 變更
- 速查表的逐字進場標示補齊 `stagger`、`ripple` 等手冊清單內的項目。
- 名稱來源抽成 `tools/lib-names.mjs`，由速查表與檢查器共用。

### 修正
- 把 JIZURA 系列說明殘留的日文改成繁體中文，並把「同上」改成可以單獨閱讀的說明。
- 更新手冊、架構文件與 `core/ui/thumbs.js` 註解裡已過時的路徑。

## [0.2.0] - 2026-10-20

### 新增
- `docs/ai-cheatsheet.md`：精簡版 AI 速查表（約 16KB，完整手冊約 57KB）。由 `tools/gen-cheatsheet.mjs` 從卡帶與手冊表格自動產生，包含之後新增的卡帶；實驗室項目不列入。可用 `npm run cheatsheet` 重新產生。
- 產生器自帶檢查：各種類總數必須等於 README 的「共 N 種…」，規則文字與範例標記裡的每個名稱都必須真的存在。
- `README.en.md`：英文版 README（與中文版頂端互相連結）。`tools/gen-cheatsheet.mjs` 會檢查它的功能總數與卡帶數是否與中文版一致。
- Release 會附上 `ai-cheatsheet.md`（`release.yml` 的 `files` 加了一行；已發布的 v0.2.0 要手動重跑 release workflow 才會補上）。
- `.github/`：PR 範本、Issue 範本（回報問題、效果點子）、`CODEOWNERS`。

### 變更
- `npm run check`、`npm run check:fast` 與 CI 的 `verify` 會檢查 `docs/catalog.md` 與 `docs/ai-cheatsheet.md` 是否為最新。
- README「請 AI 幫你上標記」改為建議貼速查表；完整手冊仍可使用。

## [0.2.0] - 2026-10-19

### 新增
- 載入字幕時，提示列會列出不認得的標記名稱。
- README 新增效果示範圖，並說明「直接錄製」與「離線渲染」的差別。
- `npm run check:fast`，約 20 秒。

## [0.1.1] - 2026-10-18

- 卡帶化重構後的第一個公開版本（Release 沒有附說明，詳見 [commits](https://github.com/ToruSmith/kinetic-lyric-console/commits/v0.1.1)）。

[0.2.0]: https://github.com/ToruSmith/kinetic-lyric-console/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/ToruSmith/kinetic-lyric-console/commits/v0.1.1
