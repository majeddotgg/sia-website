import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import Link from 'next/link';

const serviceIcons = [
  // Hajj/Kaaba icon
  <svg key="hajj" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
  </svg>,
  // Book/Fatwa icon
  <svg key="fatwa" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>,
  // Marriage/Heart icon
  <svg key="marriage" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>,
  // Mosque icon
  <svg key="mosque" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
  </svg>,
];

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
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] w-full bg-black">
        {/* Top gradient overlay */}
        <span className="absolute top-0 left-0 z-[1] h-[500px] w-full bg-gradient-to-b from-black to-transparent" />

        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/banner.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 z-[2] bg-black/40" />

        {/* Content container at bottom */}
        <div className="absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-32">
          <div className="container mx-auto px-4">
            {/* Text content */}
            <div className="mx-auto max-w-[832px] text-center mb-8">
              <h1 className="mb-4 text-2xl font-semibold text-white md:text-4xl lg:text-5xl">
                {dict.home.hero.title}
              </h1>
              <p className="text-sm text-white/90 md:text-xl lg:text-2xl">
                {dict.home.hero.subtitle}
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="mx-auto mb-8 hidden h-6 w-[17px] rounded-full border-2 border-white/50 md:block">
              <div className="mx-auto mt-[3px] h-[5px] w-[5px] animate-bounce rounded-full bg-white" />
            </div>
          </div>

          {/* Services Cards - inside hero with black background */}
          <div className="w-full bg-black pt-4 pb-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
                {dict.home.services.items.map((service, index) => (
                  <Link
                    key={index}
                    href={`/${locale}/services`}
                    className="group flex flex-col items-center rounded-t-2xl bg-white p-4 text-center transition-all duration-300 hover:-translate-y-4"
                  >
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      {serviceIcons[index]}
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-zinc-900">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2">
                      {service.description}
                    </p>
                  </Link>
                ))}

                {/* Explore More Card */}
                <Link
                  href={`/${locale}/services`}
                  className="group flex flex-col items-center justify-center rounded-t-2xl bg-white p-4 text-center transition-all duration-300 hover:-translate-y-4"
                >
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-zinc-900">
                    {dict.home.services.exploreMore}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {dict.home.services.exploreMoreDescription}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
