import { z } from 'zod';

/**
 * Fatwa Request Form Schema
 * Uses factory function to support bilingual error messages
 */

// Error messages interface for fatwa request form
export interface FatwaFormErrors {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  categoryRequired: string;
  questionRequired: string;
  questionMin: string;
}

// Fatwa categories
export const fatwaCategories = [
  'worship',      // العبادات
  'transactions', // المعاملات
  'family',       // الأسرة
  'ethics',       // الأخلاق
  'other',        // أخرى
] as const;

export type FatwaCategory = (typeof fatwaCategories)[number];

// Create fatwa request schema with custom error messages
export function createFatwaSchema(errors: FatwaFormErrors) {
  return z.object({
    name: z.string().min(2, errors.nameRequired),
    email: z.string().min(1, errors.emailRequired).email(errors.emailInvalid),
    phone: z.string().min(1, errors.phoneRequired).regex(/^(05|5|\+9715)\d{8}$/, errors.phoneInvalid),
    category: z.enum(fatwaCategories, {
      message: errors.categoryRequired,
    }),
    question: z.string().min(20, errors.questionMin),
  });
}

export type FatwaFormData = z.infer<ReturnType<typeof createFatwaSchema>>;
