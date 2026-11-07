// Checks the Pakalpojumi lamp in every mode it has to survive:
//   normal, prefers-reduced-motion, and no WebGL; with mouse hover, keyboard focus and phone scroll.
// For each case it prints which row is lit, whether the shader is running, and saves a screenshot.
//
//   NODE_PATH="$(npm root -g)" node scripts/check-service-lamp.mjs [http://localhost:5173/pakalpojumi/] [out-dir]
//   (needs Playwright installed globally, like check-first-paint.mjs; with only playwright-core
//   on NODE_PATH it drives the installed Chrome instead)
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'

const require = createRequire(import.meta.url)
let chromium
let channel
try {
  chromium = require('playwright').chromium
} catch {
  chromium = require('playwright-core').chromium
  channel = 'chrome'
}
const [url = 'http://localhost:5173/pakalpojumi/', out = '.impeccable/review/lamp'] = process.argv.slice(2)
mkdirSync(out, { recursive: true })

const modes = [
  { name: 'normal', args: [], reduced: 'no-preference' },
  { name: 'reduced', args: [], reduced: 'reduce' },
  { name: 'nowebgl', args: ['--disable-webgl', '--disable-3d-apis'], reduced: 'no-preference' },
]
let failed = false

for (const mode of modes) {
  const browser = await chromium.launch({ args: mode.args, channel })
  for (const phone of [false, true]) {
    const ctx = await browser.newContext(
      phone
        ? { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, reducedMotion: mode.reduced }
        : { viewport: { width: 1440, height: 900 }, reducedMotion: mode.reduced },
    )
    const page = await ctx.newPage()
    await page.addInitScript(() => localStorage.removeItem('protu-lamp-tuner-v1'))
    await page.goto(url, { waitUntil: 'load' })
    await page.waitForTimeout(2500)
    const rows = page.locator('.svo-row')
    const state = () =>
      page.evaluate(() => ({
        lit: [...document.querySelectorAll('.svo-row')].findIndex((r) => r.hasAttribute('data-lit')),
        lamp: document.querySelector('.svo-board')?.hasAttribute('data-lamp') ?? false,
        canvas: Boolean(document.querySelector('.svo-lamp canvas')),
      }))
    const shots = []
    if (phone) {
      await rows.nth(2).evaluate((el) => el.scrollIntoView({ block: 'center' }))
      await page.waitForTimeout(1200)
      shots.push(['scroll', 2, await state()])
      await page.screenshot({ path: `${out}/${mode.name}-phone-scroll.png` })
    } else {
      await page.evaluate(() => window.scrollTo(0, 200))
      await rows.nth(1).hover()
      await page.waitForTimeout(1200)
      shots.push(['hover', 1, await state()])
      await page.screenshot({ path: `${out}/${mode.name}-desktop-hover.png` })
      await page.mouse.move(5, 5)
      await page.locator('.svo-problem a').nth(2).focus()
      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Tab')
      await page.waitForTimeout(1200)
      shots.push(['focus', 2, await state()])
      await page.screenshot({ path: `${out}/${mode.name}-desktop-focus.png` })
    }
    const wantLamp = mode.name === 'normal'
    for (const [how, want, s] of shots) {
      const ok = s.lit === want && s.lamp === wantLamp && s.canvas === wantLamp
      failed ||= !ok
      console.log(`${ok ? 'ok  ' : 'FAIL'}  ${mode.name.padEnd(8)} ${phone ? 'phone  ' : 'desktop'} ${how.padEnd(6)} lit=${s.lit} shader=${s.lamp}`)
    }
    await ctx.close()
  }
  await browser.close()
}
process.exit(failed ? 1 : 0)
