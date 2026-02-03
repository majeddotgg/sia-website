import { locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import type { Metadata } from 'next';

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass =
    locale === 'ar'
      ? `${arabicFont.variable} ${englishFont.variable}`
      : `${englishFont.variable} ${arabicFont.variable}`;

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontClass} font-sans antialiased`}>
        <Header locale={locale as Locale} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict.common.footer} />
        <BottomNav locale={locale} dict={dict.common.bottomNav} />
      </body>
    </html>
  );
}
