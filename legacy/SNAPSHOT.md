# legacy/ — 舊專案快照（唯讀參考）

| 項目 | 內容 |
|---|---|
| 來源 | https://github.com/ToruSmith/Web_Lyric_Subtitle_Tool （舊 repo，之後不再更動） |
| 來源 commit | `537062668244faf3f0b6ad7b662c9511d7a87429`（main） |
| 內容 | 該 commit 追蹤的 84 個檔案原樣複製，不含 `.git` 歷史；歷史請看舊 repo |
| 用途 | ① 搬遷時的對照與取材　② 逐像素回歸的「基準」（以此版本的 `index.html` 為準） |
| 狀態 | **唯讀。** 不要在這裡修改或新增功能；新工作一律進 `core/`、`carts/` |

## 規則

- 這個資料夾**不參與** lint、測試、Pages 部署與任何 CI。
- `legacy/.github/` 因為不在 repo 根目錄，GitHub **不會執行**其中的 workflow，不消耗 Actions 額度。
- 檔名（含中文檔名）刻意保持原樣，方便與舊 repo 逐檔比對。新專案的命名規則見 [`docs/architecture-plan.md`](../docs/architecture-plan.md)。
- 搬遷完成、新舊對照通過後，整個 `legacy/` 會刪除；舊 repo 與固定 commit 仍可隨時查閱。

## 授權與來源標示

舊專案為 MIT（見 `legacy/LICENSE`）。其中部分版型、進退場與裝飾移植自
[852wa/JIZURA](https://github.com/852wa/JIZURA)（MIT，Copyright (c) 2026 hakoniwa），
授權全文與標示見根目錄的 [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md)。
