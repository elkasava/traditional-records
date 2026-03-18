# 🌴 Traditional Records

> Het toonaangevende platenlabel voor Surinaamse erfgoedmuziek.
> Kaseko · Kawina · Winti · Dancehall · Reggae · Gospel · Zouk

[![Deploy to GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-222?logo=github)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](#license)

---

## Overzicht

Een volledig statische, zero-dependency website voor Traditional Records. Geen frameworks, geen build tools — pure HTML, CSS en vanilla JS. Klaar om te deployen naar GitHub Pages, Netlify of elke andere static host.

### Features

| Functie | Details |
|---|---|
| **Catalogus** | 26 releases met genre-filter (WINTI, KASEKO, KAWINA, DANCEHALL, REGGAE, GOSPEL, ZOUK, GROOT BAZUIN) |
| **Audio preview** | iTunes API — 30 sec preview in product modal |
| **Winkelwagen** | Volledig client-side cart met localStorage persistentie |
| **Service Worker** | Offline support + cache-first static assets |
| **Web Share API** | Native mobiel delen op alle release cards |
| **JSON-LD** | Schema.org structured data (MusicGroup, MusicAlbum, MusicEvent) |
| **View Transitions** | Native page-animaties via Chrome View Transitions API |
| **Scroll-driven animaties** | CSS-native via `animation-timeline: view()` |
| **Light mode** | `prefers-color-scheme: light` support |
| **Responsive** | Volledig mobiel — hamburger menu, adaptive grid |
| **Toegankelijk** | Focus-management, ARIA-labels, keyboard navigatie |

---

## Structuur

```
traditional-records/
├── index.html          # Homepage — hero, releases, merch, agenda
├── releases.html       # Volledige catalogus met genre-filter
├── artiesten.html      # Artiestenpagina
├── artiest-detail.html # Artiest detail
├── genres.html         # Genre-overzicht
├── agenda.html         # Tour-agenda
├── merch.html          # Merchandise winkel
├── shop.html           # Shop overview
├── sync.html           # Sync & licensing
├── magazine.html       # Nieuws & verhalen
├── singles-club.html   # Singles club abonnement
├── poku-lobi-club.html # Poku Lobi Club
├── over.html           # Over Traditional Records
├── contact.html        # Contact
├── faq.html            # Veelgestelde vragen
├── privacy.html        # Privacybeleid
├── 404.html            # Error pagina
├── style.css           # Alle styling (v40 — @layer georganiseerd)
├── script.js           # Data, logica, modules
├── sw.js               # Service Worker (cache-first)
├── google-fonts.css    # Lokale font fallback
├── favicon.svg         # Draaiende vinyl favicon
├── logo.png            # Traditional Records logo
└── *.webp / *.jpg      # Merch & hero afbeeldingen
```

---

## Lokaal Draaien

Geen installatie nodig — gebruik een eenvoudige static file server:

```bash
# Met Node.js (npx)
npx serve .

# Met Python
python -m http.server 8080

# Of open direct in browser (sommige functies vereisen een server vanwege CORS)
```

Ga naar `http://localhost:3000` (of de getoonde poort).

---

## Deployen naar GitHub Pages

### Automatisch via GitHub Actions

Push naar `main` — de meegeleverde workflow (`.github/workflows/deploy.yml`) deployt automatisch.

### Handmatig

1. Ga naar **Settings → Pages** in je GitHub repo
2. Source: **Deploy from a branch**
3. Branch: `main` / `(root)`
4. Sla op — binnen 1 minuut live

### Custom domein

Voeg een `CNAME` bestand toe met je domein:

```
traditionalrecords.sr
```

---

## Technologie

- **HTML5** — semantische markup, ARIA, View Transitions meta
- **CSS3** — `@layer`, custom properties, `@view-transition`, scroll-driven animations, `prefers-color-scheme`
- **Vanilla JS** — modules patroon, `AbortController`, `navigator.share`, Service Worker
- **Schema.org** — JSON-LD structured data voor Google Rich Results
- **iTunes Search API** — gratis audio previews

---

## Genrestructuur

Elk release-object gebruikt een `genres` array voor multi-genre support:

```js
{ id: 4, artist: "FAJA WOWIA", title: "Sama Toli", genres: ["DANCEHALL", "REGGAE"], ... }
```

De filter-logica:
```js
releases.filter(r => r.genres.includes(filter))
```

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Kernfunctionaliteit | ✅ | ✅ | ✅ | ✅ |
| View Transitions | ✅ 111+ | ✅ 119+ | ✅ 18+ | ✅ |
| Scroll-driven animations | ✅ 115+ | 🔜 | ❌ (graceful fallback) | ✅ |
| Web Share API | ✅ | ❌ (verborgen) | ✅ | ✅ |
| Draaiende SVG favicon | ✅ | ⚠️ | ❌ (statisch) | ✅ |

---

## Licentie

© 2025 Traditional Records. Alle rechten voorbehouden.
Code structuur: MIT — content & muziek: alle rechten voorbehouden.
