import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { FatwaRequestForm } from '@/components/forms/services/FatwaRequestForm';
import type { Locale } from '@/lib/i18n/config';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export default async function FatwaRequestFormPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.fatwaRequest;

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-4">
            <Link
              href={`/${locale}/services/fatwa-request`}
              className="inline-flex items-center gap-2 text-emerald-100 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t.form.backToService}
            </Link>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">{t.form.title}</h1>
          <p className="mt-2 text-emerald-100">{t.form.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <FatwaRequestForm dict={t.form} />
          </div>

          {/* Info Note */}
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-emerald-800">{t.form.infoNote}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
