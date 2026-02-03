'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';

interface NavLink {
  label: string;
  href: string;
}

interface SearchDict {
  searchPlaceholder: string;
  mosques: string;
  services: string;
  search: string;
  filters: {
    area: string;
    allAreas: string;
    areas: string[];
  };
  close: string;
}

interface HeaderClientProps {
  locale: string;
  dir: 'rtl' | 'ltr';
  siteName: string;
  navLinks: NavLink[];
  openMenuLabel: string;
  closeMenuLabel: string;
  languageSwitcher: ReactNode;
  searchDict: SearchDict;
}

export function HeaderClient({
  locale,
  dir,
  siteName,
  navLinks,
  openMenuLabel,
  closeMenuLabel,
  languageSwitcher,
  searchDict,
}: HeaderClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header
        className="bg-transparent bg-gradient-to-b from-black/80 md:from-black/0 to-white/0 fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Menu burger */}
          <div className="relative size-[56px] rounded-full flex items-center justify-center">
            <button
              type="button"
              className="text-2xl text-white"
              onClick={() => setMobileOpen(true)}
              aria-label={openMenuLabel}
            >
              <div className="liquid-glass absolute top-0 left-0 w-full h-full">
                <div className="liquid-glass--bend" />
                <div className="liquid-glass--face" />
                <div className="liquid-glass--edge" />
              </div>
              <span className="block z-10 relative">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </span>
            </button>
          </div>

          {/* Center: Logo */}
          <Link
            href={`/${locale}/`}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <img
              src="/logo.jpg"
              alt={siteName}
              className="h-10 w-auto"
            />
          </Link>

          {/* Right: Search icon */}
          <div className="relative size-[56px] rounded-full flex items-center justify-center">
            <button
              type="button"
              className="text-2xl text-white"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <div className="liquid-glass absolute top-0 left-0 w-full h-full">
                <div className="liquid-glass--bend" />
                <div className="liquid-glass--face" />
                <div className="liquid-glass--edge" />
              </div>
              <span className="block z-10 relative">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        dir={dir}
        navLinks={navLinks}
        closeMenuLabel={closeMenuLabel}
        languageSwitcher={languageSwitcher}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        dict={searchDict}
      />
    </>
  );
}
