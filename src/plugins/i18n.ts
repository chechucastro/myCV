import { createI18n } from 'vue-i18n'
import type { I18n, I18nOptions } from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'

// Type for supported locales
export type Locale = 'en' | 'es' | 'fr'

// Always default to English
const getSavedLocale = (): Locale => {
  // Force English as default
  return 'en'
}

// i18n configuration options
const options: I18nOptions = {
  legacy: false, // Use Composition API mode
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    fr,
  },
  // Additional settings for better compatibility
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
  // Enable returning objects/arrays from translations
  allowComposition: true,
}

// Create i18n instance
const i18n: I18n = createI18n(options)

export default i18n

