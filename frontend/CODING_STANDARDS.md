# Coding Standards — SIA Website

## TypeScript

### Strict Mode
TypeScript strict mode is enabled. Never use `any` — use `unknown` and narrow, or define proper types.

### Type Definitions
```typescript
// Place shared types in types/index.ts
export type Locale = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

// Component prop types: defined inline or co-located
interface ServiceCardProps {
  locale: Locale;
  title: string;
  description: string;
  icon: React.ReactNode;
}
```

### Imports
```typescript
// 1. React/Next.js imports
import { type Metadata } from 'next';

// 2. Third-party imports
import clsx from 'clsx';

// 3. Internal imports (use @ alias)
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Button } from '@/components/ui/Button';

// 4. Types (use 'import type' when importing only types)
import type { Locale } from '@/types';
```

### Naming Conventions

| Element          | Convention    | Example                     |
|-----------------|---------------|-----------------------------|
| Component files  | PascalCase    | `ServiceCard.tsx`           |
| Component names  | PascalCase    | `export function ServiceCard` |
| Utility files    | camelCase     | `formatDate.ts`             |
| Utility functions| camelCase     | `export function formatDate` |
| Constants        | UPPER_SNAKE   | `const MAX_ITEMS = 10`      |
| Type/Interface   | PascalCase    | `interface ServiceItem`     |
| Enum values      | PascalCase    | `enum Status { Active }`    |
| Translation keys | dot.notation  | `home.hero.title`           |
| CSS variables    | kebab-case    | `--color-primary`           |

## React / Next.js

### Component Structure
```typescript
// 1. Imports
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/types';

// 2. Types (if not imported)
interface PageProps {
  params: Promise<{ locale: Locale }>;
}

// 3. Static generation (required for all [locale] pages)
export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

// 4. Metadata (optional)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.page.title };
}

// 5. Component (default export)
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main>
      <h1>{dict.page.heading}</h1>
    </main>
  );
}
```

### Server vs Client Components
- **Default to Server Components** (no `'use client'` directive)
- Only add `'use client'` when the component needs:
  - `useState`, `useEffect`, `useRef`, or other hooks
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser-only APIs (`window`, `localStorage`)
- Client components receive data via props — they do NOT fetch data

### Props Pattern for Bilingual Components
```typescript
// Server component loads dictionary, passes to client
// app/[locale]/page.tsx (server)
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <HeroSection locale={locale} dict={dict.home.hero} />;
}

// components/sections/HeroSection.tsx (can be server or client)
interface HeroSectionProps {
  locale: Locale;
  dict: {
    title: string;
    subtitle: string;
    cta: string;
  };
}
```

## Tailwind CSS v4

### RTL/LTR Rules
```typescript
// ALWAYS use logical properties
className="ps-4 pe-6"     // padding-inline-start, padding-inline-end
className="ms-2 me-4"     // margin-inline-start, margin-inline-end
className="start-0"       // inset-inline-start (not left-0)
className="end-0"         // inset-inline-end (not right-0)
className="text-start"    // text-align: start (not text-left)
className="text-end"      // text-align: end (not text-right)
className="float-start"   // float: inline-start

// For cases where logical properties don't apply, use rtl:/ltr: variants
className="rtl:space-x-reverse"
className="rtl:rotate-180"    // Flip arrows/chevrons
className="ltr:border-l-4 rtl:border-r-4"  // When no logical equivalent
```

### Class Organization
Order Tailwind classes by category:
1. Layout (`flex`, `grid`, `block`)
2. Positioning (`relative`, `absolute`, `z-10`)
3. Box model (`w-full`, `p-4`, `m-2`)
4. Typography (`text-lg`, `font-bold`)
5. Visual (`bg-white`, `border`, `rounded`)
6. Interactive (`hover:`, `focus:`, `transition`)
7. Responsive (`sm:`, `md:`, `lg:`)
8. RTL/LTR (`rtl:`, `ltr:`)

### Responsive Design
Mobile-first approach:
```typescript
// Base = mobile, then scale up
className="text-sm md:text-base lg:text-lg"
className="px-4 md:px-8 lg:px-16"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## Translation Files

### Structure
```json
{
  "common": {
    "nav": {
      "home": "الرئيسية",
      "about": "عن الدائرة",
      "services": "الخدمات",
      "contact": "تواصل معنا"
    },
    "footer": { ... },
    "languageSwitcher": "English"
  },
  "home": {
    "hero": {
      "title": "...",
      "subtitle": "..."
    }
  }
}
```

### Rules
- Keys are always in English, dot-notation style
- Arabic file is the source of truth (primary language)
- English file must have identical key structure
- No HTML in translation values — use components for formatting
- Pluralization: use separate keys (`item_one`, `item_many`)

## File Organization

### One Component Per File
Each component gets its own file. No barrel exports (`index.ts`) unless a directory has 5+ components.

### Co-location
Keep related files together:
```
components/
  layout/
    Header.tsx           # Component
    Header.test.tsx      # Tests (when added)
    MobileMenu.tsx       # Sub-component used only by Header
```

## Accessibility

- All images must have `alt` text (translated)
- Interactive elements must be keyboard-accessible
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- Color contrast must meet WCAG AA (4.5:1 for normal text)
- `lang` attribute must match page locale
- `dir` attribute must match locale direction
