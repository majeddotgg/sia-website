# Forms Architecture — SIA Website

This guide governs all forms in the project. Follow these patterns for consistency.

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| react-hook-form | 7.x | Form state management |
| zod | 4.x | Schema validation (note: uses v4 syntax) |
| @hookform/resolvers | 5.x | Connects Zod to RHF |

**Note**: Zod v4 uses `{ message: '...' }` instead of `{ errorMap: () => {...} }` for custom enum errors.

---

## File Structure

```
components/forms/
├── CLAUDE.md              # This file
├── ui/                    # Reusable form UI components
│   ├── FormField.tsx      # Wrapper with label + error
│   ├── Input.tsx          # Text input
│   ├── Textarea.tsx       # Multi-line input
│   ├── Select.tsx         # Dropdown
│   ├── Checkbox.tsx       # Single checkbox
│   ├── RadioGroup.tsx     # Radio options
│   ├── FileUpload.tsx     # File upload with drag & drop
│   └── SubmitButton.tsx   # Submit with loading state
└── services/              # Service-specific forms
    ├── HajjRegistrationForm.tsx
    ├── MarriageRequestForm.tsx
    ├── FatwaRequestForm.tsx
    ├── MosqueBookingForm.tsx
    ├── ComplaintForm.tsx
    └── SuggestionForm.tsx

lib/
├── schemas/               # Zod validation schemas
│   ├── common.ts          # Shared schemas (phone, email, emirates ID)
│   ├── hajj.ts            # Hajj registration schema
│   ├── marriage.ts        # Marriage request schema
│   ├── fatwa.ts           # Fatwa request schema
│   ├── booking.ts         # Mosque booking schema
│   └── feedback.ts        # Complaints & suggestions schemas
└── api/
    └── form-submit.ts     # Form submission utilities
```

---

## Core Patterns

### 1. Schema Definition (Always First)

```typescript
// lib/schemas/feedback.ts
import { z } from 'zod';

export const suggestionSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().regex(/^(05|5)\d{8}$/, 'رقم الهاتف غير صالح'),
  subject: z.string().min(5, 'الموضوع مطلوب'),
  message: z.string().min(20, 'الرسالة يجب أن تكون 20 حرف على الأقل'),
});

export type SuggestionFormData = z.infer<typeof suggestionSchema>;
```

### 2. Form Component Template

```typescript
// components/forms/services/SuggestionForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { suggestionSchema, type SuggestionFormData } from '@/lib/schemas/feedback';
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
    success: string;
  };
  onSuccess?: () => void;
}

export function SuggestionForm({ dict, onSuccess }: SuggestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SuggestionFormData>({
    resolver: zodResolver(suggestionSchema),
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
      // Submit to form backend (Formspree, custom API, etc.)
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');

      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <FormField label={dict.message} error={errors.message?.message} required>
        {({ id, hasError }) => (
          <Textarea
            id={id}
            rows={5}
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
```

---

## Critical Rules

### ✅ ALWAYS Do

1. **Define schema first** — Always create Zod schema before the form component
2. **Set defaultValues** — Every field must have a default value to prevent uncontrolled warnings
3. **Use `z.infer<typeof schema>`** — Type inference from schema
4. **Use `mode: 'onBlur'`** — Good balance of UX and performance
5. **Pass dict for all text** — No hardcoded Arabic/English text
6. **Handle loading state** — Show spinner/disable button during submission
7. **Reset on success** — Call `reset()` after successful submission
8. **Use optional chaining for errors** — `errors.field?.message`

### ❌ NEVER Do

1. **Never skip defaultValues** — Causes React warnings
2. **Never hardcode text** — All labels/messages from dictionary
3. **Never use index as key** — In useFieldArray, use `field.id`
4. **Never mutate form values directly** — Use `setValue()`
5. **Never skip error handling** — Always handle submission errors

---

## Common Schemas

### UAE Phone Number

```typescript
export const uaePhone = z.string()
  .regex(/^(05|5|\\+9715)\d{8}$/, 'رقم الهاتف غير صالح');
```

### Emirates ID

```typescript
export const emiratesId = z.string()
  .regex(/^784-\d{4}-\d{7}-\d{1}$/, 'رقم الهوية غير صالح')
  .or(z.string().regex(/^784\d{12}$/, 'رقم الهوية غير صالح'));
```

### Email

```typescript
export const email = z.string()
  .min(1, 'البريد الإلكتروني مطلوب')
  .email('البريد الإلكتروني غير صالح');
```

### Arabic Name

