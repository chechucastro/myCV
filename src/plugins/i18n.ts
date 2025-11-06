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
 * Detects the browser language and returns a supported locale
 * @returns A supported locale based on browser language, or 'en' as default
 */
const detectBrowserLocale = (): Locale => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || !navigator || !navigator.language) {
    return 'en'
  }

  // Get browser language (e.g., 'en', 'en-US', 'es-ES', 'fr-FR')
  const browserLang = navigator.language.toLowerCase()

  // Extract the base language code (e.g., 'en' from 'en-US')
  const baseLang = browserLang.split('-')[0] as string

  // Check if the base language is in our supported locales
  if (VALID_LOCALES.includes(baseLang as Locale)) {
    return baseLang as Locale
  }

  // Check all browser languages (navigator.languages) if available
  if (navigator.languages && Array.isArray(navigator.languages)) {
    for (const lang of navigator.languages) {
      const base = lang.toLowerCase().split('-')[0]
      if (VALID_LOCALES.includes(base as Locale)) {
        return base as Locale
      }
    }
  }

  // Default to English if no supported language is found
  return 'en'
}

/**
 * Retrieves the saved locale from localStorage or detects browser language
 * Falls back to 'en' if no valid locale is found
 * @returns The saved locale, detected browser locale, or 'en' as default
 */
const getSavedLocale = (): Locale => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'en'
  }

  // First, detect browser language
  const detectedLocale = detectBrowserLocale()

  try {
    const savedLocale = localStorage.getItem('locale') as Locale | null

    // If there's a saved locale and it's valid
    if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
      // If saved locale is 'en' (default) but browser language is different,
      // prefer browser language (likely the user's actual preference)
      if (savedLocale === 'en' && detectedLocale !== 'en') {
        console.log('[i18n] Saved locale is "en" (default), but browser language is different. Using browser language:', detectedLocale)
        return detectedLocale
      }
      
      // Otherwise, use saved locale (user's manual preference)
      console.log('[i18n] Using saved locale from localStorage:', savedLocale)
      return savedLocale
    }
  } catch (error) {
    // localStorage might not be available (e.g., in some testing environments)
    console.warn('Could not retrieve locale from localStorage:', error)
  }

  // If no saved locale, use detected browser language
  console.log('[i18n] No saved locale found, detected browser language:', detectedLocale, 'from:', navigator.language)
  return detectedLocale
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
