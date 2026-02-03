'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  hasError?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, hasError, className = '', ...props }, ref) {
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          className={[
            'h-5 w-5 rounded border-2 bg-white',
            'text-primary focus:ring-2 focus:ring-primary focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            hasError ? 'border-red-500' : 'border-zinc-300',
            className,
          ].join(' ')}
          {...props}
        />
        <span className="text-start text-sm text-zinc-700 group-hover:text-zinc-900 transition-colors">
          {label}
        </span>
      </label>
    );
  }
);
