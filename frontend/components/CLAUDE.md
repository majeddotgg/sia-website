# Component Standards — SIA Website

This guide governs every component in this project. Read it fully before creating
or modifying any component.

---

## 1. Architecture Principles

### Single Responsibility
Each component does ONE thing. If a component handles layout AND data fetching AND
user interaction, split it. A `ServiceCard` renders a card — it does not fetch
services or manage selection state.

### Composition Over Complexity
Build complex UI from small, focused pieces:

```typescript
// GOOD: composed from simple parts
<Card variant="bordered">
  <CardHeader>
    <ServiceIcon name={service.icon} />
    <h3>{service.title}</h3>
  </CardHeader>
  <CardBody>{service.description}</CardBody>
  <CardFooter>
    <Button variant="primary">{dict.common.learnMore}</Button>
  </CardFooter>
</Card>

// BAD: monolithic component with dozens of props
<ServiceCard
  icon={service.icon}
  title={service.title}
  description={service.description}
  showFooter={true}
  footerButtonText={dict.common.learnMore}
  footerButtonVariant="primary"
  headerLayout="horizontal"
/>
```

### Server vs Client — Static Export Context
In static export, server components run at **build time only**. There is no
request-time server. Both server and client components end up as static HTML
with JS bundles for hydration.

**Default to server components.** Only add `'use client'` when you need:
- React hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
- DOM event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser APIs (`window`, `localStorage`, `IntersectionObserver`)
- Third-party client libraries

**Server components CAN:**
- Use `async/await` at the component level
- Import and call `getDictionary()` directly
- Access `params` from the route

**Server components CANNOT:**
- Use hooks or event handlers
- Access `window` or `document`
- Use `useSearchParams()` or `usePathname()`

---

## 2. File Organization

```
components/
├── ui/                  # Generic, reusable, no business logic
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   └── Spinner.tsx
├── layout/              # Site-wide structural components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── MobileMenu.tsx
│   ├── LanguageSwitcher.tsx
│   └── Container.tsx
├── sections/            # Page-specific composite sections
│   ├── HeroSection.tsx
│   ├── ServicesGrid.tsx
│   ├── ContactForm.tsx
│   └── AboutIntro.tsx
└── CLAUDE.md            # This file
```

### Naming Rules
- **File name** = **Component name** = **PascalCase** (`ServiceCard.tsx`)
- One component per file (exception: tightly-coupled sub-components like Card + CardHeader)
- No `index.ts` barrel exports unless a folder has 5+ public components
- Test files sit next to components: `Button.test.tsx`
- No `.module.css` files — Tailwind only

---

## 3. Component Templates

### 3a. Button Component

```typescript
// components/ui/Button.tsx
import { type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:ring-emerald-600',
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
  outline:
    'border border-emerald-700 text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-600 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
```

**Usage:**
```typescript
<Button variant="primary" size="lg" onClick={handleClick}>
  {dict.common.submit}
</Button>

<Button variant="outline" loading={isSubmitting} disabled={!isValid}>
  {dict.common.save}
</Button>
```

---

### 3b. Input Component

```typescript
// components/ui/Input.tsx
'use client';

import { forwardRef, useId, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, helperText, className = '', id, ...props }, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-start text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            'block w-full rounded-lg border bg-white px-4 py-2.5',
            'text-start text-base text-zinc-900',
            'placeholder:text-zinc-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-zinc-900 dark:text-zinc-100',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-zinc-300 focus:ring-emerald-600 dark:border-zinc-600',
            className,
          ].join(' ')}
          {...props}
        />

        {error && (
          <p id={errorId} className="text-start text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-start text-sm text-zinc-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
```

**Why `'use client'`:** Uses `forwardRef` and `useId` — both require client context.

**Usage:**
```typescript
<Input
  label={dict.contact.nameLabel}
  placeholder={dict.contact.namePlaceholder}
  error={errors.name}
  required
/>

<Input
  label={dict.contact.emailLabel}
  type="email"
  helperText={dict.contact.emailHelper}
  ref={emailRef}
/>
```

---

### 3c. Card Component

```typescript
// components/ui/Card.tsx

type CardVariant = 'default' | 'bordered' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white dark:bg-zinc-900',
  bordered: 'bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700',
  elevated: 'bg-white shadow-md dark:bg-zinc-900',
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'bordered',
  padding = 'md',
  className = '',
  children,
}: CardProps) {
  return (
    <div
      className={[
        'rounded-xl',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
```

**Usage:**
```typescript
<Card variant="elevated" padding="lg">
  <h2 className="text-xl font-semibold">{dict.about.title}</h2>
  <p className="mt-2 text-zinc-600">{dict.about.description}</p>
</Card>

<Card variant="bordered" padding="none">
  <img src="/images/banner.jpg" alt={dict.home.bannerAlt} className="rounded-t-xl" />
  <div className="p-6">
    <p>{dict.home.bannerText}</p>
  </div>
</Card>
```

