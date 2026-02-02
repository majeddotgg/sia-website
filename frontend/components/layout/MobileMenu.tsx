'use client';

import { useEffect, type ReactNode } from 'react';
import Link from 'next/link';

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  dir: 'rtl' | 'ltr';
  navLinks: NavLink[];
  closeMenuLabel: string;
  languageSwitcher: ReactNode;
}

export function MobileMenu({
  open,
  onClose,
  dir,
  navLinks,
  closeMenuLabel,
  languageSwitcher,
}: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 z-50 w-72 bg-background shadow-xl transition-transform duration-300 ${
          dir === 'rtl' ? 'end-0' : 'end-0'
        } ${
          open
            ? 'translate-x-0'
            : dir === 'rtl'
              ? '-translate-x-full'
              : 'translate-x-full'
        }`}
        style={{ insetInlineStart: 'auto', insetInlineEnd: 0 }}
      >
        {/* Close button */}
        <div className="flex h-16 items-center justify-between border-b border-foreground/10 px-4">
          <span className="text-sm font-medium text-foreground/50">
            {closeMenuLabel}
          </span>
          <button
            type="button"
            className="rounded-lg p-2 text-foreground/70 hover:bg-foreground/5"
            onClick={onClose}
            aria-label={closeMenuLabel}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language switcher */}
        <div className="border-t border-foreground/10 p-4">
          {languageSwitcher}
        </div>
      </div>
    </>
  );
}
