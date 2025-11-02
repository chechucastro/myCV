import { createI18n } from 'vue-i18n'
import type { I18n, I18nOptions } from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'

// Type for supported locales
export type Locale = 'en' | 'es' | 'fr'

// Valid locales array for validation
const VALID_LOCALES: readonly Locale[] = ['en', 'es', 'fr'] as const

/**
 * Retrieves the saved locale from localStorage
 * Falls back to 'en' if no valid locale is found
 * @returns The saved locale or 'en' as default
 */
const getSavedLocale = (): Locale => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'en'
  }

  try {
    const savedLocale = localStorage.getItem('locale') as Locale | null

    // Validate that the saved locale is one of the supported locales
    if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
      return savedLocale
    }
  } catch (error) {
    // localStorage might not be available (e.g., in some testing environments)
    console.warn('Could not retrieve locale from localStorage:', error)
  }

  // Default to English if no valid locale is found
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
