# Traditional Records — Project Context voor Claude

## Wat is dit project?
Een volledig statische website voor Traditional Records, een Surinaams platenlabel.
**Geen frameworks, geen build tools in de broncode** — pure HTML, CSS en vanilla JS.
Een `build.mjs` script optimaliseert de output naar `dist/` voor deployment.

## Tech Stack
- **HTML5** — semantische pagina's, ARIA, View Transitions meta
- **CSS** — `style.css` met `@layer` architectuur, custom properties, licht/donker modus
- **Vanilla JS** — `script.js`, modules-patroon, geen frameworks
- **Build** — `build.mjs` met `sharp` (WebP), `terser` (JS), `clean-css` (CSS)
- **Service Worker** — `sw.js`, cache-first voor static assets
- **Deployment** — GitHub Pages via GitHub Actions (`deploy.yml`)

## Bestandsstructuur
```
/
├── index.html          # Homepage
├── releases.html       # Catalogus met genre-filter
├── script.js           # ALLE data (MOCK_DB) + logica + modules
├── style.css           # ALLE styling (v40, @layer georganiseerd)
├── sw.js               # Service Worker
├── build.mjs           # Build pipeline (images → WebP, CSS/JS minify)
├── favicon.svg         # Draaiende vinyl met embedded logo (2.8KB)
├── logo.png            # Traditional Records palmboem logo
└── *.html              # Overige pagina's
```

## Data Model (in script.js)
Alle data zit in `window.MOCK_DB`:
```js
MOCK_DB = {
  releases: [{ id, artist, title, genres: ["WINTI"], price, img, spotify, desc, scarcity? }],
  merch:    [{ id, title, price, img, badge?, desc }],
  events:   [{ day, month, year, artist, venue, city, link }],
  artists:  [{ id, name, genre, origin, active, bio, img, spotify, instagram }]
}
```

## Genres (multi-genre via `genres: []` array)
WINTI · KASEKO · KAWINA · DANCEHALL · REGGAE · GOSPEL · ZOUK · GROOT BAZUIN
- Filter logica: `r.genres.includes(filter)`
- 6 albums hebben `genres: ["DANCEHALL", "REGGAE"]` (beide tegelijk)

## Belangrijke Patronen
- **Modals** — `Modules.UI.openModal(id)` opent productmodal met audio preview
- **Cart** — `Modules.Cart` met localStorage persistentie
- **Audio** — iTunes Search API, 30 sec preview, `AbortController` voor cleanup
- **Render** — `Modules.Render.releases(items)` en catalog inline script in releases.html
- **Filters** — genre buttons triggeren re-render, homepage toont max 8 albums
- **Fonts** — Libre Franklin via Google CDN + `display=swap`
- **Vinyl decoratie** — CSS `.decor-vinyl` met `spinVinyl` animatie in sidebar

## Codeer Conventies
- Geen TypeScript, geen JSX, geen bundlers
- Gebruik `const` / `let`, geen `var`
- Arrow functions voor callbacks
- Template literals voor HTML strings
- `?.` optional chaining voor DOM queries
- Alle DOM queries via `document.getElementById` (niet `querySelector` voor unieke IDs)

## Git / Deploy Workflow
```bash
# Lokale wijziging maken
git add [bestanden]
git commit -m "feat/fix/perf: korte beschrijving"
git push origin main
# → GitHub Actions draait automatisch: npm ci → node build.mjs → deploy dist/
```

## Wat NIET te doen
- Voeg GEEN `node_modules/` toe aan git (staat in .gitignore)
- Voeg GEEN `dist/` toe aan git (wordt gegenereerd door CI)
- Gebruik GEEN externe CSS frameworks (Tailwind, Bootstrap etc.)
- Breek de `MOCK_DB` structuur niet — releases.html polling is verwijderd, data is synchroon beschikbaar
- Verander NIET de `genres: []` array terug naar `genre: ""` string

## Live Site
https://elkasava.github.io/traditional-records/

## Laatste Grote Wijzigingen
- v40.0: @layer CSS, View Transitions, Web Share API, JSON-LD, Service Worker
- Build pipeline: images → WebP (tot 92% kleiner), CSS/JS geminified
- Favicon: draaiende vinyl SVG met embedded logo (37KB → 2.8KB)
- Genre normalisatie: alle releases gebruiken `genres: []` array
