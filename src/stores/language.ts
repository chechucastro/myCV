import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Composer } from 'vue-i18n'
import type { Locale } from '@/plugins/i18n'

/**
 * Language store using Pinia
 * Manages the application's current language and persists it to localStorage
 */
export const useLanguageStore = defineStore('language', () => {
  // State
  const currentLocale = ref<Locale>('en')
  
  // Initialize i18n (will be set from component)
  let i18nInstance: Composer | null = null

  /**
   * Initialize the store with i18n instance
   * Should be called once when the app starts
   */
  const initialize = () => {
    // Always default to English
    currentLocale.value = 'en'
    localStorage.setItem('locale', 'en')
    
    // Try to get i18n instance if in component context
    try {
      i18nInstance = useI18n()
      if (i18nInstance) {
        i18nInstance.locale.value = 'en'
      }
    } catch (error) {
      // useI18n() not available yet, will be set later
      console.log('i18n not yet available in store initialization')
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
    
    // Update i18n locale if available
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

