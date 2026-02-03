'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  dict: {
    searchPlaceholder: string;
    mosques: string;
    services: string;
    search: string;
    filters: {
      area: string;
      allAreas: string;
      areas: string[];
    };
    close: string;
  };
}

export function SearchModal({ open, onClose, dict }: SearchModalProps) {
  const [searchType, setSearchType] = useState<'mosques' | 'services'>('mosques');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ searchType, searchQuery, selectedArea });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 flex flex-col items-center pt-20 md:pt-32 px-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-white/70 hover:text-white transition-colors"
          aria-label={dict.close}
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Search Type Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSearchType('mosques')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              searchType === 'mosques'
                ? 'bg-white text-zinc-900'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
              </svg>
              {dict.mosques}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSearchType('services')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              searchType === 'services'
                ? 'bg-white text-zinc-900'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
              {dict.services}
            </span>
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="flex flex-col gap-3">
            {/* Search Input Row */}
            <div className="flex gap-2">
              {/* Area Filter - Only for Mosques */}
              {searchType === 'mosques' && (
                <div className="relative">
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="h-14 px-4 pe-10 rounded-2xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer min-w-[140px]"
                  >
                    <option value="" className="bg-zinc-800">{dict.filters.allAreas}</option>
                    {dict.filters.areas.map((area) => (
                      <option key={area} value={area} className="bg-zinc-800">
                        {area}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute end-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}

              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.searchPlaceholder}
                  className="w-full h-14 ps-14 pe-4 rounded-2xl bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <svg
                  className="absolute start-4 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="h-14 px-8 rounded-2xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <span className="hidden sm:inline">{dict.search}</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm mb-3">
            {searchType === 'mosques' ? 'أو تصفح المساجد حسب المنطقة' : 'أو تصفح الخدمات المتاحة'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchType === 'mosques' ? (
              dict.filters.areas.slice(0, 5).map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setSelectedArea(area);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
                >
                  {area}
                </button>
              ))
            ) : (
              ['الحج والعمرة', 'الفتاوى', 'الزواج', 'المساجد'].map((service) => (
                <button
                  key={service}
                  onClick={() => setSearchQuery(service)}
                  className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
                >
                  {service}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
