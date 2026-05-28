# Projects content

Add or update research projects by creating Markdown files in this folder.

## Quick start

1. Copy an existing file (e.g. `1_project.md`) and rename it (e.g. `gnss-smartphone-nav.md`).
2. Edit the frontmatter and body.
3. Run `npm run dev` to preview.

## Frontmatter

```yaml
---
title: Your project title
description: Short summary for the project card
img: assets/img/your-cover.jpg   # optional card/cover image
importance: 1                    # higher = listed first
category: work                   # used for filtering (e.g. work, fun)
related_publications: false
---
```

## Images

Place images under `assets/img/` in the repo root. They are synced to `public/assets/img/` on `npm run dev` / `npm run build`.

## Slug / URL

The filename (without `.md`) becomes the URL: `/projects/your-filename`.
