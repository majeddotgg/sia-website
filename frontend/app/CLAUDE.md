# App Router Standards — SIA Website (Static Export)

Every file in `app/` produces static HTML at build time. There is no server at
runtime. Every pattern here must be compatible with `output: 'export'`.

---

## 1. Page Structure Template

Every page under `app/[locale]/` follows this exact structure:

```typescript
// app/[locale]/about/page.tsx
import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import { Container } from '@/components/layout/Container';
import { AboutIntro } from '@/components/sections/AboutIntro';
import type { Metadata } from 'next';

// ── 1. Static params (REQUIRED — build will fail without this) ──
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ── 2. Metadata (SEO) ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  };
}

// ── 3. Page component (always async, always default export) ──
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <Container>
      <AboutIntro locale={locale as Locale} dict={dict.about} />
    </Container>
  );
}
```

### Rules
- `generateStaticParams` is **mandatory** on every `[locale]` page.
- `params` is a **Promise** in Next.js 15+ — always `await` it.
- Page components are **async server components** — no `'use client'`.
- Pass `locale` and the relevant dictionary slice down to child components.
- Never hardcode user-facing text in page files.

---

## 2. Locale Layout Pattern

The locale layout wraps all pages under `app/[locale]/`. It sets `lang`, `dir`,
and loads the correct font stack.

```typescript
// app/[locale]/layout.tsx
import { locales, type Locale } from '@/lib/i18n/config';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Inter } from 'next/font/google';

// ── Fonts ──
const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

const englishFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-english',
  display: 'swap',
});

// ── Static params ──
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ── Layout ──
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? arabicFont.variable : englishFont.variable;

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontClass} antialiased`}>
        {/* Header, navigation, etc. go here */}
        <main>{children}</main>
        {/* Footer goes here */}
      </body>
    </html>
  );
}
```

### Root Layout

The root layout at `app/layout.tsx` becomes a minimal pass-through since the
locale layout handles `<html>` and `<body>`:

```typescript
// app/layout.tsx
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No <html> or <body> here — the locale layout provides them.
  // Next.js allows this: the nearest layout with <html> wins.
  return children;
}
```

### Root Page (Redirect)

The root `/` URL redirects visitors to the default locale:

```typescript
// app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/ar/');
}
```

> Note: `redirect()` works at build time for static export because it produces
> a `<meta http-equiv="refresh">` tag. Alternatively, use `.htaccess` on cPanel.

---

## 3. Dynamic Routes Pattern

For routes with parameters beyond `[locale]`, every combination must be
enumerated in `generateStaticParams`.

### Single Dynamic Segment

```typescript
// app/[locale]/services/[slug]/page.tsx
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getServices } from '@/lib/data/services';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';

// Generate ALL locale + slug combinations
export function generateStaticParams() {
  const services = getServices();
  return locales.flatMap((locale) =>
    services.map((service) => ({
      locale,
      slug: service.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = getServices().find((s) => s.slug === slug);

  return {
    title: `${dict.services.items[slug]?.title} | ${dict.common.siteName}`,
    description: dict.services.items[slug]?.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = getServices().find((s) => s.slug === slug);

  if (!service) return null;

  return (
    <article>
      <h1 className="text-start text-3xl font-bold">
        {dict.services.items[slug]?.title}
      </h1>
      <p className="mt-4 text-start text-zinc-600">
        {dict.services.items[slug]?.description}
      </p>
    </article>
  );
}
```

### Multiple Dynamic Segments

```typescript
// app/[locale]/news/[year]/[slug]/page.tsx
export function generateStaticParams() {
  const articles = getArticles();
  return locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      year: article.year.toString(),
      slug: article.slug,
    })),
  );
}
```

### Key Rule
If `generateStaticParams` doesn't return a combination, that page **will not
exist** in the build output. There is no fallback — missing params = 404.

---

## 4. Loading Dictionaries

### Dictionary Loader

```typescript
// lib/i18n/dictionaries.ts
import type { Locale } from './config';

const dictionaries = {
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
```

### Type-Safe Access

```typescript
// types/dictionary.ts
export interface Dictionary {
  common: {
    siteName: string;
    nav: {
      home: string;
      about: string;
      services: string;
      contact: string;
    };
    learnMore: string;
  };
  home: {
    meta: { title: string; description: string };
    hero: { title: string; subtitle: string; cta: string };
  };
  about: {
    meta: { title: string; description: string };
    heading: string;
    body: string;
  };
  // ...
}
```

### Passing to Components

Pass only the slice a component needs — never the entire dictionary:

```typescript
// Page loads full dictionary, passes relevant slices
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero gets only hero translations */}
      <HeroSection locale={locale as Locale} dict={dict.home.hero} />

      {/* Services grid gets services + common.learnMore */}
      <ServicesGrid
        locale={locale as Locale}
        dict={{
          ...dict.home.services,
          learnMore: dict.common.learnMore,
        }}
      />
    </>
  );
}
```

---

## 5. Static Data

All data is read at build time from local files. No runtime API calls.

### JSON Data Files

```typescript
// lib/data/services.ts
import servicesData from './services.json';

export interface Service {
  slug: string;
  icon: string;
  href: string;
}

