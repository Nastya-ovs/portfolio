# Portfolio — Anastasia Ovsyannikova

Personal portfolio site for a Senior Product Designer.

**Live:** https://nastyaovs2016-cloud.github.io/portfolio

## Stack

Static HTML + CSS + vanilla JS. No build step.

## Local preview

Open `index.html` in a browser, or run a simple local server:

    python3 -m http.server 8000

Then visit http://localhost:8000

## Structure

- `index.html` — main page (hero, projects, about, contact, footer)
- `styles.css` — all styles (tokens, reset, components)
- `script.js` — i18n runtime, sticky header, cases rendering, scroll reveal
- `data/`
  - `translations.json` — UI strings for EN/RU
  - `cases.json` — case metadata for the homepage grid
- `cases/`
  - `_template.html` — reference template (not linked)
  - one `.html` per case study
- `images/`
  - `avatar.svg` — About-section photo placeholder (replace with real photo)
  - `favicon.svg`, `og-image.png` — site meta assets
  - `projects/<slug>/` — cover.png, main.png, and numbered detail images per case

## What still needs to be updated by the owner

- **Real avatar:** replace `images/avatar.svg` with a JPG/PNG portrait, then update `<img src="images/avatar.svg">` in `index.html` to point to the new file.
- **Real metrics** on cases without a `metric_en`/`metric_ru` in `data/cases.json`. Adding a metric surfaces a ✦ line under the summary — big trust boost. Leave `null` when you don't have one.
- **Bio text:** current copy in `data/translations.json` (keys `about.bio_p1`, `about.bio_p2`, `about.bio_p3`) is a draft — refine as you like.

## How to add a new public case

1. Copy `cases/_template.html` to `cases/<slug>.html`
2. Fill title, breadcrumb, meta blocks, image references
3. Drop images into `images/projects/<slug>/` — at minimum `cover.png` and `main.png`
4. Add an entry to `data/cases.json` under `selected` or `other` with fields:
   `slug`, `protected: false`, `cover`, `client`, `category`, `year`, `name_en`, `name_ru`, `summary_en`, `summary_ru`, `metric_en`, `metric_ru`
5. `git add . && git commit -m "feat: add <slug> case" && git push`

Site rebuilds automatically within 1–2 minutes.

## How to add a protected (NDA) case

Currently no cases are protected. If you want to gate a case behind a password:

1. Author the case HTML normally (copy `cases/_template.html` and fill).
2. Encrypt it with StaticCrypt (`npx staticrypt cases/<slug>.html --short -p <password> -o cases/<slug>.html`).
3. In `data/cases.json` set `"protected": true` for that entry.
4. Commit and push.

One password covers all protected cases. To change it, re-encrypt every protected file with the new password.

## Custom domain (future)

1. Buy a domain from a registrar (Namecheap, Cloudflare, Reg.ru, etc.)
2. Create a file `CNAME` in the repo root containing your domain (e.g. `nastya.design`).
3. At the registrar, add DNS records per [GitHub Pages custom-domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. In repo Settings → Pages, set the custom domain.
5. Wait a few minutes for SSL provisioning.

## Localisation

Site is bilingual EN / RU. Default is English; the selector `EN / RU` in the header switches.

- UI strings live in `data/translations.json` — dot-namespaced keys, referenced from HTML via `data-i18n="key"`.
- Case pages use `data-lang-content` on a wrapper with `data-lang="en" | "ru"` inside — the runtime hides all but the matching language.
- The choice is remembered in `localStorage` so returning visitors see the language they last chose.