```typescript
export const arabicName = z.string()
  .min(2, 'الاسم مطلوب')
  .regex(/^[\u0600-\u06FF\s]+$/, 'يرجى إدخال الاسم بالعربية');
```

### File Upload

```typescript
export const fileUpload = z.custom<File>()
  .refine((file) => file instanceof File, 'الملف مطلوب')
  .refine((file) => file.size <= 5 * 1024 * 1024, 'حجم الملف يجب أن يكون أقل من 5 ميجابايت')
  .refine(
    (file) => ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type),
    'نوع الملف غير مدعوم'
  );
```

---

## Form Submission Strategy

Since this is a **static export**, forms need external backends:

### Option 1: Formspree (Recommended for Simple Forms)

```typescript
const onSubmit = async (data: FormData) => {
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
```

### Option 2: Custom API (For Complex Forms)

```typescript
// External API endpoint (not in Next.js)
const onSubmit = async (data: FormData) => {
  await fetch('https://api.sia.shj.ae/v1/forms/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify(data),
  });
};
```

### Option 3: Email via mailto (Simple Fallback)

```typescript
const onSubmit = (data: FormData) => {
  const body = Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join('%0D%0A');

  window.location.href = `mailto:info@sia.shj.ae?subject=Form Submission&body=${body}`;
};
```

---

## RTL Considerations

### Phone/Number Inputs

```typescript
<Input
  type="tel"
  dir="ltr"  // Always LTR for phone numbers
  className="text-start"
  {...register('phone')}
/>
```

### Form Layout

```typescript
// Use logical properties
<div className="grid gap-6 md:grid-cols-2">
  <FormField label={dict.firstName}>...</FormField>
  <FormField label={dict.lastName}>...</FormField>
</div>
```

---

## Error Messages (Bilingual) — REQUIRED PATTERN

**IMPORTANT**: All forms must use factory functions for schemas to support bilingual error messages.

```typescript
// lib/schemas/myform.ts
export interface MyFormErrors {
  nameRequired: string;
  emailInvalid: string;
}

export function createMySchema(errors: MyFormErrors) {
  return z.object({
    name: z.string().min(2, errors.nameRequired),
    email: z.string().email(errors.emailInvalid),
  });
}

export type MyFormData = z.infer<ReturnType<typeof createMySchema>>;
```

```typescript
// components/forms/services/MyForm.tsx
'use client';

import { useMemo } from 'react';
import { createMySchema, type MyFormErrors } from '@/lib/schemas/myform';

interface MyFormProps {
  dict: {
    // ... labels
    errors: MyFormErrors;  // Pass errors from dictionary
  };
}

export function MyForm({ dict }: MyFormProps) {
  // Create schema with localized error messages
  const schema = useMemo(() => createMySchema(dict.errors), [dict.errors]);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    // ...
  });
}
```

```json
// dictionaries/en.json
{
  "myForm": {
    "errors": {
      "nameRequired": "Name is required",
      "emailInvalid": "Invalid email"
    }
  }
}

// dictionaries/ar.json
{
  "myForm": {
    "errors": {
      "nameRequired": "الاسم مطلوب",
      "emailInvalid": "البريد غير صالح"
    }
  }
}
```

---

## Service Forms Checklist

When creating a new service form:

1. [ ] Create schema in `lib/schemas/[service].ts`
2. [ ] Export type with `z.infer`
3. [ ] Create form component in `components/forms/services/`
4. [ ] Add translations to `ar.json` and `en.json`
5. [ ] Use FormField wrapper for all fields
6. [ ] Set all defaultValues
7. [ ] Handle loading and success states
8. [ ] Test in both RTL (Arabic) and LTR (English)

---

## Quick Reference

| Pattern | Code |
|---------|------|
| Define schema | `const schema = z.object({ ... })` |
| Infer type | `type FormData = z.infer<typeof schema>` |
| Initialize form | `useForm<FormData>({ resolver: zodResolver(schema), defaultValues: {...} })` |
| Register field | `{...register('fieldName')}` |
| Show error | `{errors.field?.message}` |
| Submit handler | `handleSubmit(onSubmit)` |
| Loading state | `formState.isSubmitting` |
| Reset form | `reset()` |

---

**Reference Skill**: `/Users/majed/.claude/skills/react-hook-form-zod`

---

## Service Form Pages — REQUIRED PATTERN

**IMPORTANT**: When creating a service form, ALWAYS create a **Service Info Page** first, then the form. Users must see service details before starting the form.

### Service Info Page Structure

Every service form must have a dedicated info page with:

