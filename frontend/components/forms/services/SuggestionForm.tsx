'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSuggestionSchema, type SuggestionFormData, type SuggestionFormErrors } from '@/lib/schemas/feedback';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { SubmitButton } from '../ui/SubmitButton';

interface SuggestionFormProps {
  dict: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    errors: SuggestionFormErrors;
  };
}

export function SuggestionForm({ dict }: SuggestionFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  // Create schema with localized error messages
  const schema = useMemo(() => createSuggestionSchema(dict.errors), [dict.errors]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SuggestionFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: SuggestionFormData) => {
    try {
      // For now, simulate submission - replace with actual endpoint
      console.log('Form data:', data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success state
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 mb-2">
          {dict.successTitle}
        </h3>
        <p className="text-zinc-600 mb-6">{dict.successMessage}</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary font-medium hover:underline"
        >
          {dict.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={dict.name} error={errors.name?.message} required>
          {({ id, hasError }) => (
            <Input
              id={id}
              {...register('name')}
              placeholder={dict.namePlaceholder}
              hasError={hasError}
            />
          )}
        </FormField>

        <FormField label={dict.email} error={errors.email?.message} required>
          {({ id, hasError }) => (
            <Input
              id={id}
              type="email"
              {...register('email')}
              placeholder={dict.emailPlaceholder}
              hasError={hasError}
            />
          )}
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={dict.phone} error={errors.phone?.message} required>
          {({ id, hasError }) => (
            <Input
              id={id}
              type="tel"
              dir="ltr"
              {...register('phone')}
              placeholder={dict.phonePlaceholder}
              hasError={hasError}
            />
          )}
        </FormField>

        <FormField label={dict.subject} error={errors.subject?.message} required>
          {({ id, hasError }) => (
            <Input
              id={id}
              {...register('subject')}
              placeholder={dict.subjectPlaceholder}
              hasError={hasError}
            />
          )}
        </FormField>
      </div>

      <FormField label={dict.message} error={errors.message?.message} required>
        {({ id, hasError }) => (
          <Textarea
            id={id}
            rows={6}
            {...register('message')}
            placeholder={dict.messagePlaceholder}
            hasError={hasError}
          />
        )}
      </FormField>

      <SubmitButton loading={isSubmitting}>
        {isSubmitting ? dict.submitting : dict.submit}
      </SubmitButton>
    </form>
  );
}
