// 快速開機檢查（約 2 秒）：頁面能載入、沒有未捕捉錯誤、卡帶全部登記成功、selfCheck 乾淨。
// 搬遷／新增卡帶時先跑這個，再跑較慢的 regress／carts。環境：CHROME_PATH 可指定 Chromium。
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const PAGE = process.env.PAGE || 'dist/index.html';
const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] } : {});
const p = await (await b.newContext()).newPage(); const errs = [];
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
await p.goto(pathToFileURL(resolve(PAGE)).href + '?render=1'); await p.evaluate(() => window.__ready);
const r = await p.evaluate(() => ({ carts: Console.carts.length, cartErrors: Console.errors, self: __selfCheck() }));
console.log(`開機檢查｜卡帶 ${r.carts}｜頁面錯誤 ${errs.length}｜登記失敗 ${r.cartErrors.length}｜selfCheck ${r.self.length}`);
[...errs, ...r.cartErrors, ...r.self].forEach(e => console.log('  ✗ ' + e));
await b.close(); process.exit(errs.length || r.cartErrors.length || r.self.length ? 1 : 0);
