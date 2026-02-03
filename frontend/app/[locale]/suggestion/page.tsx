import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SuggestionForm } from '@/components/forms/services/SuggestionForm';

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
    title: dict.suggestion.meta.title,
    description: dict.suggestion.meta.description,
  };
}

export default async function SuggestionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] w-full bg-black flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <ScrollReveal>
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {dict.suggestion.hero.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {dict.suggestion.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="bg-zinc-50 rounded-3xl p-8 md:p-10">
                <SuggestionForm dict={dict.suggestion.form} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-bold text-zinc-900 mb-4">
                {dict.suggestion.info.title}
              </h3>
              <p className="text-zinc-600">
                {dict.suggestion.info.description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
