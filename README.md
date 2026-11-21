# RED® portfolio — Space Black edition

React 18 + Vite 5 + Tailwind 3. No animation libraries: a single shared rAF scroll bus (`src/hooks/useScroll.js`) drives every scroll scene through a `--p` CSS variable.

## Run (on your Mac, in Terminal)
    cd red-portfolio
    npm install
    npm run dev        # dev server
    npm run build      # production build -> dist/

## Replace images
All pictures live in `public/images/` (see `public/images/README.md`). Overwrite the .jpg with the same name — no code changes.

## Where things live
- `src/data/content.js` — all copy, links, projects, certs
- `src/scenes.css` — hero laptop, drum, stacked cards, certificate wall
- `src/components/Ribbons.jsx` — the ribbon artwork from the reference
- Respects `prefers-reduced-motion` (pinned scenes become static layouts)
