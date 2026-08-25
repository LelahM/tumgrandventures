# TUM Grand Venture

Marketing website for TUM Grand Venture, built with [Eleventy](https://www.11ty.dev/) and [Tailwind CSS](https://tailwindcss.com/).

## Live Site

- Production: https://tumgrandventures.vercel.app
- Repository: https://github.com/LelahM/tumgrandventures

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server (watches Nunjucks templates + Tailwind):

```bash
npm run eleventy:watch
```

Build for production (outputs to `dist/`):

```bash
npm run build
```

## Deploying to Vercel

This repo includes a `vercel.json` that tells Vercel how to build the static site:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

To deploy:

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository.
2. Vercel will auto-detect the settings from `vercel.json` — no changes needed.
3. Click **Deploy**.

Every push to `main` will trigger a new production deployment automatically.

## Project Structure

- `src/` — Nunjucks page templates, partials, styles, scripts, and images
- `src/_includes/` — Shared layout (`base.njk`) and reusable partials (header, footer, CTA banner, contact form, etc.)
- `dist/` — Generated static site output (not committed to git)
