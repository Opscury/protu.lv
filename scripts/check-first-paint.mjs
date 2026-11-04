// Checks that a page never paints light before the dark studio applies.
// Throttles CPU (6x) and network (400 ms, 50 KB/s), records every painted frame from the
// moment the navigation starts, and fails if any frame has a light corner or centre.
// The tab starts on a #121318 page, so the browser's own blank tab is not counted.
//
//   NODE_PATH="$(npm root -g)" node scripts/check-first-paint.mjs http://127.0.0.1:4173/ [/blog/ ...]
//   (run `npm run build && npx vite preview` first; needs Playwright installed globally)
import { createRequire } from 'node:module'

const { chromium } = createRequire(import.meta.url)('playwright')
const [base = 'http://127.0.0.1:4173/', ...paths] = process.argv.slice(2)
const urls = paths.length ? paths.map((p) => new URL(p, base).href) : [base]
const browser = await chromium.launch()
let failed = false

for (const url of urls) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  await page.goto('data:text/html,<html style="background:%23121318"></html>')
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Network.enable')
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: 51200, uploadThroughput: 51200 })
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 })
  const frames = []
  cdp.on('Page.screencastFrame', (f) => {
    frames.push(f.data)
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {})
  })
  await cdp.send('Page.startScreencast', { format: 'png', everyNthFrame: 1, maxWidth: 360, maxHeight: 225 })
  await page.goto(url, { waitUntil: 'load', timeout: 120000 })
  await page.waitForTimeout(1500)
  await cdp.send('Page.stopScreencast')

  // Sample corners and centre of every frame in a plain page.
  const probe = await browser.newPage()
  const light = []
  for (const [i, data] of frames.entries()) {
    const px = await probe.evaluate(async (d) => {
      const img = new Image()
      img.src = `data:image/png;base64,${d}`
      await img.decode()
      const c = new OffscreenCanvas(img.width, img.height).getContext('2d')
      c.drawImage(img, 0, 0)
      const at = [[4, 4], [img.width / 2, img.height / 2], [img.width - 4, 4], [4, img.height - 4], [img.width - 4, img.height - 4]]
      return at.map(([x, y]) => Array.from(c.getImageData(x, y, 1, 1).data.slice(0, 3)))
    }, data)
    if (px.some(([r, g, b]) => r + g + b > 450)) light.push(i)
  }
  await probe.close()
  console.log(`${light.length ? 'LIGHT' : 'ok   '}  ${url}  ${frames.length} frames${light.length ? `, light: ${light.join(', ')}` : ''}`)
  failed ||= light.length > 0
  await page.context().close()
}
await browser.close()
process.exit(failed ? 1 : 0)
