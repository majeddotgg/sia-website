import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Link from 'next/link';

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
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
  };
}

export default async function ContactPage({
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
              {dict.contact.hero.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {dict.contact.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Call Us Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-zinc-600 mb-6">
                {dict.contact.call.description}
              </p>
              <a
                href={`tel:${dict.contact.call.phone}`}
                className="inline-flex flex-col items-center gap-3 group"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-primary">
                  {dict.contact.call.label}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-wider" dir="ltr">
                  {dict.contact.call.phone}
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feedback Cards Section */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Suggestion Card */}
            <ScrollReveal delay={0}>
              <Link href={`/${locale}/suggestion`} className="block h-full">
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full group cursor-pointer hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                    {dict.contact.feedback.suggestion.title}
                  </h3>

                  <p className="text-zinc-600 leading-relaxed">
                    {dict.contact.feedback.suggestion.description}
                  </p>

                  {/* Arrow */}
                  <div className="absolute bottom-8 end-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-primary rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 end-0 w-24 h-24 bg-emerald-50 rounded-bl-[100px] rounded-tr-3xl group-hover:bg-emerald-100 transition-colors duration-300" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Feedback Card */}
            <ScrollReveal delay={100}>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full group cursor-pointer hover:-translate-y-1">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                  {dict.contact.feedback.note.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed">
                  {dict.contact.feedback.note.description}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-8 end-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-primary rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 end-0 w-24 h-24 bg-blue-50 rounded-bl-[100px] rounded-tr-3xl group-hover:bg-blue-100 transition-colors duration-300" />
              </div>
            </ScrollReveal>

            {/* Complaint Card */}
            <ScrollReveal delay={200}>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full group cursor-pointer hover:-translate-y-1">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                  {dict.contact.feedback.complaint.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed">
                  {dict.contact.feedback.complaint.description}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-8 end-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-primary rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 end-0 w-24 h-24 bg-amber-50 rounded-bl-[100px] rounded-tr-3xl group-hover:bg-amber-100 transition-colors duration-300" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                {dict.contact.info.title}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Address */}
            <ScrollReveal delay={0}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {dict.contact.info.address.label}
                </h3>
                <p className="text-zinc-600">
                  {dict.contact.info.address.value}
                </p>
              </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={100}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {dict.contact.info.email.label}
                </h3>
                <a href={`mailto:${dict.contact.info.email.value}`} className="text-primary hover:underline">
                  {dict.contact.info.email.value}
                </a>
              </div>
            </ScrollReveal>

            {/* Working Hours */}
            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {dict.contact.info.hours.label}
                </h3>
                <p className="text-zinc-600">
                  {dict.contact.info.hours.value}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-zinc-100">
        <div className="w-full h-[400px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.6714!2d55.3897!3d25.3463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDIwJzQ2LjciTiA1NcKwMjMnMjIuOSJF!5e0!3m2!1sen!2sae!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={dict.contact.info.address.label}
          />
        </div>
      </section>
    </>
  );
}
