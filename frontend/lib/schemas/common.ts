import { z } from 'zod';

/**
 * Common validation schemas for UAE-specific data
 * Used across all service forms
 */

// UAE Phone Number (05x or +9715x format)
export const uaePhoneSchema = z
  .string()
  .min(1, 'رقم الهاتف مطلوب')
  .regex(/^(05|5|\+9715)\d{8}$/, 'رقم الهاتف غير صالح');

// Emirates ID (784-XXXX-XXXXXXX-X or 784XXXXXXXXXXXX)
export const emiratesIdSchema = z
  .string()
  .min(1, 'رقم الهوية مطلوب')
  .refine(
    (val) => /^784-\d{4}-\d{7}-\d{1}$/.test(val) || /^784\d{12}$/.test(val),
    'رقم الهوية غير صالح'
  );

// Email
export const emailSchema = z
  .string()
  .min(1, 'البريد الإلكتروني مطلوب')
  .email('البريد الإلكتروني غير صالح');

// Arabic Name (Arabic characters only)
export const arabicNameSchema = z
  .string()
  .min(2, 'الاسم مطلوب')
  .regex(/^[\u0600-\u06FF\s]+$/, 'يرجى إدخال الاسم بالعربية');

// General Name (Arabic or English)
export const nameSchema = z
  .string()
  .min(2, 'الاسم مطلوب')
  .max(100, 'الاسم طويل جداً');

// Date of Birth (must be in the past, at least 18 years old for adults)
export const dateOfBirthSchema = z
  .string()
  .min(1, 'تاريخ الميلاد مطلوب')
  .refine((val) => {
    const date = new Date(val);
    return date < new Date();
  }, 'تاريخ الميلاد غير صالح');

export const adultDateOfBirthSchema = z
  .string()
  .min(1, 'تاريخ الميلاد مطلوب')
  .refine((val) => {
    const date = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18;
  }, 'يجب أن يكون العمر 18 سنة أو أكثر');

// File Upload
export const fileSchema = z
  .custom<File>()
  .refine((file) => file instanceof File, 'الملف مطلوب')
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    'حجم الملف يجب أن يكون أقل من 5 ميجابايت'
  );

export const pdfFileSchema = fileSchema.refine(
  (file) => file.type === 'application/pdf',
  'يجب أن يكون الملف بصيغة PDF'
);

export const imageFileSchema = fileSchema.refine(
  (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
  'يجب أن يكون الملف صورة (JPG, PNG, WebP)'
);

// Message/Description with min length
export const messageSchema = z
  .string()
  .min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل')
  .max(2000, 'الرسالة طويلة جداً');

// Subject
export const subjectSchema = z
  .string()
  .min(3, 'الموضوع مطلوب')
  .max(200, 'الموضوع طويل جداً');

// UAE Areas/Emirates
export const uaeEmiratesEnum = z.enum([
  'sharjah',
  'dubai',
  'abu_dhabi',
  'ajman',
  'fujairah',
  'ras_al_khaimah',
  'umm_al_quwain',
]);

// Sharjah Areas
export const sharjahAreasEnum = z.enum([
  'sharjah_city',
  'khorfakkan',
  'kalba',
  'dibba_al_hisn',
  'al_dhaid',
  'al_madam',
  'mleiha',
]);

// Gender
export const genderEnum = z.enum(['male', 'female']);

// Marital Status
export const maritalStatusEnum = z.enum(['single', 'married', 'divorced', 'widowed']);

// Nationality (common ones)
export const nationalitySchema = z.string().min(1, 'الجنسية مطلوبة');

/**
 * Helper to create bilingual error messages
 * Use when you need both Arabic and English errors
 */
export function createBilingualSchema<T extends z.ZodTypeAny>(
  schema: T,
  errors: { ar: string; en: string }
) {
  return schema.refine(() => true, errors.ar);
}
