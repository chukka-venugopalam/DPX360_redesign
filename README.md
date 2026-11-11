# DPX360 redesign concept

An unofficial, booking-first redesign concept for DPX360. It is a React single-page app built with Vite; it is not the official DPX website.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```sh
npm ci
npm run dev
```

Vite prints the local development URL in the terminal.

## Build and preview

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. The preview server binds to `127.0.0.1:4173`.

## Project structure

- `src/` — React UI, content, and styles
- `public/` — static images and metadata assets
- `tools/paint.py` — optional script for regenerating the procedural artwork in `public/art/`; it requires Python, NumPy, Pillow, and SciPy

Keep `package-lock.json` committed so installs remain reproducible. Do not commit credentials or local `.env` files.
