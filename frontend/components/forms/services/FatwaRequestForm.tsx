'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createFatwaSchema,
  type FatwaFormData,
  type FatwaFormErrors,
  type FatwaCategory,
} from '@/lib/schemas/fatwa';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { SubmitButton } from '../ui/SubmitButton';

interface CategoryOption {
  value: FatwaCategory;
  label: string;
}

interface FatwaRequestFormProps {
  dict: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    category: string;
    categoryPlaceholder: string;
    categories: {
      worship: string;
      transactions: string;
      family: string;
      ethics: string;
      other: string;
    };
    question: string;
    questionPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    errors: FatwaFormErrors;
  };
}

export function FatwaRequestForm({ dict }: FatwaRequestFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  // Create schema with localized error messages
  const schema = useMemo(() => createFatwaSchema(dict.errors), [dict.errors]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FatwaFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      category: undefined,
      question: '',
    },
  });

  // Build category options from dictionary
  const categoryOptions: CategoryOption[] = [
    { value: 'worship', label: dict.categories.worship },
    { value: 'transactions', label: dict.categories.transactions },
    { value: 'family', label: dict.categories.family },
    { value: 'ethics', label: dict.categories.ethics },
    { value: 'other', label: dict.categories.other },
  ];

  const onSubmit = async (data: FatwaFormData) => {
    try {
      // For now, simulate submission - replace with actual endpoint
      console.log('Fatwa request data:', data);

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

        <FormField label={dict.category} error={errors.category?.message} required>
          {({ id, hasError }) => (
            <Select
              id={id}
              {...register('category')}
              placeholder={dict.categoryPlaceholder}
              options={categoryOptions}
              hasError={hasError}
              defaultValue=""
            />
          )}
        </FormField>
      </div>

      <FormField label={dict.question} error={errors.question?.message} required>
        {({ id, hasError }) => (
          <Textarea
            id={id}
            rows={6}
            {...register('question')}
            placeholder={dict.questionPlaceholder}
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
