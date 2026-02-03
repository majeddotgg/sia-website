# CLAUDE.md — SIA Website Project Context

## Project Overview

**Department of Islamic Affairs - Sharjah (SIA)** government website.
Bilingual Arabic/English. Static export deployed to cPanel (no Node.js runtime).

## Critical Constraints

### 1. STATIC EXPORT ONLY
- `output: 'export'` in next.config.ts — every page pre-rendered to HTML at build
- NO server components with runtime logic, NO API routes, NO middleware
- NO `next/image` optimization — must use `unoptimized: true` or plain `<img>`
- NO `headers()`, `cookies()`, `searchParams` as server-side features
- NO `revalidate`, `fetch` cache, or ISR — everything is build-time only
- Build output goes to `out/` directory, uploaded directly to cPanel

### 2. BILINGUAL (Arabic + English)
- Arabic is the PRIMARY language (RTL, default)
- English is the SECONDARY language (LTR)
- Route structure: `/ar/page` and `/en/page` via `[locale]` param
- Every page must have both language versions
- `dir="rtl"` / `dir="ltr"` set on `<html>` per locale
- Arabic font: IBM Plex Sans Arabic (or similar with good Arabic support)
- All text must come from translation files, never hardcoded

### 3. CPANEL DEPLOYMENT
- Static files only: HTML, CSS, JS, images, fonts
- No serverless functions, no edge runtime, no Node.js
- `.htaccess` needed for routing (clean URLs, locale redirects, 404)
- All assets must use relative paths or be configured for the deployment domain

### 4. RTL SUPPORT
- Use Tailwind's `rtl:` and `ltr:` variants for directional styles
- Use logical CSS properties where possible (`ps-4` not `pl-4`, `ms-4` not `ml-4`)
- Test every component in both directions
- Icons with directional meaning (arrows, chevrons) must flip in RTL

## Tech Stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| Framework   | Next.js 16.1.6 (App Router)         |
| Language    | TypeScript 5 (strict mode)           |
| Styling     | Tailwind CSS v4 (@tailwindcss/postcss) |
| React       | React 19.2.3                         |
| Forms       | react-hook-form + zod + @hookform/resolvers |
| Linting     | ESLint 9 (flat config)              |
| Build       | Static export → `out/` directory     |
| Hosting     | cPanel (Apache, PHP available)       |

## Project Structure

```
frontend/
├── app/
│   ├── [locale]/           # Dynamic locale segment (ar/en)
│   │   ├── layout.tsx      # Per-locale layout (sets dir, lang, fonts)
│   │   ├── page.tsx        # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── layout.tsx          # Root layout (minimal, wraps locale layout)
│   ├── globals.css         # Global styles + Tailwind import
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ui/                 # Generic UI components (Button, Card, etc.)
│   ├── layout/             # Header, Footer, Sidebar, Navigation
│   ├── sections/           # Page-specific sections (Hero, Services, etc.)
│   └── forms/              # Form components (see components/forms/CLAUDE.md)
│       ├── ui/             # Reusable form inputs (Input, Select, etc.)
│       └── services/       # Service-specific forms (HajjForm, etc.)
├── lib/
│   ├── i18n/
│   │   ├── config.ts       # Locale list, default locale, types
│   │   ├── dictionaries.ts # Dictionary loader
│   │   └── dictionaries/
│   │       ├── ar.json     # Arabic translations
│   │       └── en.json     # English translations
│   ├── schemas/            # Zod validation schemas
│   │   ├── common.ts       # Shared schemas (phone, email, Emirates ID)
│   │   ├── feedback.ts     # Feedback/complaints schemas
│   │   └── index.ts        # Schema exports
│   └── utils.ts            # Shared utility functions
├── types/
│   └── index.ts            # Shared TypeScript types
├── public/
│   ├── images/             # Static images
│   ├── fonts/              # Self-hosted fonts (if needed)
│   └── favicon.ico
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── package.json
├── CLAUDE.md               # This file
├── CODING_STANDARDS.md
├── STATIC_EXPORT_GUIDE.md
└── DEVELOPMENT_CHECKLIST.md
```

## Key Patterns

### Static Params (Required for Static Export)
Every `[locale]` page MUST export `generateStaticParams`:

```typescript
export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}
```

### Translation Loading
```typescript
// lib/i18n/dictionaries.ts
const dictionaries = {
  ar: () => import('./dictionaries/ar.json').then(m => m.default),
  en: () => import('./dictionaries/en.json').then(m => m.default),
};

export const getDictionary = async (locale: 'ar' | 'en') =>
  dictionaries[locale]();
```

