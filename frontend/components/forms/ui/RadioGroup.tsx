'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  options: RadioOption[];
  hasError?: boolean;
  direction?: 'horizontal' | 'vertical';
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  function RadioGroup({ options, hasError, direction = 'vertical', name, ...props }, ref) {
    return (
      <div
        className={[
          'flex gap-4',
          direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        ].join(' ')}
        role="radiogroup"
      >
        {options.map((option, index) => (
          <label
            key={option.value}
            className="inline-flex items-center gap-3 cursor-pointer group"
          >
            <input
              ref={index === 0 ? ref : undefined}
              type="radio"
              name={name}
              value={option.value}
              className={[
                'h-5 w-5 border-2 bg-white',
                'text-primary focus:ring-2 focus:ring-primary focus:ring-offset-1',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'transition-colors duration-200',
                hasError ? 'border-red-500' : 'border-zinc-300',
              ].join(' ')}
              {...props}
            />
            <span className="text-start text-sm text-zinc-700 group-hover:text-zinc-900 transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  }
);
