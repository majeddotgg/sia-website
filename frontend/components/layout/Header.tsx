import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { HeaderClient } from './HeaderClient';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const dict = await getDictionary(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const navLinks = [
    { label: dict.common.nav.home, href: `/${locale}/` },
    { label: dict.common.nav.about, href: `/${locale}/about/` },
    { label: dict.common.nav.services, href: `/${locale}/services/` },
    { label: dict.common.nav.jobs, href: `/${locale}/careers/` },
    { label: dict.common.nav.contact, href: `/${locale}/contact/` },
  ];

  return (
    <HeaderClient
      locale={locale}
      dir={dir}
      siteName={dict.common.siteNameShort}
      navLinks={navLinks}
      openMenuLabel={dict.common.openMenu}
      closeMenuLabel={dict.common.closeMenu}
      languageSwitcher={<LanguageSwitcher locale={locale} label={dict.common.languageSwitcher} />}
      searchDict={dict.common.search}
    />
  );
}
