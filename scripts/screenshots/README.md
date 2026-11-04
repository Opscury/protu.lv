# Home page screenshots ("Trīs soļi līdz savai lapai")

Re-takes the four screenshots of the real Protu lapas editor shown on the protu.lv home page.
The person, Rasa Dzērvīte, is invented. Her paintings are the AI-generated samples in
`public/piemeri/marta/i/`.

| File | What it is |
| --- | --- |
| `capture.mjs` | Runs everything: a temp protu-lapas dev server, the browser steps, then the output files |
| `seed_rasa.py` | Run by `capture.mjs` inside protu-lapas (`manage.py shell`). Adds titles and an about text, then approves and renders her site |
| `images.py` | Pillow helpers: turns the sample paintings into uploads, builds screen 3, writes the WebP files and sidecars |

## What it needs

- **protu-lapas** checked out next to protu.lv (or set `PROTU_LAPAS`), with its venv installed
  (`requirements-dev.txt`) and the editor built (`cd editor && npm ci --include=dev && npm run build`).
  You don't need a `.env`: the script ignores protu-lapas's `.env` on purpose.
- **Playwright** with Chromium, installed globally: `npm i -g playwright` then `npx playwright install chromium`.
  It is not a protu.lv dependency.

## Run it

From the protu.lv root. Linux / macOS:

```bash
NODE_PATH="$(npm root -g)" node scripts/screenshots/capture.mjs
```

Windows (PowerShell):

```powershell
$env:NODE_PATH = (npm root -g); node scripts/screenshots/capture.mjs
```

Optional environment variables:

| Variable | Default |
| --- | --- |
| `PROTU_LAPAS` | `../protu-lapas` |
| `PYTHON` | `<protu-lapas>/.venv/bin/python` (Windows: `.venv\Scripts\python.exe`) |
| `EDITOR_PORT` | `8765` (temp Django runserver) |
| `SITE_PORT` | `8766` (temp static server for the rendered site) |
| `OUT` | `public/builder` (point it elsewhere for a dry run) |
| `KEEP_TMP=1` | keep the temp dir and the raw PNGs |

## What it does

1. Creates a temp dir and points protu-lapas's database, uploads and rendered sites at it
   (`DATA_DIR`, `SITES_ROOT`). It sets `DEBUG=True` and `DEV_LOGIN_BYPASS=True`, prints email to the
   console and doesn't read protu-lapas's `.env`. Nothing reaches a real database, server or inbox,
   and the temp dir is deleted at the end. `seed_rasa.py` also refuses to run outside that temp dir.
2. Logs in as `rasa@example.lv` with the dev login, picks *Gleznas un grafika* and uploads five paintings.
3. Fills in the name and line, then runs `seed_rasa.py`.
4. Takes the screenshots:

| Output | Viewport | Shows |
| --- | --- | --- |
| `public/builder/steps-1-add.webp` | 1440×900 | Onboarding "Pievieno bildes" with five uploaded paintings |
| `public/builder/steps-2-look.webp` | 1440×900 | Izskats page: the looks side by side with the phone preview |
| `public/builder/steps-3-live.webp` | 1440×900 desktop + 390×844 phone (2×), composed on #121318 | The published site |
| `public/builder/steps-4-edit.webp` | 1440×900 | Izskats with "Vairāk iestatījumu" open (layout, home page, type) |

Each file is WebP, kept under 200 KB (quality drops from 82 if needed). Each has a `.webp.json`
provenance sidecar like the other samples in `public/builder/`. No credentials are used or stored.

The works can show up in a different order between runs, because they keep the order in which the
uploads finished.
