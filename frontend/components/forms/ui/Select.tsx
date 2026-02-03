'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ hasError, options, placeholder, className = '', ...props }, ref) {
    return (
      <select
        ref={ref}
        className={[
          'block w-full rounded-xl border bg-white px-4 py-3',
          'text-start text-base text-zinc-900',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-100',
          'transition-colors duration-200',
          'appearance-none bg-no-repeat',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2371717a\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")]',
          'bg-[length:1.5rem] bg-[position:calc(100%-0.75rem)_center]',
          'rtl:bg-[position:0.75rem_center]',
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-zinc-300 focus:ring-primary focus:border-primary',
          className,
        ].join(' ')}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);
