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
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  };
}

export default async function AboutPage({
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
              {dict.about.hero.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-white/80">
              {dict.about.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
                  {dict.about.intro.title}
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                {dict.about.intro.paragraph1}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg text-zinc-600 leading-relaxed">
                {dict.about.intro.paragraph2}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Vision Card */}
            <ScrollReveal direction="left">
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                  {dict.about.vision.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed text-lg">
                  {dict.about.vision.content}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 end-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] rounded-tr-3xl" />
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal direction="right">
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                  {dict.about.mission.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed text-lg">
                  {dict.about.mission.content}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 end-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] rounded-tr-3xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                  {dict.about.values.title}
                </h2>
                <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {dict.about.values.items.map((value, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="group relative bg-zinc-50 rounded-2xl p-6 text-center hover:bg-primary transition-colors duration-300">
                    {/* Number */}
                    <div className="text-4xl font-bold text-primary/20 group-hover:text-white/20 mb-2 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Value Text */}
                    <p className="text-zinc-900 font-semibold group-hover:text-white transition-colors duration-300">
                      {value}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Section */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-100">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
              </div>
              <p className="text-xl text-zinc-600 italic">
                "{dict.about.vision.content}"
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