---

### 3d. Bilingual Component Pattern (ServiceCard)

```typescript
// components/sections/ServiceCard.tsx
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/types';

interface ServiceCardDict {
  title: string;
  description: string;
  learnMore: string;
}

interface ServiceCardProps {
  locale: Locale;
  dict: ServiceCardDict;
  href: string;
  icon: React.ReactNode;
}

export function ServiceCard({ locale, dict, href, icon }: ServiceCardProps) {
  return (
    <Card variant="bordered" padding="lg" className="flex flex-col gap-4">
      {/* Icon: no directional concerns */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
        {icon}
      </div>

      {/* Text: text-start ensures correct alignment in both RTL and LTR */}
      <h3 className="text-start text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {dict.title}
      </h3>
      <p className="text-start text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {dict.description}
      </p>

      {/* Link with directional arrow */}
      <Link href={`/${locale}/${href}`} className="mt-auto">
        <Button variant="outline" size="sm">
          {dict.learnMore}
          <svg
            className="h-4 w-4 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </Link>
    </Card>
  );
}
```

**Usage in a page (server component):**
```typescript
// app/[locale]/page.tsx
import { getDictionary } from '@/lib/i18n/dictionaries';
import { ServiceCard } from '@/components/sections/ServiceCard';
import type { Locale } from '@/types';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {dict.home.services.map((service, index) => (
        <ServiceCard
          key={index}
          locale={locale}
          dict={{
            title: service.title,
            description: service.description,
            learnMore: dict.common.learnMore,
          }}
          href={service.href}
          icon={<span>{service.icon}</span>}
        />
      ))}
    </section>
  );
}
```

---

## 4. Props Patterns

### Standard Interface
```typescript
// Name: [ComponentName]Props
interface ButtonProps {
  variant?: ButtonVariant;  // Optional with default
  size?: ButtonSize;        // Optional with default
  loading?: boolean;        // Optional flag
  children: React.ReactNode; // Required content
}
```

### Extending HTML Attributes
```typescript
// Inherit all native attributes, add custom ones
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

// For components that wrap a <div>
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}
```

### Bilingual Props
```typescript
// Always pass locale + the specific dictionary slice needed
interface ServiceGridProps {
  locale: Locale;
  dict: {
    heading: string;
    services: Array<{
      title: string;
      description: string;
    }>;
  };
}
```

### Props with Children
```typescript
// Explicit children
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Optional children
interface AlertProps {
  title: string;
  children?: React.ReactNode;
}
```

### Event Handler Props
```typescript
// Use React's built-in types
interface SearchProps {
  onSearch: (query: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
```

---

## 5. TypeScript Conventions

### Interface vs Type
- **`interface`** for component props — they merge and extend naturally
- **`type`** for unions, primitives, computed types, and utility types

```typescript
// Interface for props
interface ButtonProps {
  variant?: ButtonVariant;
}

// Type for unions and aliases
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type Locale = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';
```

### Never Use `any`
```typescript
// BAD
function handleData(data: any) { ... }

// GOOD
function handleData(data: unknown) {
  if (typeof data === 'string') { ... }
}

// GOOD: define the shape
interface ApiResponse {
  success: boolean;
  data: ServiceItem[];
}
```

### Shared Types
Place shared types in `types/index.ts`:

```typescript
// types/index.ts
export type Locale = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface Dictionary {
  common: CommonDict;
  home: HomeDict;
  about: AboutDict;
  // ...
}

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}
```

---

## 6. RTL/LTR Patterns

### Text Alignment
```typescript
// ALWAYS
className="text-start"   // Aligns to start of reading direction
className="text-end"     // Aligns to end of reading direction

// NEVER
className="text-left"    // Hardcoded LTR assumption
className="text-right"   // Hardcoded LTR assumption
```

### Spacing (Padding & Margin)
```typescript
// ALWAYS use logical properties
className="ps-4"    // padding-inline-start (left in LTR, right in RTL)
className="pe-6"    // padding-inline-end
className="ms-2"    // margin-inline-start
className="me-4"    // margin-inline-end

// NEVER
className="pl-4"    // Physical left — breaks in RTL
className="pr-6"    // Physical right — breaks in RTL
```

### Positioning
```typescript
// ALWAYS
className="start-0"    // inset-inline-start
className="end-4"      // inset-inline-end

// NEVER
className="left-0"     // Physical — breaks in RTL
className="right-4"    // Physical — breaks in RTL
```

