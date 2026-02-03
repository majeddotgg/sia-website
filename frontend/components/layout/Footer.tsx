'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FooterProps {
  locale: string;
  dict: {
    copyright: string;
    maintainedBy: string;
    browserRecommendation: string;
    lastUpdate: string;
    privacyPolicy: string;
    termsAndConditions: string;
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      subscribe: string;
    };
    social: {
      facebook: string;
      youtube: string;
      twitter: string;
      instagram: string;
    };
  };
}

export function Footer({ locale, dict }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribe:', email);
  };

  return (
    <footer className="bg-zinc-900 text-white pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Newsletter Section */}
        <div className="max-w-md mx-auto text-center mb-8">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-16 w-auto mx-auto rounded-lg"
            />
          </div>

          {/* Title */}
          <h3 className="font-medium text-lg mb-4">{dict.newsletter.title}</h3>

          {/* Description */}
          <p className="text-white/70 mb-4 text-sm">{dict.newsletter.description}</p>

          {/* Subscribe Form */}
          <form onSubmit={handleSubscribe} className="mb-6">
            <div className="relative w-full">
              <input
                id="subscribeEmail"
                type="email"
                placeholder={dict.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pe-32 ps-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute top-0 end-0 h-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                {dict.newsletter.subscribe}
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              aria-label={dict.social.facebook}
              href="https://www.facebook.com/IslamicAffairs.SHJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
              </svg>
            </a>
            <a
              aria-label={dict.social.youtube}
              href="https://www.youtube.com/c/IslamicAffairs_SHJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" />
              </svg>
            </a>
            <a
              aria-label={dict.social.twitter}
              href="https://x.com/Islamic_Affairs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm-.334 3.5a.75.75 0 0 0-.338 1.154l5.614 7.45l-5.915 6.345l-.044.051H6.03l4.83-5.179l3.712 4.928a.75.75 0 0 0 .337.251h4.422a.75.75 0 0 0 .336-1.154l-5.614-7.45L20.017 4.5h-2.05l-4.83 5.18l-3.714-4.928a.75.75 0 0 0-.337-.252zm10.88 13.548L6.431 5.952H8.45l9.114 12.095z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              aria-label={dict.social.instagram}
              href="https://www.instagram.com/islamic_affairs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6" />

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link
            href={`/${locale}/privacy-policy`}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2 text-sm transition-colors hover:bg-white/10"
          >
            {dict.privacyPolicy}
          </Link>
          <Link
            href={`/${locale}/terms`}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2 text-sm transition-colors hover:bg-white/10"
          >
            {dict.termsAndConditions}
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6" />

        {/* Info text */}
        <div className="text-center text-sm text-white/70 space-y-2">
          <p>{dict.copyright}</p>
          <p>{dict.maintainedBy}</p>
          <p>{dict.browserRecommendation}</p>
          <p>{dict.lastUpdate}</p>
        </div>
      </div>
    </footer>
  );
}
