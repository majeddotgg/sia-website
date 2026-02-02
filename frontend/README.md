# SIA — Department of Islamic Affairs, Sharjah

Official bilingual (Arabic/English) website for the Department of Islamic Affairs - Sharjah, UAE. Built as a static export for cPanel hosting.

## Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Framework | Next.js 16.1.6 (App Router) |
| Language  | TypeScript 5 (strict)     |
| Styling   | Tailwind CSS v4           |
| UI        | React 19                  |
| Output    | Static HTML/CSS/JS        |
| Hosting   | cPanel (Apache)           |

## Prerequisites

- Node.js 18.x or higher
- npm 9+ (ships with Node.js 18+)

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). The root URL redirects to `/ar/` (Arabic, default language).

## Building for Production

```bash
npm run build
```

Generates a fully static site in the `out/` directory. No Node.js server required to serve it.

## Testing the Static Build

```bash
npx serve out
```

Preview at [http://localhost:3000](http://localhost:3000). Verify both `/ar/` and `/en/` routes render correctly.

## Project Structure

```
frontend/
├── app/
│   ├── [locale]/        # All pages, rendered for /ar/ and /en/
│   ├── layout.tsx       # Root layout (CSS import)
│   ├── page.tsx         # Root redirect → /ar/
│   └── globals.css      # Tailwind + theme
├── components/
│   ├── ui/              # Button, Input, Card, etc.
│   ├── layout/          # Header, Footer, Navigation
│   └── sections/        # Page-specific sections
├── lib/
│   ├── i18n/            # Locale config, dictionary loader, translation JSONs
│   └── data/            # Static data (services, news, etc.)
├── types/               # Shared TypeScript types
└── public/              # Static assets (images, fonts, favicon)
```

## Available Routes

| Route          | Description           |
|----------------|-----------------------|
| `/`            | Redirects to `/ar/`   |
| `/ar/`         | Arabic homepage       |
| `/en/`         | English homepage      |
| `/ar/about/`   | About (Arabic)        |
| `/en/about/`   | About (English)       |
| `/ar/services/`| Services (Arabic)     |
| `/en/services/`| Services (English)    |
| `/ar/contact/` | Contact (Arabic)      |
| `/en/contact/` | Contact (English)     |

## Deployment to cPanel

1. Run `npm run build`
2. Upload the contents of `out/` to `public_html/` (or the target directory)
3. Place a `.htaccess` file in the root with redirect and 404 rules (see `STATIC_EXPORT_GUIDE.md`)

## Documentation

- `CLAUDE.md` — Project constraints and context (auto-loaded by Claude Code)
- `CODING_STANDARDS.md` — Code style, naming, component patterns
- `STATIC_EXPORT_GUIDE.md` — What works and doesn't in static export
- `DEVELOPMENT_CHECKLIST.md` — Quality checks before commit and deploy
- `components/CLAUDE.md` — Component architecture and templates
- `app/CLAUDE.md` — Page and routing patterns
