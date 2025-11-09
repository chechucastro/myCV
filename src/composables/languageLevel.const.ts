export const LANGUAGE_LEVEL = {
  NATIVE: 'Native',
  FLUENT: 'Fluent',
  PROFESSIONAL: 'Professional',
  CONVERSATIONAL: 'Conversational',
  BASIC: 'Basic',
} as const

export type LanguageLevelValue = (typeof LANGUAGE_LEVEL)[keyof typeof LANGUAGE_LEVEL]
