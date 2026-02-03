'use client';

import { forwardRef, useState, type InputHTMLAttributes, type DragEvent } from 'react';

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  hasError?: boolean;
  label: string;
  hint?: string;
  maxSizeMB?: number;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload({ hasError, label, hint, maxSizeMB = 5, className = '', onChange, ...props }, ref) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDrag = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragIn = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragOut = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFileName(e.dataTransfer.files[0].name);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFileName(e.target.files[0].name);
      }
      onChange?.(e);
    };

    return (
      <div
        className={[
          'relative rounded-xl border-2 border-dashed p-6',
          'transition-colors duration-200',
          isDragging
            ? 'border-primary bg-primary/5'
            : hasError
              ? 'border-red-500 bg-red-50'
              : 'border-zinc-300 hover:border-zinc-400',
          className,
        ].join(' ')}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={ref}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          {...props}
        />

        <div className="text-center">
          <svg
            className={[
              'mx-auto h-10 w-10 mb-3',
              isDragging ? 'text-primary' : 'text-zinc-400',
            ].join(' ')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>

          {fileName ? (
            <p className="text-sm font-medium text-primary">{fileName}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-zinc-700">{label}</p>
              {hint && (
                <p className="mt-1 text-xs text-zinc-500">{hint}</p>
              )}
              <p className="mt-1 text-xs text-zinc-400">
                Max {maxSizeMB}MB
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
);
