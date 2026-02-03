'use client';

import Link from 'next/link';

interface BottomNavProps {
  locale: string;
  dict: {
    services: string;
    contactUs: string;
    happinessMeter: string;
    prayerTimes: string;
  };
}

export function BottomNav({ locale, dict }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 z-[51] w-full pb-3 px-6">
      <div className="flex gap-2 justify-between">
        {/* Main nav items */}
        <div className="relative w-full max-w-[300px] grow rounded-full bg-white/90">
          {/* Liquid glass effect */}
          <div className="liquid-glass absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="liquid-glass--bend" />
            <div className="liquid-glass--face" />
            <div className="liquid-glass--edge" />
          </div>

          <div className="relative z-10 px-1 py-1">
            <div className="flex justify-around items-center gap-2">
              {/* Happiness Meter */}
              <Link
                href={`/${locale}/feedback`}
                className="group inline-flex flex-col items-center justify-center h-[60px] px-4 text-zinc-700 rounded-full transition-all duration-300 hover:bg-white/50 hover:shadow-[inset_0px_0px_3px_2px_rgb(244_244_244)]"
              >
                <svg
                  className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
                <span className="block text-[.65rem] mt-1">{dict.happinessMeter}</span>
              </Link>

              {/* Contact Us */}
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex flex-col items-center justify-center h-[60px] px-4 text-zinc-700 rounded-full transition-all duration-300 hover:bg-white/50 hover:shadow-[inset_0px_0px_3px_2px_rgb(244_244_244)]"
              >
                <svg
                  className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
                <span className="block text-[.65rem] mt-1">{dict.contactUs}</span>
              </Link>

              {/* Services */}
              <Link
                href={`/${locale}/services`}
                className="group inline-flex flex-col items-center justify-center h-[60px] px-4 text-zinc-700 rounded-full transition-all duration-300 hover:bg-white/50 hover:shadow-[inset_0px_0px_3px_2px_rgb(244_244_244)]"
              >
                <svg
                  className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
                <span className="block text-[.65rem] mt-1">{dict.services}</span>
              </Link>

              {/* Prayer Times */}
              <Link
                href={`/${locale}/prayer-times`}
                className="group inline-flex flex-col items-center justify-center h-[60px] px-4 text-zinc-700 rounded-full transition-all duration-300 hover:bg-white/50 hover:shadow-[inset_0px_0px_3px_2px_rgb(244_244_244)]"
              >
                <svg
                  className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="block text-[.65rem] mt-1">{dict.prayerTimes}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* AI Assistant button */}
        <div className="relative w-[68px] flex items-center justify-center rounded-full bg-white/90">
          <button
            type="button"
            className="relative p-3 w-full h-full rounded-full text-primary inline-flex items-center justify-center transition-all duration-300 group"
            aria-label="AI Assistant"
          >
            {/* Liquid glass effect */}
            <span className="liquid-glass absolute top-0 left-0 w-full h-full pointer-events-none">
              <span className="liquid-glass--bend" />
              <span className="liquid-glass--face" />
              <span className="liquid-glass--edge" />
            </span>
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
