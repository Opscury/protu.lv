r"""Draws public/og-protu.png (1200x630), the share image for protu.lv.

Facebook, WhatsApp and LinkedIn do not show SVG share images, so this one is a PNG.
Dark studio: #121318 ground, warm white ink, one amber line. No diacritics in the text:
the fonts come from the site's own woff2 files and the basic Latin subset has none.

Run with a Python that has Pillow (protu-lapas's venv does), from the protu.lv root:
    ..\protu-lapas\.venv\Scripts\python.exe scripts\make-og.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules" / "@fontsource-variable"
INTER = FONTS / "inter-tight" / "files" / "inter-tight-latin-wght-normal.woff2"
MONO = FONTS / "jetbrains-mono" / "files" / "jetbrains-mono-latin-wght-normal.woff2"

GROUND, INK, AMBER, QUIET = "#121318", "#f3eee6", "#f5a04a", "#9a968f"
W, H, LEFT = 1200, 630, 84


def font(path, size, weight):
    f = ImageFont.truetype(str(path), size)
    f.set_variation_by_axes([weight])
    return f


img = Image.new("RGB", (W, H), GROUND)
d = ImageDraw.Draw(img)

# Top bar: the wordmark, then the lit line under it.
d.text((LEFT, 58), "protu.lv", font=font(INTER, 34, 700), fill=INK)
d.line([(0, 128), (W, 128)], fill=AMBER, width=2)

head = font(INTER, 82, 700)
d.text((LEFT, 218), "Portfolio lapa un", font=head, fill=INK)
d.text((LEFT, 312), "pieteikuma PDF.", font=head, fill=INK)
d.text((LEFT, 406), "Bez maksas.", font=head, fill=AMBER)

d.text((LEFT, 540), "vards.protu.lv", font=font(MONO, 30, 500), fill=QUIET)

out = ROOT / "public" / "og-protu.png"
img.save(out, optimize=True)
print("wrote", out, out.stat().st_size, "bytes")