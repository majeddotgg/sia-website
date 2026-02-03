'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ hasError, className = '', ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={[
          'block w-full rounded-xl border bg-white px-4 py-3',
          'text-start text-base text-zinc-900',
          'placeholder:text-zinc-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-100',
          'transition-colors duration-200',
          'resize-none',
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
