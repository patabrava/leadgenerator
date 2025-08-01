import { z } from 'zod';

// Country options for the select dropdown
export const COUNTRIES = [
  { value: 'DE', label: 'Deutschland' },
  { value: 'AT', label: 'Österreich' },
  { value: 'CH', label: 'Schweiz' },
] as const;

// Company size options
export const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 Mitarbeiter' },
  { value: '11-50', label: '11-50 Mitarbeiter' },
  { value: '51-250', label: '51-250 Mitarbeiter' },
  { value: '251-500', label: '251-500 Mitarbeiter' },
  { value: '500+', label: 'Über 500 Mitarbeiter' },
] as const;

// DSB (Data Protection Officer) options
export const DSB_OPTIONS = [
  { value: 'ja', label: 'Ja, wir haben bereits einen externen DSB' },
  { value: 'nein', label: 'Nein, wir benötigen einen externen DSB' },
  { value: 'unsicher', label: 'Ich bin mir nicht sicher' },
] as const;

// Extract the values for Zod validation
const countryValues = COUNTRIES.map(country => country.value) as [string, ...string[]];
const companySizeValues = COMPANY_SIZES.map(size => size.value) as [string, ...string[]];
const dsbValues = DSB_OPTIONS.map(option => option.value) as [string, ...string[]];

// German postal code validation (5 digits)
export const germanPostalCodeSchema = z
  .string()
  .min(1, 'PLZ ist erforderlich')
  .regex(/^\d{5}$/, 'PLZ muss aus 5 Ziffern bestehen');

// German phone number validation (flexible format)
export const phoneNumberSchema = z
  .string()
  .min(1, 'Telefonnummer ist erforderlich')
  .regex(
    /^(\+49|0)[1-9]\d{1,14}$/,
    'Bitte geben Sie eine gültige deutsche Telefonnummer ein'
  );

// Email validation with German-specific TLDs
export const emailSchema = z
  .string()
  .min(1, 'E-Mail-Adresse ist erforderlich')
  .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
  .toLowerCase();

// Company name validation
export const companyNameSchema = z
  .string()
  .min(2, 'Firmenname muss mindestens 2 Zeichen haben')
  .max(100, 'Firmenname darf maximal 100 Zeichen haben')
  .trim();

// Contact name validation
export const contactNameSchema = z
  .string()
  .min(2, 'Name muss mindestens 2 Zeichen haben')
  .max(50, 'Name darf maximal 50 Zeichen haben')
  .trim();

// Date validation (must be in the future)
export const startDateSchema = z
  .string()
  .min(1, 'Startdatum ist erforderlich')
  .refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Startdatum muss in der Zukunft liegen');

// Main form schema
export const formSchema = z.object({
  // Company Information (Step 1)
  unternehmen: companyNameSchema,
  plz: germanPostalCodeSchema,
  land: z.enum(countryValues).refine(
    (value) => countryValues.includes(value as any),
    { message: 'Bitte wählen Sie ein Land aus' }
  ),

  // Contact Information (Step 2)
  name: contactNameSchema,
  telefonnummer: phoneNumberSchema,
  emailadresse: emailSchema,

  // Project Information (Step 3)
  dsbVorhanden: z.enum(dsbValues).refine(
    (value) => dsbValues.includes(value as any),
    { message: 'Bitte wählen Sie eine Option aus' }
  ),
  start: startDateSchema,
  unternehmensgroesse: z.enum(companySizeValues).refine(
    (value) => companySizeValues.includes(value as any),
    { message: 'Bitte wählen Sie eine Unternehmensgröße aus' }
  ),

  // GDPR Consent (Step 4 - Review)
  gdprConsent: z
    .boolean()
    .refine((value) => value === true, {
      message: 'Sie müssen der Datenschutzerklärung zustimmen',
    }),
});

// Infer TypeScript type from schema
export type FormData = z.infer<typeof formSchema>;

// Export individual field types for component props
export type CountryCode = (typeof COUNTRIES)[number]['value'];
export type CompanySize = (typeof COMPANY_SIZES)[number]['value'];
export type DSBOption = (typeof DSB_OPTIONS)[number]['value'];

// Step-specific schemas for validation
export const companyStepSchema = z.object({
  unternehmen: companyNameSchema,
  plz: germanPostalCodeSchema,
  land: z.enum(countryValues).refine(
    (value) => countryValues.includes(value as any),
    { message: 'Bitte wählen Sie ein Land aus' }
  ),
});

export const contactStepSchema = z.object({
  name: contactNameSchema,
  telefonnummer: phoneNumberSchema,
  emailadresse: emailSchema,
});

export const projectStepSchema = z.object({
  dsbVorhanden: z.enum(dsbValues).refine(
    (value) => dsbValues.includes(value as any),
    { message: 'Bitte wählen Sie eine Option aus' }
  ),
  start: startDateSchema,
  unternehmensgroesse: z.enum(companySizeValues).refine(
    (value) => companySizeValues.includes(value as any),
    { message: 'Bitte wählen Sie eine Unternehmensgröße aus' }
  ),
});

export const reviewStepSchema = formSchema;

// Step-specific types
export type CompanyStepData = z.infer<typeof companyStepSchema>;
export type ContactStepData = z.infer<typeof contactStepSchema>;
export type ProjectStepData = z.infer<typeof projectStepSchema>;
export type ReviewStepData = z.infer<typeof reviewStepSchema>;
