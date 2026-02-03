'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ hasError, className = '', ...props }, ref) {
    return (
      <input
        ref={ref}
        className={[
          'block w-full rounded-xl border bg-white px-4 py-3',
          'text-start text-base text-zinc-900',
          'placeholder:text-zinc-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-100',
          'transition-colors duration-200',
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-zinc-300 focus:ring-primary focus:border-primary',
          className,
        ].join(' ')}
        {...props}
      />
    );
  }
);