export function getServices(): Service[] {
  return servicesData;
}
```

```json
// lib/data/services.json
[
  { "slug": "hajj", "icon": "kaaba", "href": "services/hajj" },
  { "slug": "umrah", "icon": "mosque", "href": "services/umrah" },
  { "slug": "fatwa", "icon": "book", "href": "services/fatwa" },
  { "slug": "marriage", "icon": "document", "href": "services/marriage" }
]
```

Service **titles and descriptions** live in the translation files, not in the
data file. The data file holds only locale-independent values (slugs, icons,
structural info).

### Pattern

```
lib/data/services.json     → slugs, icons, structural data
lib/i18n/dictionaries/ar.json → Arabic titles, descriptions
lib/i18n/dictionaries/en.json → English titles, descriptions
```

---

## 6. Metadata and SEO

### Basic Metadata

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.home.meta.title,
    description: dict.home.meta.description,
  };
}
```

### Full Metadata with Open Graph

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const baseUrl = 'https://sia.shj.ae';

  return {
    title: {
      default: dict.home.meta.title,
      template: `%s | ${dict.common.siteName}`,
    },
    description: dict.home.meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/`,
      languages: {
        ar: `${baseUrl}/ar/`,
        en: `${baseUrl}/en/`,
      },
    },
    openGraph: {
      title: dict.home.meta.title,
      description: dict.home.meta.description,
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_AE',
      type: 'website',
      siteName: dict.common.siteName,
    },
  };
}
```

### Title Template

Set a title template in the locale layout so child pages inherit it:

```typescript
// app/[locale]/layout.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: {
      template: `%s | ${dict.common.siteName}`,
      default: dict.common.siteName,
    },
  };
}
```

Child pages then set only their specific title:

```typescript
// app/[locale]/about/page.tsx
return { title: dict.about.meta.title };
// Renders as: "عن الدائرة | دائرة الشؤون الإسلامية"
```

---

## 7. Build Verification

After every build, run these checks:

```bash
# Build the project
npm run build

# Verify both locale directories exist
ls out/ar/
ls out/en/

# Verify a page has actual content (not empty shell)
grep -l "<h1" out/ar/index.html

# Verify all expected pages exist
ls out/ar/about/index.html
ls out/ar/services/index.html
ls out/ar/contact/index.html
ls out/en/about/index.html
ls out/en/services/index.html
ls out/en/contact/index.html

# Verify the root redirect exists
cat out/index.html

# Preview locally
npx serve out
```

### What to Look For
- `out/ar/` and `out/en/` both have matching page structures
- Each `index.html` contains pre-rendered content, not just a JS loader
- `_next/static/` contains the JS and CSS bundles
- No `_next/server/` directory (that would indicate SSR, not static)
- Images from `public/` are copied to `out/`

---

## 8. Common Page Patterns

### Static Page (About, Contact)

Simplest pattern — no dynamic segments beyond `[locale]`.

```typescript
// app/[locale]/contact/page.tsx
import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/components/sections/ContactForm';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.contact.meta.title };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <Container>
      <h1 className="text-start text-3xl font-bold">{dict.contact.heading}</h1>
      <ContactForm locale={locale as Locale} dict={dict.contact.form} />
    </Container>
  );
}
```

### List Page (Services Index)

Renders a grid/list of items. Data comes from local JSON + translations.

```typescript
// app/[locale]/services/page.tsx
import { getServices } from '@/lib/data/services';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { Container } from '@/components/layout/Container';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const services = getServices();

  return (
    <Container>
      <h1 className="text-start text-3xl font-bold">{dict.services.heading}</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            locale={locale as Locale}
            dict={{
              title: dict.services.items[service.slug].title,
              description: dict.services.items[service.slug].description,
              learnMore: dict.common.learnMore,
            }}
            href={service.href}
            icon={<span>{service.icon}</span>}
          />
        ))}
      </div>
    </Container>
  );
}
```

### Detail Page (Services/[slug])

See section 3 above for the full pattern. Key points:
- `generateStaticParams` returns every `locale × slug` combination
- Data lookup by slug happens at build time
- Missing slug renders nothing (or a fallback message)

### 404 Handling

```typescript
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-zinc-600">Page not found</p>
      <Link
        href="/ar/"
        className="rounded-lg bg-emerald-700 px-6 py-3 text-white hover:bg-emerald-800"
      >
        الرئيسية / Home
      </Link>
    </div>
  );
}
```

This generates `out/404.html`. Configure Apache to serve it:

```apache
# .htaccess
ErrorDocument 404 /404.html
```

---

## Route Map

```
app/
├── layout.tsx                        → Root layout (CSS import, pass-through)
├── page.tsx                          → Root redirect to /ar/
├── not-found.tsx                     → 404 page
├── globals.css                       → Tailwind + theme variables
└── [locale]/
    ├── layout.tsx                    → Sets lang, dir, fonts, header, footer
    ├── page.tsx                      → Homepage
    ├── about/
    │   └── page.tsx                  → About page
    ├── services/
    │   ├── page.tsx                  → Services listing
    │   └── [slug]/
    │       └── page.tsx              → Service detail
    ├── contact/
    │   └── page.tsx                  → Contact page
    └── news/                         → (future)
        ├── page.tsx                  → News listing
        └── [slug]/
            └── page.tsx              → News article
```

Every route produces two HTML pages — one in `out/ar/`, one in `out/en/`.

---

## Forbidden in app/ (Static Export)

- `app/api/` — No API routes
- `middleware.ts` — Does not run in static builds
- `export const dynamic = 'force-dynamic'` — Incompatible with export
- `export const revalidate = N` — No ISR in static builds
- `cookies()`, `headers()` — No request object at build time
- Server Actions (`'use server'`) — No server to execute them
