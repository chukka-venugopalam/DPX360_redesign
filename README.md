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

## Content and launch notes

- This is an unofficial concept, not a booking or payment system. Grand Prix, member, affiliate, and city enrolment links open verified pages on the official DPX website. Other enquiries use the published DPX support email or WhatsApp contact.
- Event details in `src/data.js` were checked against the public DPX website on 12 November 2026 and should be reconfirmed before launch.
- The images in `public/art/` are original concept illustrations, not DPX photography. Client-approved images are still needed for the hero, destinations, activities, families, and camps. The header uses a typographic wordmark because no official logo asset was present.
- The film is loaded from the official DPX website only after the visitor chooses to play it. Confirm permission and stable hosting before production.
- `#/pitch` is an internal measurement-status page. It contains no Lighthouse results; do not publish comparative performance claims until repeat mobile and desktop runs are saved for both sites under matched conditions.
- Verified legal, safety, careers, and refund-policy URLs, along with any backend forms or portal requirements not covered by the official links, must be supplied by DPX before launch.
