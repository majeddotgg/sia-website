import { z } from 'zod';

/**
 * Feedback Forms Schemas
 * Uses factory functions to support bilingual error messages
 */

// Error messages interface for suggestion form
export interface SuggestionFormErrors {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  subjectRequired: string;
  messageRequired: string;
  messageMin: string;
}

// Create suggestion schema with custom error messages
export function createSuggestionSchema(errors: SuggestionFormErrors) {
  return z.object({
    name: z.string().min(2, errors.nameRequired),
    email: z.string().min(1, errors.emailRequired).email(errors.emailInvalid),
    phone: z.string().min(1, errors.phoneRequired).regex(/^(05|5|\+9715)\d{8}$/, errors.phoneInvalid),
    subject: z.string().min(3, errors.subjectRequired),
    message: z.string().min(10, errors.messageMin),
  });
}

export type SuggestionFormData = z.infer<ReturnType<typeof createSuggestionSchema>>;

// Error messages interface for complaint form
export interface ComplaintFormErrors extends SuggestionFormErrors {
  complaintTypeRequired: string;
}

// Create complaint schema with custom error messages
export function createComplaintSchema(errors: ComplaintFormErrors) {
  return z.object({
    name: z.string().min(2, errors.nameRequired),
    email: z.string().min(1, errors.emailRequired).email(errors.emailInvalid),
    phone: z.string().min(1, errors.phoneRequired).regex(/^(05|5|\+9715)\d{8}$/, errors.phoneInvalid),
    emiratesId: z.string().optional(),
    subject: z.string().min(3, errors.subjectRequired),
    complaintType: z.enum(['service', 'employee', 'facility', 'other'], {
      message: errors.complaintTypeRequired,
    }),
    message: z.string().min(10, errors.messageMin),
    attachments: z.array(z.custom<File>()).optional(),
  });
}

export type ComplaintFormData = z.infer<ReturnType<typeof createComplaintSchema>>;

// Error messages interface for contact form
export interface ContactFormErrors {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
  subjectRequired: string;
  messageRequired: string;
  messageMin: string;
}

// Create contact schema with custom error messages
export function createContactSchema(errors: ContactFormErrors) {
  return z.object({
    name: z.string().min(2, errors.nameRequired),
    email: z.string().min(1, errors.emailRequired).email(errors.emailInvalid),
    phone: z.string().regex(/^(05|5|\+9715)\d{8}$/, errors.phoneInvalid).optional().or(z.literal('')),
    subject: z.string().min(3, errors.subjectRequired),
    message: z.string().min(10, errors.messageMin),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