### Flexbox and Spacing
```typescript
// Horizontal flex with gap — works automatically with RTL
<div className="flex items-center gap-3">

// Horizontal flex with space-x — NEEDS rtl:space-x-reverse
<div className="flex items-center space-x-4 rtl:space-x-reverse">

// If you need to explicitly reverse direction:
<div className="flex flex-row rtl:flex-row-reverse">
```

### Directional Icons
```typescript
// Arrows, chevrons, and "forward" icons must flip in RTL
<ChevronIcon className="h-5 w-5 rtl:rotate-180" />

// "Back" arrows also flip
<ArrowLeftIcon className="h-5 w-5 rtl:rotate-180" />

// Non-directional icons do NOT flip (checkmarks, close, search, etc.)
<CheckIcon className="h-5 w-5" />
```

### Borders
```typescript
// Directional borders — use rtl:/ltr: variants
className="ltr:border-l-4 rtl:border-r-4 border-emerald-600"

// Or use logical border properties if supported
className="border-s-4 border-emerald-600"  // border-inline-start
```

### Complete RTL-Aware Component Example
```typescript
// A notification banner that reads correctly in both directions
function NotificationBanner({
  icon,
  message,
  onDismiss,
}: {
  icon: React.ReactNode;
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border-s-4 border-emerald-600 bg-emerald-50 p-4 dark:bg-emerald-950">
      {/* Icon at reading-start */}
      <div className="shrink-0">{icon}</div>

      {/* Text fills the middle */}
      <p className="flex-1 text-start text-sm text-zinc-800 dark:text-zinc-200">
        {message}
      </p>

      {/* Dismiss button at reading-end */}
      <button
        onClick={onDismiss}
        className="shrink-0 text-zinc-400 hover:text-zinc-600"
        aria-label="Dismiss"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
```

---

## 7. Styling Standards

### Tailwind Only
No CSS modules. No inline `style` props (except for truly dynamic values like
percentage widths from data). All styling through Tailwind utility classes.

### Color Palette
Use the project's semantic colors (defined in `globals.css` `@theme`):

```typescript
// Primary actions — emerald (government green)
className="bg-emerald-700 text-white hover:bg-emerald-800"

// Neutral text — zinc scale
className="text-zinc-900 dark:text-zinc-100"    // Primary text
className="text-zinc-600 dark:text-zinc-400"    // Secondary text
className="text-zinc-400 dark:text-zinc-500"    // Muted/placeholder

// Backgrounds
className="bg-white dark:bg-zinc-900"           // Surface
className="bg-zinc-50 dark:bg-zinc-950"         // Page background

// Danger/errors
className="text-red-600 border-red-500"

// Success
className="text-emerald-600 border-emerald-500"
```

### Responsive Design (Mobile-First)
```typescript
// Base = mobile. Add breakpoints for larger screens.
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="px-4 sm:px-6 lg:px-8"
className="hidden md:block"          // Show only on medium+
className="block md:hidden"          // Show only on mobile
```

### Interactive States
Every clickable element must have visible hover, focus, and disabled states:

```typescript
className={[
  // Base
  'rounded-lg px-4 py-2 font-medium',
  // Hover
  'hover:bg-emerald-800',
  // Focus — ALWAYS use focus-visible (not focus)
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2',
  // Active/pressed
  'active:scale-[0.98]',
  // Disabled
  'disabled:pointer-events-none disabled:opacity-50',
  // Transition
  'transition-colors duration-200',
].join(' ')}
```

### Class String Organization
When classes are long, use an array joined with space:

```typescript
// Readable multi-line
<div
  className={[
    'flex items-center gap-4',
    'rounded-xl border border-zinc-200 p-6',
    'bg-white dark:bg-zinc-900',
    'transition-shadow hover:shadow-md',
  ].join(' ')}
>
```

---

## 8. Server vs Client Components

### Server Component (Default)
```typescript
// components/sections/AboutIntro.tsx
// No 'use client' directive — this is a server component

import { Card } from '@/components/ui/Card';
import type { Locale } from '@/types';

interface AboutIntroProps {
  locale: Locale;
  dict: {
    heading: string;
    body: string;
  };
}

export function AboutIntro({ locale, dict }: AboutIntroProps) {
  return (
    <section className="py-16">
      <Card variant="default" padding="lg">
        <h2 className="text-start text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {dict.heading}
        </h2>
        <p className="mt-4 text-start leading-relaxed text-zinc-600 dark:text-zinc-400">
          {dict.body}
        </p>
      </Card>
    </section>
  );
}
```

### Client Component (When Required)
```typescript
// components/layout/MobileMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/types';

interface MobileMenuProps {
  locale: Locale;
  dict: {
    menu: string;
    close: string;
    links: Array<{ label: string; href: string }>;
  };
}

export function MobileMenu({ locale, dict }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 md:hidden"
        aria-label={dict.menu}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-900 md:hidden">
          <div className="flex items-center justify-between p-4">
            <span className="text-lg font-bold">{dict.menu}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2"
              aria-label={dict.close}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            {dict.links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}/${link.href}`}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-start text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
