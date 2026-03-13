# Lena Velieva Portfolio

Portfolio site for Lena Velieva built with Vite, React, TypeScript, Tailwind CSS, Radix UI, and Framer Motion.

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS 4
- Radix UI
- Framer Motion
- GitHub Pages deployment via GitHub Actions

## Project Structure

- `src/` application source code
- `public/` static assets
- `src/data/site-content.json` editable site content and project data
- `.github/workflows/deploy-pages.yml` GitHub Pages deployment workflow
- `tailwind-plus/` local design reference library

## Local Development

```sh
npm ci
npm run dev
```

Local dev server: `http://localhost:8080`

## Available Scripts

```sh
npm run dev
npm run build
npm run preview
npm run lint
```

## Deploy

Push to the `master` branch to trigger the GitHub Pages workflow.

The Vite `base` path is configured automatically for GitHub Pages in CI using `GITHUB_REPOSITORY`.

## Notes

- Build output in `dist/` is ignored by git and generated in CI.
- `node_modules/` and local mirrors are ignored by git.
- Content is stored in UTF-8 and normalized with `.editorconfig` and `.gitattributes`.
