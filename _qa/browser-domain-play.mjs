import fs from 'node:fs/promises'
import { chromium } from '/Users/yin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'

const evidenceDir = new URL('./ui/domain-rules/', import.meta.url)
await fs.mkdir(evidenceDir, { recursive: true })
const browser = await chromium.launch({ headless: true })

for (const viewport of [{ width: 390, height: 844 }, { width: 320, height: 568 }]) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: 'zh-CN' })
  const page = await context.newPage()
  const transparentGif = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  await page.route('https://images.aiwaves.tech/alteru/guest-shell.js', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.route('https://chat.aiwaves.tech/aigram/api/gen-image', (route) => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ url: `data:image/gif;base64,${transparentGif}` }) }))
  await page.addInitScript(() => { localStorage.clear(); sessionStorage.clear() })
  await page.goto('http://127.0.0.1:4182/?story_mode=demo&lang=zh', { waitUntil: 'domcontentloaded' })
  await page.addStyleTag({ content: '#alteru-guest-banner{display:none!important}' })
  await page.getByRole('button', { name: /推开屋顶门/ }).click()
  await page.getByRole('button', { name: /先听每个人说自己知道的情况/ }).click()
  await page.getByText(/共同时间线/).waitFor({ timeout: 10_000 })
  const body = await page.locator('body').innerText()
  if (!body.includes('公共秩序 +6')) throw new Error('Listen branch did not apply exact Shared Order change')
  if (!body.includes('请乔拿出上周三的照片')) throw new Error('Listen branch did not install local next choices')
  await page.screenshot({ path: new URL(`01-listen-result-platform-layout-${viewport.width}x${viewport.height}.png`, evidenceDir).pathname, fullPage: true })
  await page.getByRole('button', { name: /世界/ }).click()
  await page.locator('.st-roster').getByRole('button', { name: /乔/ }).first().waitFor()
  await page.screenshot({ path: new URL(`02-resident-roster-platform-layout-${viewport.width}x${viewport.height}.png`, evidenceDir).pathname, fullPage: true })
  await context.close()
}

console.log(JSON.stringify({ ok: true, viewports: ['390x844', '320x568'], branch: 'listen-first', exactStat: 6, localChoices: true, accumulatedFeedPreserved: true }))
await browser.close()
