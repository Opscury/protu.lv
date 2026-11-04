// Captures the four "Trīs soļi" screenshots for the home page from a LOCAL protu-lapas dev run.
// Everything happens in a throwaway temp dir (database, uploads, rendered site), with protu-lapas's
// own .env ignored, so no real data or server is touched. See README.md for the commands.
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '../..')
const LAPAS = resolve(process.env.PROTU_LAPAS ?? join(ROOT, '../protu-lapas'))
const WIN = process.platform === 'win32'
const PYTHON = process.env.PYTHON ?? join(LAPAS, '.venv', WIN ? 'Scripts/python.exe' : 'bin/python')
const EDITOR_PORT = Number(process.env.EDITOR_PORT ?? 8765)
const SITE_PORT = Number(process.env.SITE_PORT ?? 8766)
const OUT = resolve(process.env.OUT ?? join(ROOT, 'public/builder'))
const SAMPLES = join(ROOT, 'public/piemeri/marta/i')
const KEEP = process.env.KEEP_TMP === '1'

let chromium
try {
  ;({ chromium } = createRequire(import.meta.url)('playwright'))
} catch {
  console.error('Playwright not found. Install it globally (npm i -g playwright) and set NODE_PATH to `npm root -g`.')
  process.exit(1)
}
for (const [what, p] of [['protu-lapas', join(LAPAS, 'manage.py')], ['Python', PYTHON], ['editor build', join(LAPAS, 'editor/dist')]]) {
  if (!existsSync(p)) {
    console.error(`${what} not found at ${p}. See README.md.`)
    process.exit(1)
  }
}

const RUN = mkdtempSync(join(tmpdir(), 'protu-shots-'))
const SHOTS = join(RUN, 'shots')
const IMGS = join(RUN, 'imgs')
// A clean environment for protu-lapas: its .env is NOT read (PROTU_ENV_FILE points nowhere),
// all storage lives in RUN, email goes to the console, dev login works only because DEBUG is on.
const lapasEnv = Object.fromEntries(
  Object.entries(process.env).filter(([k]) => !/^(SECRET_KEY|ALLOWED_HOSTS|CSRF_|EMAIL_|DATA_DIR|SITES_|MEDIA_ROOT|PREVIEW_ROOT|STATIC_ROOT|STAFF_|KUMA_|IP_HASH|PUBLIC_SCHEME|EDITOR_HOST|RESERVED_)/.test(k)),
)
Object.assign(lapasEnv, {
  PROTU_ENV_FILE: join(RUN, 'no.env'),
  SCREENSHOT_RUN_DIR: RUN,
  DEBUG: 'True',
  DEV_LOGIN_BYPASS: 'True',
  EDITOR_HOST: 'localhost',
  PUBLIC_SCHEME: 'http',
  DATA_DIR: join(RUN, 'data'),
  SITES_ROOT: join(RUN, 'sites'),
  EMAIL_BACKEND: 'django.core.mail.backends.console.EmailBackend',
  PYTHONIOENCODING: 'utf-8',
})

const py = (args, input) => {
  const r = spawnSync(PYTHON, args, { cwd: LAPAS, env: lapasEnv, input, encoding: 'utf-8' })
  if (r.status !== 0) throw new Error(`${args.join(' ')} failed:\n${r.stdout}\n${r.stderr}`)
  return r.stdout
}

let server, siteServer, browser
const cleanup = () => {
  server?.kill()
  siteServer?.close()
  if (!KEEP) rmSync(RUN, { recursive: true, force: true })
}
process.on('SIGINT', () => process.exit(130))

