# CLAUDE.md

專案狀態與完整規劃見 [`docs/architecture-plan.md`](docs/architecture-plan.md)。

## 現階段規則

1. **舊專案快照 `legacy/` 已在 M4 刪除**（舊專案 `Web_Lyric_Subtitle_Tool` 本身保持不動）。畫面回歸改用 `test/golden/` 的指紋（`npm run regress`）；`core/legacy/` 是尚未卡帶化的核心版型與輔助碼，不是快照，可以改，但改了要跑回歸。
2. 新工作一律進 `core/`、`carts/`、`tools/`、`test/`、`docs/`、`render/`、`assets/`（以規劃文件為準）。
3. 不提交建置產物（`dist/`）。例外：縮圖精靈圖 `assets/thumbs/sheet.webp` 與 `core/ui/thumbs-index.js` 由 `npm run thumbs` 重拍後一起提交（拍縮圖需要 Chromium，不放進 CI）。README 的畫面素材 `assets/readme/` 同理，由 `npm run readme-assets` 重拍後提交（需要 Chromium 與 ffmpeg；版型或畫面改版後才需要重拍）。
4. **Actions 額度要省**：新增或修改 workflow 前先讀規劃文件第 8 節。驗證優先在本機／沙箱跑，不要靠每次 push 觸發 CI。
5. 檔名一律 ASCII、小寫、連字號；中文只放在內容裡（見規劃文件第 5 節）。
6. 移植自第三方的內容（例如 JIZURA）要在 `THIRD_PARTY_NOTICES.md` 保留授權標示。
