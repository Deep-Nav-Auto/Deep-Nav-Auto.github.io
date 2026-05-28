# Intelligent Navigation and Mapping Lab — Website

Next.js site for the [Intelligent Navigation and Mapping Lab](https://www.ucalgary.ca/) (University of Calgary).

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS** + **Radix UI** primitives
- Content in **`content/`** (Markdown + BibTeX)
- Static assets in **`assets/img/`** (synced to `public/` on build)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project layout

```
├── src/app/          # Routes (/, /team, /publications, …)
├── src/components/   # UI components
├── src/lib/          # Content loaders, BibTeX, site config
├── content/          # Markdown & papers.bib (edit here)
├── assets/img/       # Photos and figures
├── public/           # Static output (generated assets copied on build)
├── scripts/          # Build helpers (asset sync)
└── legacy/           # Archived Jekyll site (reference only)
```

## Content updates

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for how lab members can add publications, team members, news, and projects without writing React code.

## Deployment (Vercel)

1. Import this repository in [Vercel](https://vercel.com).
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Set production URL in `src/lib/site-config.ts` (`url` field) when you have a custom domain.

The old GitHub Pages Jekyll workflow lives in `legacy/.github/workflows/` and is no longer used for production.

## License

See [LICENSE](LICENSE).