try {
  console.log(`run dir ${RUN}`)
  mkdirSync(lapasEnv.DATA_DIR, { recursive: true })
  mkdirSync(lapasEnv.SITES_ROOT, { recursive: true })
  py(['manage.py', 'migrate', '-v0'])
  spawnSync(PYTHON, [join(HERE, 'images.py'), 'prep', SAMPLES, IMGS], { stdio: 'inherit' })
  server = spawn(PYTHON, ['manage.py', 'runserver', '--noreload', `127.0.0.1:${EDITOR_PORT}`], { cwd: LAPAS, env: lapasEnv, stdio: 'ignore' })
  const E = `http://localhost:${EDITOR_PORT}`
  for (let i = 0; ; i++) {
    try { if ((await fetch(`http://127.0.0.1:${EDITOR_PORT}/`)).status < 500) break } catch { /* not up yet */ }
    if (i > 60) throw new Error('runserver did not start')
    await new Promise((r) => setTimeout(r, 250))
  }

  browser = await chromium.launch()
  const desk = { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }
  const ctx = await browser.newContext(desk)
  const p = await ctx.newPage()
  const shot = async (name) => {
    await p.mouse.move(0, 0)
    await p.waitForTimeout(1200)
    await p.screenshot({ path: join(SHOTS, `${name}.png`) })
  }

  // 1 · Onboarding: field, five pictures (dev login creates the invented account).
  await p.goto(`${E}/dev/login/?email=rasa@example.lv&vards=rasa&next=/redaktors/sakums`)
  await p.getByRole('button', { name: 'Gleznas un grafika' }).click()
  await p.setInputFiles('#ob-files', [1, 2, 3, 4, 5].map((i) => join(IMGS, `glezna-${i}.jpg`)))
  await p.waitForFunction(() => document.querySelectorAll('.ob-photo.done').length === 5, null, { timeout: 90000 })
  await shot('ob2')
  await p.getByRole('button', { name: 'Tālāk' }).click()
  await p.fill('#ob-name', 'Rasa Dzērvīte')
  await p.fill('#ob-line', 'gleznotāja · Rīga')
  await p.getByRole('button', { name: 'Tālāk' }).click()
  await p.waitForTimeout(1500)

  // Titles, about text, approve and render the site (seed_rasa.py refuses to run outside RUN).
  const siteDir = py(['manage.py', 'shell'], readFileSync(join(HERE, 'seed_rasa.py'), 'utf-8')).match(/SITE_DIR=(.+)/)[1].trim()

  // 2 + 4 · The Izskats page, then with "Vairāk iestatījumu" open and scrolled to it.
  await p.goto(`${E}/redaktors/izskats`)
  await p.waitForTimeout(2500)
  await shot('look')
  await p.getByText('Vairāk iestatījumu').click()
  await p.waitForTimeout(800)
  await p.evaluate(() => window.scrollTo(0, 500))
  await shot('edit')
  await ctx.close()

  // 3 · The rendered static site, served from the temp dir, on desktop and phone.
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
  siteServer = createServer((req, res) => {
    let f = join(siteDir, decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (!f.startsWith(siteDir)) return res.writeHead(403).end()
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html')
    if (!existsSync(f)) return res.writeHead(404).end()
    res.writeHead(200, { 'content-type': TYPES[extname(f)] ?? 'application/octet-stream' }).end(readFileSync(f))
  }).listen(SITE_PORT, '127.0.0.1')
  for (const [name, opts] of [['live-d', desk], ['live-m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: 'reduce' }]]) {
    const c = await browser.newContext(opts)
    const sp = await c.newPage()
    await sp.goto(`http://127.0.0.1:${SITE_PORT}/`)
    await sp.waitForLoadState('networkidle')
    await sp.waitForTimeout(800)
    await sp.screenshot({ path: join(SHOTS, `${name}.png`) })
    await c.close()
  }
  await browser.close()

  const rev = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: LAPAS, encoding: 'utf-8' }).stdout.trim()
  const done = spawnSync(PYTHON, [join(HERE, 'images.py'), 'finish', SHOTS, OUT], {
    stdio: 'inherit', env: { ...process.env, LAPAS_REV: rev || 'unknown', SHOT_DATE: new Date().toISOString() },
  })
  if (done.status !== 0) throw new Error('images.py finish failed')
  if (KEEP) console.log(`raw PNGs kept in ${SHOTS}`)
} catch (err) {
  console.error(err)
  await browser?.close()
  process.exitCode = 1
} finally {
  cleanup()
}
