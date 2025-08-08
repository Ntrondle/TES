# TES — Tröndle Embedded System (Next.js)

Minimal App Router Next.js site with Tailwind. Static export ready (GitHub Pages).

## Quick start

```bash
npm i
npm run dev
```

## Build & export (static)

```bash
npm run build
# output in /out for GitHub Pages
```

## Deploy: GitHub Pages (Actions)

1. Create a repo and push this project.
2. Go to Settings → Pages → Build and deployment → Source: "GitHub Actions".
3. Add this workflow to `.github/workflows/pages.yml`.

## Deploy: Vercel (simplest)

- Import the repo on vercel.com. Build command: `next build && next export`.
- Output directory: `out`.

---

Content is in `/app`, global styles in `/app/globals.css`.
Edit metadata in `/app/layout.js`.
