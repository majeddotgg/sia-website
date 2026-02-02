# Static Export Guide — SIA Website

## What Static Export Means

When `output: 'export'` is set in `next.config.ts`, `npm run build` produces a folder
of plain HTML, CSS, and JS files in the `out/` directory. These files are served directly
by Apache on cPanel — no Node.js process runs on the server.

**Every page is pre-rendered at build time.** There is no server to handle requests dynamically.

## next.config.ts Configuration

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // Required: no image optimization server
  },
  trailingSlash: true,  // Generates /page/index.html (better for Apache)
};

export default nextConfig;
```

### Why `trailingSlash: true`?
Without it, Next.js generates `/about.html`. With it, it generates `/about/index.html`.
Apache serves `index.html` automatically for directory URLs, so `/about/` works without
any `.htaccess` rewrite rules.

## What Works in Static Export

| Feature                        | Works? | Notes                                    |
|-------------------------------|--------|------------------------------------------|
| Server Components              | Yes    | Rendered at build time                   |
| Client Components (`use client`)| Yes   | Hydrated in browser                      |
| `generateStaticParams`         | Yes    | Required for all dynamic routes          |
| `generateMetadata`             | Yes    | Rendered at build time                   |
| Static `<Image>` with unoptimized | Yes | No optimization, but works               |
| CSS Modules / Tailwind         | Yes    | Fully supported                          |
| `next/font`                    | Yes    | Fonts inlined/preloaded at build time    |
| `next/link`                    | Yes    | Client-side navigation works             |
| `useState` / `useEffect`      | Yes    | Normal client-side React                 |
| `localStorage` / `sessionStorage` | Yes | Client-side only                        |
| Static files in `public/`      | Yes    | Copied to `out/` as-is                   |

## What Does NOT Work in Static Export

| Feature                        | Alternative                              |
|-------------------------------|------------------------------------------|
| API Routes (`app/api/`)        | Use external API or PHP backend          |
| `middleware.ts`                | Use `.htaccess` for redirects            |
| `headers()` / `cookies()`     | Not available — no server                |
| `redirect()` server-side      | Client redirect or `.htaccess`           |
| `revalidate` / ISR            | Rebuild the site to update content       |
| Server Actions                 | Use client-side form submission to API   |
| `next/image` optimization     | Use `unoptimized: true` or plain `<img>` |
| Dynamic routes without `generateStaticParams` | Must provide all params |
| `searchParams` in server components | Use client component with `useSearchParams` |
| `notFound()` with runtime logic | Static 404.html only                    |

## Dynamic Routes and `generateStaticParams`

Every route with `[brackets]` MUST export `generateStaticParams`. This tells Next.js
which pages to generate at build time.

```typescript
// app/[locale]/page.tsx — REQUIRED
export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

// app/[locale]/services/[slug]/page.tsx — REQUIRED
export function generateStaticParams() {
  const locales = ['ar', 'en'];
  const slugs = ['hajj', 'umrah', 'fatwa', 'marriage'];
  return locales.flatMap(locale =>
    slugs.map(slug => ({ locale, slug }))
  );
}
```

**If you forget this, the build will fail.**

## Build Output Structure

```
out/
├── ar/
│   ├── index.html          # Arabic homepage
│   ├── about/
│   │   └── index.html
│   ├── services/
│   │   └── index.html
│   └── contact/
│       └── index.html
├── en/
│   ├── index.html          # English homepage
│   ├── about/
│   │   └── index.html
│   ├── services/
│   │   └── index.html
│   └── contact/
│       └── index.html
├── _next/
│   ├── static/             # JS bundles, CSS
│   └── ...
├── images/                 # From public/images/
├── 404.html
└── index.html              # Root redirect to /ar/
```

## Handling the Root URL

The root `/` URL needs to redirect to `/ar/` (default locale). Options:

### Option A: Root page with client redirect
```typescript
// app/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => { router.replace('/ar/'); }, [router]);
  return null; // or a loading spinner
}
```

### Option B: .htaccess redirect (preferred for cPanel)
```apache
RewriteEngine On
RewriteRule ^$ /ar/ [R=302,L]
```

## .htaccess for cPanel

```apache
RewriteEngine On

# Redirect root to Arabic (default locale)
RewriteRule ^$ /ar/ [R=302,L]

# Handle 404 errors
ErrorDocument 404 /404.html

# Prevent directory listings
Options -Indexes

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

## Forms and User Input

Since there's no server, forms must submit to an external endpoint:

1. **PHP backend on same cPanel** — create a simple `api/contact.php`
2. **External service** — Formspree, EmailJS, Google Forms
3. **Government API** — if SIA has an existing backend

```typescript
// Client component for form submission
'use client';

async function handleSubmit(formData: FormData) {
  const response = await fetch('/api/contact.php', {
    method: 'POST',
    body: formData,
  });
  // handle response
}
```

## Content Updates

Since there's no ISR or server-side rendering, content updates require:

1. Edit translation files or page content
2. Run `npm run build`
3. Upload the `out/` directory to cPanel

For frequent content updates, consider a simple CI/CD pipeline:
- Push to GitHub → GitHub Action runs build → FTP/SFTP to cPanel

## Common Build Errors

### "Page with dynamic = 'force-dynamic' can't be exported"
Remove any `export const dynamic = 'force-dynamic'` from pages.

### "generateStaticParams is required for dynamic routes"
Add `generateStaticParams` to every `[param]` route.

### "Error: Image Optimization is not compatible with static export"
Ensure `images: { unoptimized: true }` is in `next.config.ts`.

### "middleware is not supported with static export"
Delete `middleware.ts`. Use `.htaccess` instead.