### Component Pattern
```typescript
// Components receive locale and dictionary as props
interface Props {
  locale: 'ar' | 'en';
  dict: Dictionary;
}
```

### RTL-Aware Styling
```typescript
// Use logical properties in Tailwind
<div className="ps-4 pe-6 ms-2 me-4">  // NOT pl-4 pr-6 ml-2 mr-4
<div className="rtl:space-x-reverse">   // For flex gaps
<Icon className="rtl:rotate-180" />      // Flip directional icons
```

## Common Pitfalls — DO NOT

1. **DO NOT** use `useSearchParams()`, `usePathname()` from `next/navigation` for server logic
2. **DO NOT** use `next/image` without `unoptimized: true` in config
3. **DO NOT** use `fetch()` with revalidation options
4. **DO NOT** create API routes (`app/api/`)
5. **DO NOT** use `middleware.ts` — it does not run in static export
6. **DO NOT** use `redirect()` server-side — use client-side redirects or `.htaccess`
7. **DO NOT** hardcode any user-facing text — always use dictionary
8. **DO NOT** use `pl-*`, `pr-*`, `ml-*`, `mr-*` — use `ps-*`, `pe-*`, `ms-*`, `me-*`
9. **DO NOT** forget `generateStaticParams` on any dynamic route
10. **DO NOT** use `next/font` loader if fonts need Arabic subsets not available — self-host instead

## Quick Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build & Export
npm run build        # Build + static export to out/

# Lint
npm run lint         # Run ESLint

# Preview static build (requires serve or similar)
npx serve out        # Serve the static build locally
```

## Build Verification

After every build, verify:
1. `out/` directory contains `ar/` and `en/` subdirectories
2. Each page has an `index.html` file
3. No server-only code errors in build output
4. All images and assets are present in `out/`

## Environment

- No `.env` files needed for static export (no runtime secrets)
- Build-time env vars use `NEXT_PUBLIC_` prefix only
- Domain/base path configured in `next.config.ts` if needed

## Design System (TBD)

- Primary color: Government green (to be confirmed with SIA branding)
- Typography: Arabic-first font stack
- Spacing: Tailwind defaults
- Breakpoints: mobile-first (sm → md → lg → xl)
- Dark mode: Not planned for initial release

## File Naming Conventions

- Components: PascalCase (`ServiceCard.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Types: PascalCase for types/interfaces (`ServiceItem`)
- Translation keys: dot-notation (`home.hero.title`)
- CSS: Tailwind utility classes only — no custom CSS files per component

---

## Forms Architecture

**IMPORTANT**: This project heavily relies on forms for services. Follow the patterns below.

### Key Files
- **Guide**: `components/forms/CLAUDE.md` — Full forms documentation
- **UI Components**: `components/forms/ui/` — Reusable form inputs
- **Schemas**: `lib/schemas/` — Zod validation schemas
- **Skill Reference**: `/Users/majed/.claude/skills/react-hook-form-zod`

### Quick Pattern

```typescript
// 1. Define schema (lib/schemas/myform.ts)
import { z } from 'zod';

export const mySchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('البريد غير صالح'),
});

export type MyFormData = z.infer<typeof mySchema>;

// 2. Create form component (components/forms/services/MyForm.tsx)
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mySchema, type MyFormData } from '@/lib/schemas/myform';
import { FormField, Input, SubmitButton } from '@/components/forms';

export function MyForm({ dict }: { dict: FormDict }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MyFormData>({
    resolver: zodResolver(mySchema),
    defaultValues: { name: '', email: '' }, // REQUIRED!
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label={dict.name} error={errors.name?.message} required>
        {({ id, hasError }) => (
          <Input id={id} {...register('name')} hasError={hasError} />
        )}
      </FormField>
      <SubmitButton loading={isSubmitting}>{dict.submit}</SubmitButton>
    </form>
  );
}
```

### Form Rules
- ✅ Always set `defaultValues` for all fields
- ✅ Use `z.infer<typeof schema>` for type inference
- ✅ All labels/errors from dictionary (no hardcoded text)
- ✅ Use `mode: 'onBlur'` for validation
- ✅ Handle loading state with `isSubmitting`
- ❌ Never skip `defaultValues` (causes React warnings)
- ❌ Never use index as key in `useFieldArray`

### Form Submission (Static Export)
Since this is static export, forms submit to external backends:
- **Simple forms**: Formspree, Getform
- **Complex forms**: Custom API endpoint
- **Fallback**: mailto: links

See `components/forms/CLAUDE.md` for full documentation.