```

### When to Use Client Components — Decision Tree

```
Does it use useState/useEffect/useRef?     → 'use client'
Does it have onClick/onChange/onSubmit?     → 'use client'
Does it use window/document/localStorage?  → 'use client'
Does it use useSearchParams/usePathname?   → 'use client'
Does it use a third-party client library?  → 'use client'
None of the above?                         → Server component (no directive)
```

---

## 9. Accessibility Checklist

### Semantic HTML
```typescript
// Use the correct element for the job
<button>         // Clickable actions — NEVER <div onClick>
<a href="...">   // Navigation links
<nav>            // Navigation regions
<main>           // Primary content area (one per page)
<section>        // Thematic grouping with a heading
<article>        // Self-contained content
<aside>          // Tangentially related content
<header>         // Introductory content
<footer>         // Footer content
<h1> to <h6>     // Headings in order — never skip levels
```

### ARIA Attributes
```typescript
// Label icon-only buttons
<button aria-label={dict.common.close}>
  <XIcon />
</button>

// Mark decorative images
<svg aria-hidden="true">...</svg>

// Live regions for dynamic content
<div role="alert">{errorMessage}</div>

// Expanded state for menus
<button aria-expanded={isOpen} aria-controls="mobile-menu">
  {dict.common.menu}
</button>
<nav id="mobile-menu" hidden={!isOpen}>...</nav>
```

### Keyboard Navigation
```typescript
// All interactive elements must be reachable via Tab
// Custom interactive elements need keyboard handlers:

<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
```

Prefer native elements (`<button>`, `<a>`, `<input>`) — they get keyboard
support for free.

### Focus Indicators
```typescript
// ALWAYS use focus-visible (not focus) — avoids showing ring on mouse click
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
```

### Images
```typescript
// All images need alt text — translated via dictionary
<img src="/images/mosque.jpg" alt={dict.home.mosqueImageAlt} />

// Decorative images that add no information
<img src="/images/pattern.svg" alt="" aria-hidden="true" />
```

---

## 10. Common Patterns

### Container/Wrapper
```typescript
// components/layout/Container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={['mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className].join(' ')}>
      {children}
    </div>
  );
}
```

### List Rendering
```typescript
// Always use a stable, unique key — never array index if items can reorder
<ul className="flex flex-col gap-2">
  {services.map((service) => (
    <li key={service.id}>
      <ServiceCard locale={locale} dict={service} href={service.href} icon={service.icon} />
    </li>
  ))}
</ul>
```

### Conditional Rendering
```typescript
// Short-circuit for show/hide
{error && <p className="text-red-600">{error}</p>}

// Ternary for either/or
{isLoading ? <Spinner /> : <Content />}

// Early return for guard clauses
export function UserProfile({ user }: { user: User | null }) {
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

### Language Switcher
```typescript
// components/layout/LanguageSwitcher.tsx
import Link from 'next/link';
import type { Locale } from '@/types';

interface LanguageSwitcherProps {
  locale: Locale;
  /** Current path without locale prefix, e.g. "/about" */
  currentPath: string;
  dict: { switchLabel: string };
}

export function LanguageSwitcher({ locale, currentPath, dict }: LanguageSwitcherProps) {
  const targetLocale: Locale = locale === 'ar' ? 'en' : 'ar';

  return (
    <Link
      href={`/${targetLocale}${currentPath}`}
      className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      lang={targetLocale}
      dir={targetLocale === 'ar' ? 'rtl' : 'ltr'}
    >
      {dict.switchLabel}
    </Link>
  );
}
```

### Section Wrapper
```typescript
// Consistent section spacing across all pages
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={['py-12 md:py-16 lg:py-20', className].join(' ')}>
      {children}
    </section>
  );
}
```

---

## Quick Reference: Do / Don't

| Do | Don't |
|----|-------|
| `text-start` / `text-end` | `text-left` / `text-right` |
| `ps-4` / `pe-4` / `ms-4` / `me-4` | `pl-4` / `pr-4` / `ml-4` / `mr-4` |
| `start-0` / `end-0` | `left-0` / `right-0` |
| `<button onClick>` | `<div onClick>` |
| `focus-visible:ring-2` | `focus:ring-2` |
| `aria-label` on icon buttons | Icon button with no label |
| Server component (default) | `'use client'` everywhere |
| `interface ButtonProps` | `type ButtonProps = any` |
| `gap-4` for flex/grid spacing | `space-x-4` without `rtl:space-x-reverse` |
| Translation dictionary strings | Hardcoded Arabic/English text |
| `import type { X }` for type-only | `import { X }` when X is only a type |
