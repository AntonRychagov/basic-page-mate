# Basic Page Mate

Portfolio site built with Vite, React, TypeScript, shadcn-ui, and Tailwind CSS.

## Project Structure

- `src/` application source
- `public/` static assets
- `tailwind-plus/` reference UI library kept in-repo for design inspiration
- `.github/workflows/deploy-pages.yml` GitHub Pages deployment

## Local Development

```sh
npm ci
npm run dev
```

The site runs locally at `http://localhost:8080`.

## Production Build

```sh
npm run build
```

The GitHub Pages workflow builds the site from the repository root and publishes `dist/`.
