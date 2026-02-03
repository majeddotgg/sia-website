import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

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
    title: dict.careers.meta.title,
    description: dict.careers.meta.description,
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] w-full bg-black flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <ScrollReveal>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {dict.careers.hero.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-white/80">
              {dict.careers.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
                  {dict.careers.whyJoin.title}
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                {dict.careers.whyJoin.description}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                {dict.careers.benefits.title}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {dict.careers.benefits.items.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-zinc-600 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 end-0 w-20 h-20 bg-primary/5 rounded-bl-[80px] rounded-tr-3xl" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                {dict.careers.positions.title}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            {dict.careers.positions.items.length > 0 ? (
              <div className="space-y-4">
                {dict.careers.positions.items.map((position, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
                    <div className="bg-zinc-50 rounded-2xl p-6 hover:bg-zinc-100 transition-colors duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="inline-flex items-center gap-1 text-sm text-zinc-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              {position.location}
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm text-zinc-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              {position.type}
                            </span>
                          </div>
                        </div>
                        <a
                          href={`mailto:careers@sia.shj.ae?subject=${encodeURIComponent(position.title)}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors duration-200"
                        >
                          {dict.careers.positions.applyButton}
                          <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <ScrollReveal>
                <div className="text-center py-12 bg-zinc-50 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                  <p className="text-lg text-zinc-600">
                    {dict.careers.positions.noPositions}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-100">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                {dict.careers.cta.title}
              </h3>
              <p className="text-lg text-zinc-600 mb-6">
                {dict.careers.cta.description}
              </p>
              <a
                href="mailto:careers@sia.shj.ae"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-white font-medium hover:bg-primary-dark transition-colors duration-200"
              >
                {dict.careers.cta.button}
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
