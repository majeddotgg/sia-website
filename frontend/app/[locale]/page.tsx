import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';

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
    title: dict.home.meta.title,
    description: dict.home.meta.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-primary">
        {dict.home.hero.title}
      </h1>
      <p className="mt-4 text-xl text-foreground/70">
        {dict.home.hero.subtitle}
      </p>
    </div>
  );
}
