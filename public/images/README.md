# Replacing the placeholder images

Every image on the site lives in its own folder here. To swap one in: **export/save
your image using the exact filename shown below and overwrite the file in that
folder** (same filename, same folder — don't rename it, don't change the extension,
just replace the file's contents).

```
images/
  brand/logo.jpg                  ← the logo shown in the sidebar / mobile top bar

  profile/photo.jpg               ← your portrait photo

  stack/                          ← the 3 flagship cards in the hero orbit
    neer/logo.jpg                 ← Neer — https://neer-nine.vercel.app/
    neurograph/logo.jpg           ← NeuroGraph — https://neurograph-gold.vercel.app/
    red-and-spice/logo.jpg        ← Red & Spice — https://red-and-spice.vercel.app/

  projects/                       ← the Projects flip-tile mosaic
    local-directory/cover.jpg
    sales-tracker/cover.jpg
    order-bot/cover.jpg
    habit-tracker/cover.jpg
    prompt-eval/cover.jpg
    tv-remote/cover.jpg

  products/                       ← the Products masonry grid
    directory-listing/cover.jpg
    sales-dashboard/cover.jpg
    order-bot-chat/cover.jpg
    habit-tracker/cover.jpg
    prompt-eval-ui/cover.jpg
    tv-remote/cover.jpg
    moderation-panel/cover.jpg
    receipt-report/cover.jpg
    auth-flow/cover.jpg
    analytics-widget/cover.jpg

  case-studies/                   ← the Case Studies cards
    case-directory/cover.jpg
    case-sales-tracker/cover.jpg
    case-order-bot/cover.jpg
    case-habit-tracker/cover.jpg
```

Every placeholder right now just shows a plain number or short label so it's
obvious which slot is which — any image size works once you replace it (masonry
columns reflow, card frames crop with `object-cover`). No code changes needed
after replacing a file.

## Stack card → live link mapping

The 3 hero cards now map to your real projects:

- **Neer — Local Marketplace Platform** → neer-nine.vercel.app
- **NeuroGraph — AI Knowledge Graph** → neurograph-gold.vercel.app
- **Red & Spice — Restaurant Web Platform** → red-and-spice.vercel.app

If you ever need to change this, edit `stackCardsData` in `src/data/content.js`
(and rename the matching `stack/<slug>/` folder to keep the logo lined up).
