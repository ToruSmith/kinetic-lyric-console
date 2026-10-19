## 這個 PR 做了什麼

<!-- 一兩句話。新增卡帶請附一張截圖，或寫出卡帶的 demo 句。 -->

## 類型

- [ ] 新增／修改卡帶（`carts/`）
- [ ] 主機（`core/`）、渲染（`render/`）或工具（`tools/`）
- [ ] 文件
- [ ] 其他：

## 自我檢查

- [ ] `npm run build && npm run lint` 通過
- [ ] 動到卡帶：`node test/carts.mjs` 通過
- [ ] 新增或改名卡帶：已執行 `npm run catalog && npm run cheatsheet`，`docs/catalog.md` 與 `docs/ai-cheatsheet.md` 已更新
- [ ] 動到 `core/` 或會改變畫面：已跑 `npm run regress`，差異都在預期內（或已說明為何更新 `test/golden/`）
- [ ] 沒有提交 `dist/`、字體檔、真實歌詞／音樂／影片
- [ ] 移植自第三方的內容：已更新 `THIRD_PARTY_NOTICES.md`，卡帶的 `source`、`license` 已填
- [ ] 有使用者可見的變更：已補 `CHANGELOG.md` 的「未發布」

<!-- 驗證優先在本機跑；Actions 額度規則見 docs/architecture-plan.md 第 8 節。 -->
