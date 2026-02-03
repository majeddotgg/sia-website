'use client';

import { type ButtonHTMLAttributes } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function SubmitButton({
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={[
        'w-full inline-flex items-center justify-center gap-2',
        'rounded-xl px-6 py-3.5',
        'bg-primary text-white font-medium',
        'hover:bg-primary-dark',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-200',
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <svg
          className="h-5 w-5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
