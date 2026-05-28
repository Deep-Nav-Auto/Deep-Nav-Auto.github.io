# Legacy Jekyll site (archived)

This folder contains the original **al-folio / Jekyll** implementation. It is **not deployed** and is kept for reference only.

The live site is the **Next.js** app at the repository root (`src/`, `content/`, `public/`).

## Contents

| Path | Purpose |
|------|---------|
| `_config.yml`, `Gemfile` | Jekyll configuration |
| `_pages/`, `_people/`, `_news/`, `_projects/`, `_posts/` | Original markdown collections |
| `_includes/`, `_layouts/`, `_sass/`, `_plugins/` | Theme templates and build plugins |
| `_bibliography/` | Original BibTeX (active copy: `content/bibliography/`) |
| `assets/css`, `assets/js`, … | Theme static assets (images stay at repo root `assets/img/`) |
| `.github/workflows/` | Old GitHub Pages / Jekyll CI jobs |
| `README-al-folio.md` | Upstream al-folio documentation |

## Running the old site locally (optional)

```bash
cd legacy
bundle install
bundle exec jekyll serve
```

Requires Ruby 3.2+ and Bundler. See `INSTALL.md` in this folder.

## Do not edit for production changes

Update the Next.js site instead:

- Content → `content/`
- App code → `src/`
- Images → `assets/img/` (repo root)
- Site settings → `src/lib/site-config.ts`
