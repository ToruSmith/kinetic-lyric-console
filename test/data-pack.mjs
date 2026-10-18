// 使用者端資料型卡帶（風格包 JSON）：node test/data-pack.mjs　（先 npm run build；沙箱設 CHROME_PATH）
// 檢查：合格的收得進來並能套用／拒絕各種不合格內容／重新載入後還在／移除／匯出再匯入／面板匯入按鈕。
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
const PAGE = pathToFileURL(resolve(process.env.PAGE || 'dist/index.html')).href;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };
const open = async q => { const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto(PAGE + (q || '')); await p.evaluate(() => window.__ready); p.errs = errs; return p };

const GOOD = { kind: 'pack', apiVersion: 1, label: { zh: '測試暮色' }, author: 'tester', license: 'MIT',
  config: { font: '明體', weight: 300, spacing: 0.1, color: '#f4efe6', accent: '#e8a87c', dim: 35, sceneAll: 'gradient-fade:40,no-such-scene:20', layoutPool: 'center,lowerleft' } };
let p = await open('?render=1');

// 1. 合格：登記、帶警告、可套用
const r1 = await p.evaluate(g => { const r = UserPacks.add(g); return { r, has: STYLE_PACKS.has('測試暮色'), auto: PRESETS['測試暮色'].auto, cart: Console.carts.some(c => c.kind === 'pack' && c.user && c.name === '測試暮色'), apply: applyPreset('測試暮色') && CONFIG.presetName === '測試暮色' && CONFIG.accent === '#e8a87c' } }, GOOD);
ok(r1.has && r1.auto && r1.cart && r1.apply, '合格風格包應登記並可套用：' + JSON.stringify(r1));
ok(r1.r.warn.some(w => w.includes('no-such-scene')), '不存在的場景名應給警告');
ok(!r1.r.warn.some(w => w.includes('字體')), '已載入的字體不應警告');

// 2. 拒絕
const bads = [
  ['非物件', [1, 2]], ['kind 不是 pack', { ...GOOD, kind: 'layout' }], ['apiVersion 錯', { ...GOOD, apiVersion: 2 }],
  ['多餘欄位 render', { ...GOOD, render: 'alert(1)' }], ['沒有 label', { ...GOOD, label: {} }], ['label 含 <', { ...GOOD, label: { zh: '<b>x' } }],
  ['label 太長', { ...GOOD, label: { zh: '一'.repeat(25) } }], ['與內建同名', { ...GOOD, label: { zh: '夜色' } }],
  ['config 空', { ...GOOD, config: {} }], ['config 未知鍵', { ...GOOD, config: { evilKey: 1 } }], ['config 含 presetName', { ...GOOD, config: { presetName: 'x' } }],
  ['config 值是物件', { ...GOOD, config: { color: { a: 1 } } }], ['config 值是陣列', { ...GOOD, config: { color: [1] } }], ['config 型別不對', { ...GOOD, config: { weight: 'abc' } }],
  ['config 字串太長', { ...GOOD, config: { sceneAll: 'a'.repeat(401) } }], ['檔案太大', { ...GOOD, config: { sceneAll: 'a'.repeat(300) }, author: 'x'.repeat(61) }],
];
for (const [name, v] of bads) { const e = await p.evaluate(v => { try { UserPacks.add(v); return null } catch (e) { return e.message } }, v); ok(!!e, `應拒絕：${name}`); }
// __proto__ 走 JSON.parse（自有屬性）
const e2 = await p.evaluate(() => { try { UserPacks.add(JSON.parse('{"kind":"pack","apiVersion":1,"label":{"zh":"原型"},"config":{"__proto__":{"x":1}}}')); return null } catch (e) { return e.message } });
ok(!!e2, '應拒絕 __proto__ 鍵');
ok(await p.evaluate(() => ({}).x === undefined && !STYLE_PACKS.has('原型')), '拒絕後不得汙染原型或留下登記');

// 3. 內建不可移除、同名自己的可取代
ok(await p.evaluate(() => Console.removeUserPack('夜色') === false && STYLE_PACKS.has('夜色')), '內建風格包不得被移除');
const r3 = await p.evaluate(g => { UserPacks.add({ ...g, config: { ...g.config, accent: '#112233' } }); return PRESETS['測試暮色'].accent + '|' + Console.carts.filter(c => c.name === '測試暮色').length }, GOOD);
ok(r3 === '#112233|1', '同名（自己匯入的）應取代而不是重複：' + r3);

// 4. 匯出再匯入
const r4 = await p.evaluate(() => { CONFIG.accent = '#abcdef'; CONFIG.bpm = 99; const j = UserPacks.exportCurrent('匯出測試'); const c = UserPacks.check(j); return { keys: Object.keys(j.config), accent: j.config.accent, bpm: 'bpm' in j.config, pre: 'presetName' in j.config } });
ok(r4.accent === '#abcdef' && !r4.bpm && !r4.pre, '匯出應含變更過的設定、不含 bpm／presetName：' + JSON.stringify(r4));
await p.close();

// 5. 持久化：非 render 的頁面載入應還在；render 模式不載入
p = await open('');
ok(await p.evaluate(() => { UserPacks.add({ kind: 'pack', apiVersion: 1, label: { zh: '持久測試' }, config: { accent: '#00ff88' } }); return true }), '加入持久測試');
await p.close();
p = await open('');
ok(await p.evaluate(() => STYLE_PACKS.has('持久測試') && PRESETS['持久測試'].accent === '#00ff88'), '重新載入後自己匯入的風格包應還在');
ok(p.errs.length === 0, '重新載入不應有頁面錯誤：' + p.errs.join('|'));
// 6. 面板匯入按鈕
const tmp = resolve(os.tmpdir(), 'klc-pack-test.json'); fs.writeFileSync(tmp, JSON.stringify({ ...GOOD, label: { zh: '面板匯入' } }));
const h = await p.evaluateHandle(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes('匯入風格包')); return b && b.nextElementSibling });
ok(!!(await h.evaluate(x => !!x)), '面板應有「匯入風格包」按鈕');
if (await h.evaluate(x => !!x)) { await h.asElement().setInputFiles(tmp); await p.waitForTimeout(500);
  ok(await p.evaluate(() => STYLE_PACKS.has('面板匯入')), '經面板匯入的風格包應登記'); }
fs.unlinkSync(tmp);
// 7. 移除
ok(await p.evaluate(() => UserPacks.remove('持久測試') && !STYLE_PACKS.has('持久測試') && !PRESETS['持久測試']), '移除自己匯入的風格包');
await p.close();
p = await open('');
ok(await p.evaluate(() => !STYLE_PACKS.has('持久測試')), '移除後重新載入不應再出現');
await p.close();
p = await open('?render=1');
ok(await p.evaluate(() => UserPacks.names().length === 0 && !STYLE_PACKS.has('面板匯入')), '離線渲染模式不載入使用者風格包');
await p.close();
console.log(`資料型卡帶｜通過 ${pass}、失敗 ${fail}`); await browser.close(); process.exit(fail ? 1 : 0);
