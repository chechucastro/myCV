import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Composer } from 'vue-i18n'
import type { Locale } from '@/plugins/i18n'
import i18n from '@/plugins/i18n'

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
    // Get the current locale from store state (already initialized from localStorage)
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

    // Ensure localStorage has the current locale (in case it was missing or invalid)
    if (typeof window !== 'undefined') {
      const existingLocale = localStorage.getItem('locale')
      if (!existingLocale || !VALID_LOCALES.includes(existingLocale as Locale)) {
        localStorage.setItem('locale', locale)
      }
    }
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
