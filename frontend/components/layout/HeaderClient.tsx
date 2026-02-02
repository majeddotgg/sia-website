'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';

interface NavLink {
  label: string;
  href: string;
}

interface HeaderClientProps {
  locale: string;
  dir: 'rtl' | 'ltr';
  siteName: string;
  navLinks: NavLink[];
  openMenuLabel: string;
  closeMenuLabel: string;
  languageSwitcher: ReactNode;
}

export function HeaderClient({
  locale,
  dir,
  siteName,
  navLinks,
  openMenuLabel,
  closeMenuLabel,
  languageSwitcher,
}: HeaderClientProps) {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={`/${locale}/`}
            className="text-lg font-bold text-primary"
          >
            {siteName}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* End section */}
          <div className="flex items-center gap-2">
            {languageSwitcher}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-foreground/70 hover:bg-foreground/5 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label={openMenuLabel}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to offset fixed header */}
      <div className="h-16" />

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        dir={dir}
        navLinks={navLinks}
        closeMenuLabel={closeMenuLabel}
        languageSwitcher={languageSwitcher}
      />
    </>
  );
}
