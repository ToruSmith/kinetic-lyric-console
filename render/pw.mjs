// 載入 Playwright 與選擇瀏覽器（render/run.mjs 共用）。
//   1. 先找 repo 內的 node_modules/playwright（npm ci 安裝的，最常見）；
//   2. 找不到時改找全域安裝（npm install -g playwright）：Node 的 ES 模組不讀全域套件，也不看 NODE_PATH，所以這裡自己用 `npm root -g` 找；
//   3. 都找不到時給出完整的安裝說明。
// 瀏覽器：--chrome 路徑 ＞ 環境變數 CHROME_PATH ＞ Playwright 自己下載的 Chromium ＞ 系統已安裝的 Chrome／Edge／Chromium。
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

function globalRoots() {
  const out = [];
  const r = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['root', '-g'], { encoding: 'utf8', shell: process.platform === 'win32' });
  if (r.stdout && r.stdout.trim()) out.push(r.stdout.trim());
  if (process.env.NODE_PATH) out.push(...process.env.NODE_PATH.split(process.platform === 'win32' ? ';' : ':').filter(Boolean));
  return [...new Set(out)];
}

export async function loadPlaywright() {
  try { return { pw: await import('playwright'), from: 'repo' }; } catch (e) { if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e; }
  for (const root of globalRoots()) {
    const f = join(root, 'playwright', 'index.mjs');
    if (existsSync(f)) return { pw: await import(pathToFileURL(f).href), from: root };
  }
  throw new Error('找不到 playwright 套件。請在 repo 資料夾執行：\n  npm ci\n  npx playwright install chromium\n'
    + '（已經用 npm install -g playwright 全域安裝的話，請確認終端機執行 npm root -g 看得到 playwright 資料夾。）');
}

const SYSTEM_BROWSERS = {
  win32: ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'],
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'],
};

/** 回傳要用的瀏覽器執行檔；null＝用 Playwright 自己的 Chromium。 */
export function pickBrowser(chromium, explicit) {
  if (explicit && explicit !== true) {
    if (!existsSync(explicit)) throw new Error('找不到 --chrome 指定的瀏覽器：' + explicit);
    return explicit;
  }
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  let own = '';
  try { own = chromium.executablePath(); } catch { /* 沒安裝 */ }
  if (own && existsSync(own)) return null;
  return (SYSTEM_BROWSERS[process.platform] || []).find(f => existsSync(f)) || null;
}