| Section (Arabic) | Section (English) | Description |
|------------------|-------------------|-------------|
| اسم الخدمة | Service Name | Title of the service |
| وصف الخدمة | Service Description | What the service does |
| إجراءات الخدمة | Service Procedures | Step-by-step process |
| المستندات المطلوبة | Required Documents | List of needed documents |
| الشروط والمتطلبات | Terms & Requirements | Eligibility criteria |
| مدة إتمام الخدمة | Completion Time | Expected processing time |
| قنوات استلام الخدمة | Service Channels | How to access the service |
| الجمهور المستهدف | Target Audience | Who can use this service |
| الدعم | Support | Contact/help information |

### Service Channels (قنوات استلام الخدمة)
Always include these two channels:
- **الموقع الالكتروني 24/7** (Website 24/7)
- **التطبيق الذكي 24/7** (Smart App 24/7)

### Page Flow

```
/services/[service-name]/          → Service Info Page (details + "بدأ الخدمة" button)
/services/[service-name]/form/     → Actual Form Page
```

### Service Info Page Template

```typescript
// app/[locale]/services/[service-name]/page.tsx
import { getDictionary } from '@/lib/i18n/dictionaries';
import { ServiceInfoCard } from '@/components/sections/ServiceInfoCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import type { Locale } from '@/types';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Service Name */}
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {dict.serviceName.title}
      </h1>

      {/* Service Description */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.serviceDescription}</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {dict.serviceName.description}
        </p>
      </section>

      {/* Service Procedures */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.serviceProcedures}</h2>
        <ol className="mt-2 list-inside list-decimal space-y-2">
          {dict.serviceName.procedures.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Required Documents */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.requiredDocuments}</h2>
        <ul className="mt-2 list-inside list-disc space-y-2">
          {dict.serviceName.documents.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      </section>

      {/* Terms & Requirements */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.termsRequirements}</h2>
        <ul className="mt-2 list-inside list-disc space-y-2">
          {dict.serviceName.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </section>

      {/* Completion Time */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.completionTime}</h2>
        <p className="mt-2">{dict.serviceName.completionTime}</p>
      </section>

      {/* Service Channels */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.serviceChannels}</h2>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center gap-2">
            <span>🌐</span>
            <span>{dict.common.website24_7}</span>
          </li>
          <li className="flex items-center gap-2">
            <span>📱</span>
            <span>{dict.common.smartApp24_7}</span>
          </li>
        </ul>
      </section>

      {/* Target Audience */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.targetAudience}</h2>
        <p className="mt-2">{dict.serviceName.targetAudience}</p>
      </section>

      {/* Support */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">{dict.common.support}</h2>
        <p className="mt-2">{dict.serviceName.support}</p>
      </section>

      {/* Start Service Button */}
      <div className="mt-10">
        <Link href={`/${locale}/services/service-name/form`}>
          <Button variant="primary" size="lg">
            {dict.common.startService} {/* بدأ الخدمة */}
          </Button>
        </Link>
      </div>
    </main>
  );
}
```

### Dictionary Structure for Service Pages

```json
// dictionaries/ar.json
{
  "common": {
    "serviceDescription": "وصف الخدمة",
    "serviceProcedures": "إجراءات الخدمة",
    "requiredDocuments": "المستندات المطلوبة",
    "termsRequirements": "الشروط والمتطلبات",
    "completionTime": "مدة إتمام الخدمة",
    "serviceChannels": "قنوات استلام الخدمة",
    "website24_7": "الموقع الالكتروني 24/7",
    "smartApp24_7": "التطبيق الذكي 24/7",
    "targetAudience": "الجمهور المستهدف",
    "support": "الدعم",
    "startService": "بدأ الخدمة"
  },
  "serviceName": {
    "title": "اسم الخدمة",
    "description": "وصف تفصيلي للخدمة...",
    "procedures": [
      "الخطوة الأولى",
      "الخطوة الثانية"
    ],
    "documents": [
      "الهوية الإماراتية",
      "جواز السفر"
    ],
    "requirements": [
      "أن يكون مواطناً أو مقيماً",
      "أن يكون فوق 18 سنة"
    ],
    "completionTime": "3-5 أيام عمل",
    "targetAudience": "المواطنون والمقيمون",
    "support": "للاستفسارات: 800-SIA"
  }
}
```

### Service Form Page Checklist

When creating a new service form:

1. [ ] Create service info page at `app/[locale]/services/[name]/page.tsx`
2. [ ] Add all 9 sections (name, description, procedures, documents, requirements, time, channels, audience, support)
3. [ ] Add "بدأ الخدمة" button linking to form page
4. [ ] Create form page at `app/[locale]/services/[name]/form/page.tsx`
5. [ ] Add dictionary entries for both languages
6. [ ] Test RTL/LTR display
