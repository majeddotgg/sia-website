# Development Checklist — SIA Website

Use this checklist before and after every task.

---

## Before Starting a Task

- [ ] Read `CLAUDE.md` for project constraints
- [ ] Understand which pages/components are affected
- [ ] Check if translation keys need to be added to both `ar.json` and `en.json`
- [ ] Identify if the change touches any dynamic route (needs `generateStaticParams`)

---

## After Writing Code

### Static Export Compatibility
- [ ] No `'use server'` directives or Server Actions
- [ ] No API routes created in `app/api/`
- [ ] No `middleware.ts` file
- [ ] No `headers()`, `cookies()`, or `redirect()` server-side calls
- [ ] No `dynamic = 'force-dynamic'` exports
- [ ] No `revalidate` or ISR configuration
- [ ] All dynamic `[param]` routes have `generateStaticParams`
- [ ] Images use `<img>` or `<Image>` with `unoptimized` config enabled

### Bilingual / i18n
- [ ] All user-facing text comes from translation dictionaries (no hardcoded strings)
- [ ] Both `ar.json` and `en.json` have the new keys with identical structure
- [ ] Page renders correctly in Arabic (RTL)
- [ ] Page renders correctly in English (LTR)
- [ ] Language switcher link points to the equivalent page in the other locale
- [ ] `<html lang="ar">` / `<html lang="en">` is set correctly
- [ ] `<html dir="rtl">` / `<html dir="ltr">` is set correctly

### RTL Layout
- [ ] No `pl-*`, `pr-*`, `ml-*`, `mr-*` — use `ps-*`, `pe-*`, `ms-*`, `me-*` instead
- [ ] No `left-*`, `right-*` — use `start-*`, `end-*` instead
- [ ] No `text-left`, `text-right` — use `text-start`, `text-end` instead
- [ ] Directional icons (arrows, chevrons) flip correctly with `rtl:rotate-180`
- [ ] Flex/grid layouts read correctly in both directions
- [ ] `rtl:space-x-reverse` added where `space-x-*` is used

### Accessibility
- [ ] All images have translated `alt` text
- [ ] Semantic HTML used (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`)
- [ ] Interactive elements are keyboard-accessible
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA (4.5:1 normal text, 3:1 large text)

### Code Quality
- [ ] TypeScript has no errors (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] No `any` types
- [ ] No unused imports or variables
- [ ] Components follow project naming conventions (PascalCase)

---

## Before Committing

- [ ] `npm run build` succeeds with no errors
- [ ] `out/` directory has both `ar/` and `en/` subdirectories
- [ ] Spot-check: open an HTML file from `out/` to verify content
- [ ] No secrets, API keys, or `.env` files in the commit
- [ ] No `node_modules/`, `.next/`, or `out/` in the commit

---

## Before Deploying to cPanel

- [ ] Build is fresh (`npm run build` just ran)
- [ ] `.htaccess` file is in the root of `out/` or deployment directory
- [ ] Test locally with `npx serve out` — check key pages
- [ ] Verify `/ar/` loads Arabic content with RTL layout
- [ ] Verify `/en/` loads English content with LTR layout
- [ ] Verify root `/` redirects to `/ar/`
- [ ] Verify 404 page works for invalid URLs
- [ ] Verify language switcher works on all pages
- [ ] Check all images and fonts load correctly
- [ ] Test on mobile viewport
