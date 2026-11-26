# Playful OS preview (Codex-updated copy)

This is a **Codex-updated preview copy** of the Playful OS prototype, published so it can be opened in a browser. It is **not** the original 8/4 project on disk, and it is **not** a live product.

- Marked in the UI as 草稿・未上線 (Draft · Offline)
- Demo data only; no accounts, payments, or external services
- Public URL (GitHub Pages): https://noodleohya.github.io/playful-os-preview/

## What this copy adds (2026-11-24 update)

- Client preview: five viewpoints (FOH, floor VIP, left stand, right stand, upper) and a simple three.js stage
- GLB / GLTF file import for viewing only
- Live show preview as a local silent video (no DMX or timecode)
- Stage-visual subscription explanation, with no prices

## Open the static preview locally

```bash
npm ci
npm run build:pages
# then serve pages-dist/ under the /playful-os-preview/ base path
```

The vinext/Cloudflare app (`npm run dev` / `npm run build`) is still in this repo for local development. GitHub Pages serves the static Vite build (`npm run build:pages`), because vinext’s production output is a Cloudflare Worker, not a static site.
