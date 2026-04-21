# World Atlas

An interactive 3D globe that shows high-level country intelligence. Spin the globe, hover for basics, click a country to open a side panel — the globe then recolors to show that country's allies, working partners, and tensions.

Personal project, snapshot as of early 2026. Asia-only data in v1; other continents render but show a graceful empty state.

## Stack

- Next.js 14 App Router, TypeScript (strict)
- TailwindCSS
- `react-globe.gl` (Three.js under the hood)
- Static JSON — no backend, no database, no runtime API calls
- Deploys to Vercel free tier

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Adding or editing country data

All country content lives in `data/countries.json`, keyed by ISO alpha-3 code (`ADM0_A3`).

Follow the `CountryData` schema in `lib/types.ts`:

- `basic` — name, capital, region, government, languages, currency
- `snapshot` — population, GDP, GDP per capita, economy type
- `identity` — one-paragraph framing
- `strengths` / `weaknesses` — arrays of strings
- `current_position` — one paragraph on present-day posture
- `history_brief` — one paragraph narrative
- `relationships.allies` / `.working` / `.tensions` — each an array of `{ country: ISO3, reason: string }`

The globe recolors from the `relationships` arrays of the currently selected country. Referenced ISO-3 codes should match keys in this file (or they'll just render neutral).

## Data sources

- Country polygons: [Natural Earth](https://www.naturalearthdata.com/) (`ne_110m_admin_0_countries`), committed at `public/data/world-110m.geojson`. Use the `ADM0_A3` property for ISO alpha-3 — `ISO_A3` returns `-99` for disputed territories.
- Narrative content: human-curated.

## Deploying

Push to `main` and Vercel will auto-deploy. No environment variables required.

## Project layout

```
app/            Next.js App Router entry, layout, globals
components/     GlobeView, Globe, CountryPanel, HoverTooltip, Legend, tabs/
lib/            types, colorMap, flag emoji util
data/           countries.json (the content)
public/data/    world-110m.geojson (Natural Earth)
```
