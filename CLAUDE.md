# CLAUDE.md

專案狀態與完整規劃見 [`docs/architecture-plan.md`](docs/architecture-plan.md)。

## 現階段規則

1. **`legacy/` 是舊專案的唯讀快照。** 不要修改、不要在裡面新增功能；它裡面的 `CLAUDE.md`、`CONTRIBUTING.md`、`DEVELOPMENT.md` 是舊專案的歷史文件，其中「只改 `src/`」「提交 `index.html`」等規則**不適用於本 repo**。
2. 新工作一律進 `core/`、`carts/`、`tools/`、`test/`、`docs/`（尚在建置中，以規劃文件為準）。
3. 不提交建置產物（`index.html`、縮圖精靈圖）；它們由建置流程產生。
4. **Actions 額度要省**：新增或修改 workflow 前先讀規劃文件第 8 節。驗證優先在本機／沙箱跑，不要靠每次 push 觸發 CI。
5. 檔名一律 ASCII、小寫、連字號；中文只放在內容裡（見規劃文件第 5 節）。
6. 移植自第三方的內容（例如 JIZURA）要在 `THIRD_PARTY_NOTICES.md` 保留授權標示。
