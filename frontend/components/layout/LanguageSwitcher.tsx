import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const targetLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <Link
      href={`/${targetLocale}/`}
      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
      lang={targetLocale}
    >
      {label}
    </Link>
  );
}
