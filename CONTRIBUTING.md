# Contributing — Intelligent Navigation and Mapping Lab website

This site runs on **Next.js** at the repository root. The old Jekyll site is archived in **`legacy/`** (do not edit for production).

Lab members can update content without touching React code by editing files under `content/` and `content/bibliography/`.

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add a publication

1. Open `content/bibliography/papers.bib` in any text editor.
2. Add a new BibTeX entry (copy an existing `@article{...}` block).
3. Optional fields used by the site: `abstract`, `pdf`, `code`, `doi`, `url`, `selected={true}`, `bibtex_show={true}`.
4. Save and redeploy (Vercel rebuilds automatically on push).

## Add a team member

1. Create `content/people/firstname-lastname.md` (filename becomes internal id).
2. Use this frontmatter:

```yaml
---
name: Full Name
url: https://optional-profile-link
image: /assets/img/photo.jpg
research_interests: Short list
about: One paragraph bio
category: PhD Students
linkedin: https://www.linkedin.com/in/...
---
```

3. Put the photo in `assets/img/` at the repo root.
4. Valid `category` values match `teamRoleOrder` in `src/lib/site-config.ts`.

## Add a news item

1. Create `content/news/short-title.md`.
2. Frontmatter:

```yaml
---
date: 2025-06-01
inline: true
---
```

3. Body = announcement text. `inline: true` shows it on the home page table; `false` adds a titled entry on `/news`.

## Adding a Gallery Item

1. Place your photo(s) in `/public/gallery/` (or `assets/gallery/` at the repo root — they are synced to `public/gallery/` on `npm run dev` / `npm run build`). Use descriptive filenames (e.g. `lidar-test-march-2025.jpg`).
2. Create `content/gallery/your-slug.md` (the filename becomes the item id).
3. Copy frontmatter from an existing gallery file:

```yaml
---
title: "Your title"
date: "2025-06-01"
cover: "/gallery/your-slug.jpg"
category: "Field Work"   # Field Work | Conference | Lab | Equipment | Team
tags: ["Tag one", "Tag two"]
members: ["Full Name", "Another Name"]
location: "Calgary, AB"
featured: true           # true = homepage preview (max 6 shown)
excerpt: "One-line teaser for the grid card"
---
```

4. Write the article body in Markdown below the frontmatter — a short field journal or lab blog post (headings, lists, and inline images are supported).
5. Set `featured: true` if you want the item on the homepage gallery preview.
6. Run `npm run dev` to preview at `/gallery` before pushing.
7. Commit both the image and the `.md` file together.

## Update the contact page

Edit `content/pages/contact.md`:

- `intro` text goes in the markdown body (below the frontmatter `---`).
- Lab director photo and details are in the `profile:` block at the top of the file.
- Address lines are in `src/lib/content.ts` (`getContactPage`) if the physical address changes.

## Site settings (developers)

Edit `src/lib/site-config.ts` for navigation, social links, and announcement limits.

---

# Contributing to al-folio (upstream theme)

Thank you for considering contributing to al-folio!

## Pull Requests

We welcome your pull requests (PRs).
For minor fixes (e.g., documentation improvements), feel free to submit a PR directly.
If you would like to implement a new feature or a bug, please make sure you (or someone else) has opened an appropriate issue first; in your PR, please mention the issue it addresses.

Note that since [#2048](https://github.com/alshedivat/al-folio/pull/2048) al-folio uses the [prettier formatter](https://prettier.io/) for its code, meaning all new submitted code must conform to its standard. If you don't have `prettier` installed for your setup and the `prettier` code check fails when submitting a PR, you can check the referred failed action in our repo. In that action there will be an artifact with an HTML diff showing the needed changes.

## Issues

We use GitHub issues to track bugs and feature requests.
Before submitting an issue, please make sure:

1. You have read [the FAQ section](FAQ.md) of the README and your question is NOT addressed there.
2. You have done your best to ensure that your issue is NOT a duplicate of one of [the previous issues](https://github.com/alshedivat/al-folio/issues).
3. Your issue is either a bug (unexpected/undesirable behavior) or a feature request.
   If it is just a question, please ask it in the [Discussions](https://github.com/alshedivat/al-folio/discussions) forum.

When submitting an issue, please make sure to use the appropriate template.

## License

By contributing to al-folio, you agree that your contributions will be licensed
under the LICENSE file in the root directory of the source tree.
