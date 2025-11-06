import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Composer } from 'vue-i18n'
import type { Locale } from '@/plugins/i18n'
import i18n from '@/plugins/i18n'

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
        console.log(
          '[Language] Saved locale is "en" (default), but browser language is different. Using browser language:',
          detectedLocale,
        )
        return detectedLocale
      }

      // Otherwise, use saved locale (user's manual preference)
      console.log('[Language] Using saved locale from localStorage:', savedLocale)
      return savedLocale
    }
  } catch (error) {
    // localStorage might not be available (e.g., in some testing environments)
    console.warn('Could not retrieve locale from localStorage:', error)
  }

  // If no saved locale, use detected browser language
  console.log(
    '[Language] No saved locale found, detected browser language:',
    detectedLocale,
    'from:',
    navigator.language,
  )
  return detectedLocale
}

/**
 * Language store using Pinia
 * Manages the application's current language and persists it to localStorage
 */
export const useLanguageStore = defineStore('language', () => {
  // Initialize state with saved locale from localStorage
  const savedLocale = getSavedLocale()
  const currentLocale = ref<Locale>(savedLocale)

  // Initialize i18n (will be set from component)
  let i18nInstance: Composer | null = null

  /**
   * Initialize the store with i18n instance
   * Should be called once when the app starts
   * Syncs with i18n and updates document lang attribute
   */
  const initialize = () => {
    // Get the current locale from store state (already initialized from localStorage or browser detection)
    const locale = currentLocale.value

    // Sync i18n with store's locale using the global i18n instance
    // Use globalProperties for legacy mode or direct access for composition mode
    if (i18n && i18n.global && i18n.global.locale) {
      const localeRef = i18n.global.locale
      if (typeof localeRef === 'object' && 'value' in localeRef) {
        localeRef.value = locale
      }
    }

    // Try to get i18n composable instance if in component context (for later updates)
    try {
      i18nInstance = useI18n()
    } catch {
      // useI18n() not available yet, will be set later when called from a component
      // This is fine - we've already synced with the global i18n instance above
    }

    // Update document lang attribute for accessibility
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale)
    }

    // Note: We don't save the detected locale to localStorage here
    // Only save when user manually selects a language via setLocale()
    // This allows browser language detection to work on every visit if no manual preference exists
  }

  /**
   * Set the current language
   * @param locale - The locale to set ('en', 'es', or 'fr')
   */
  const setLocale = (locale: Locale) => {
    currentLocale.value = locale

    // Persist to localStorage
    localStorage.setItem('locale', locale)

    // Update i18n locale using global instance (always available)
    if (i18n && i18n.global && i18n.global.locale) {
      const localeRef = i18n.global.locale
      if (typeof localeRef === 'object' && 'value' in localeRef) {
        localeRef.value = locale
      }
    }

    // Also update i18n composable instance if available (for component reactivity)
    if (i18nInstance) {
      i18nInstance.locale.value = locale
    }

    // Update document lang attribute for accessibility
    document.documentElement.setAttribute('lang', locale)
  }

  /**
   * Get the display name for a locale
   */
  const getLocaleName = computed(() => {
    const names: Record<Locale, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
    }
    return names[currentLocale.value]
  })

  /**
   * Get all available locales
   */
  const availableLocales = computed<Locale[]>(() => ['en', 'es', 'fr'])

  // Initialize on store creation
  initialize()

  return {
    // State
    currentLocale,

    // Getters
    getLocaleName,
    availableLocales,

    // Actions
    setLocale,
    initialize,
  }
})
