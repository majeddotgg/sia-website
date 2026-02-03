'use client';

import { useId, type ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: (props: { id: string; hasError: boolean }) => ReactNode;
}

export function FormField({
  label,
  error,
  helperText,
  required,
  children,
}: FormFieldProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-start text-sm font-medium text-zinc-700"
      >
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </label>

      {children({ id, hasError: !!error })}

      {error && (
        <p id={errorId} className="text-start text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="text-start text-sm text-zinc-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
