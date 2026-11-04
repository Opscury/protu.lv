"""Run INSIDE protu-lapas, by capture.mjs only:  python manage.py shell < seed_rasa.py

Finishes the invented painter after the onboarding run in capture.mjs has created her
(dev login + five uploaded pictures): titles and captions, an about text, then approves
and renders the site into SITES_ROOT. Refuses to run unless DEBUG is on and the data dir
is the throwaway one capture.mjs made (SCREENSHOT_RUN_DIR), so it never touches real data.
"""

import os
from pathlib import Path

from django.conf import settings

run_dir = os.environ.get("SCREENSHOT_RUN_DIR")
if not (settings.DEBUG and run_dir and Path(settings.DATA_DIR).resolve().is_relative_to(Path(run_dir).resolve())):
    raise SystemExit("seed_rasa.py: refusing to run outside a throwaway DEBUG data dir made by capture.mjs")

from accounts.models import User  # noqa: E402
from moderation import services  # noqa: E402
from moderation.models import PublishRequest  # noqa: E402
from portfolio.models import Site, Work  # noqa: E402
from sites import render  # noqa: E402

EMAIL = "rasa@example.lv"  # invented person, example.lv is not a real inbox
TITLES = {  # uploaded file name -> (LV title, EN title, year)
    "glezna-1.jpg": ("Meža mala", "Forest edge", 2025),
    "glezna-2.jpg": ("Josla I", "Band I", 2025),
    "glezna-3.jpg": ("Kūts martā", "Barn in March", 2025),
    "glezna-4.jpg": ("Bērzi", "Birches", 2024),
    "glezna-5.jpg": ("Plūmes", "Plums", 2024),
}

site = Site.objects.get(user__email=EMAIL)
for work in Work.objects.filter(project__site=site):
    first = work.images.first()
    if not first or first.asset.original_name not in TITLES:
        continue
    work.title_lv, work.title_en, work.year = TITLES[first.asset.original_name]
    work.fields = {"tehnika": "eļļa uz audekla", "izmeri": {"h": 80, "w": 100}}
    work.save()
site.about_lv = "Gleznoju ainavas un klusās dabas. Izdomāta persona Protu lapu paraugam."
site.about_en = "I paint landscapes and still lifes. An invented person for a Protu lapas sample."
site.save()

staff = User.objects.filter(email="staff@example.lv").first() or User.objects.create_user(
    "staff@example.lv", is_staff=True, is_superuser=True)
services.request_publish(site)
req = PublishRequest.objects.filter(site=site).order_by("-id").first()
if req and req.status != "approved":
    services.approve(req, staff)
site.refresh_from_db()
render.publish_live(site)
print(f"SITE_DIR={Path(settings.SITES_ROOT) / site.user.vards}")
