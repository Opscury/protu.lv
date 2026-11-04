"""Pillow helpers for capture.mjs, run with protu-lapas's Python (it has Pillow).

  python images.py prep <piemeri/marta/i> <out dir>      sample paintings -> glezna-1..5.jpg
  python images.py finish <shots dir> <public/builder>   compose screen 3, write the four WebP files
"""

import json
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw

GROUND = (18, 19, 24)  # #121318, the site's ground
MAX_BYTES = 200_000
SHOTS = [("ob2", "steps-1-add"), ("look", "steps-2-look"), ("live", "steps-3-live"), ("edit", "steps-4-edit")]
PROVENANCE = (
    "Screenshot of the real Protu lapas editor (protu-lapas {rev}, local dev run, DEBUG) at 1440x900 "
    "(phone view of the live site at 390x844). Invented person Rasa Dzērvīte; the paintings are the "
    "AI-generated sample images from public/piemeri/marta (Picsart, seedream-5.0-pro). Not real client work.\n"
)


def prep(src, out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    files = sorted(Path(src).glob("*-w1600.webp"))[:5]
    if len(files) < 5:
        raise SystemExit(f"need 5 *-w1600.webp files in {src}")
    for i, f in enumerate(files, 1):
        Image.open(f).convert("RGB").save(out / f"glezna-{i}.jpg", quality=92)


def rounded(im, r, border):
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im.width - 1, im.height - 1], r, fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    out.paste(im.convert("RGBA"), (0, 0), mask)
    ImageDraw.Draw(out).rounded_rectangle([0, 0, im.width - 1, im.height - 1], r, outline=border, width=2)
    return out


def finish(shots, out):
    shots, out = Path(shots), Path(out)
    canvas = Image.new("RGB", (1440, 900), GROUND)
    desk = rounded(Image.open(shots / "live-d.png").resize((1160, 725), Image.LANCZOS), 14, (255, 255, 255, 40))
    canvas.paste(desk, (40, 88), desk)
    ph = Image.open(shots / "live-m.png")
    ph = rounded(ph.resize((int(ph.width * 780 / ph.height), 780), Image.LANCZOS), 36, (255, 255, 255, 70))
    canvas.paste(ph, (1440 - ph.width - 56, 60), ph)
    canvas.save(shots / "live.png")
    rev = os.environ.get("LAPAS_REV", "unknown")
    for src, name in SHOTS:
        im = Image.open(shots / f"{src}.png").convert("RGB")
        target = out / f"{name}.webp"
        for q in (82, 76, 70, 64, 58, 52):
            im.save(target, "WEBP", quality=q, method=6)
            if target.stat().st_size < MAX_BYTES:
                break
        (out / f"{name}.webp.json").write_text(json.dumps(
            {"prompt": PROVENANCE.format(rev=rev), "createdAt": os.environ.get("SHOT_DATE", "")},
            ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{target}  q{q}  {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    {"prep": prep, "finish": finish}[sys.argv[1]](*sys.argv[2:])
