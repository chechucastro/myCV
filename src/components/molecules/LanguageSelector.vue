<template>
  <select
    v-model="currentLocale"
    name="language"
    id="language"
    :aria-label="t('language.select')"
    class="cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 focus:outline-none dark:text-white dark:hover:bg-neutral-800"
  >
    <option v-for="locale in availableLocales" :key="locale" :value="locale">
      {{ getFlagIcon(locale) }} {{ t(`language.${locale}`) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import { useAccessibility } from '@/composables/useAccessibility'
import { trackLanguageChange } from '@/composables/useGoogleAnalytics'
import type { Locale } from '@/plugins/i18n'

/**
 * Language Selector Component
 * Allows users to switch between available languages
 * Integrates with i18n and Pinia store for state management
 */

const { t, locale } = useI18n()
const languageStore = useLanguageStore()
const { announceToScreenReader } = useAccessibility()

// Sync component's i18n locale with store locale
watch(
  () => languageStore.currentLocale,
  (newLocale) => {
    locale.value = newLocale
  },
  { immediate: true },
)

// Computed property for two-way binding with select element
const currentLocale = computed<Locale>({
  get: () => languageStore.currentLocale,
  set: (value: Locale) => {
    const previousLocale = languageStore.currentLocale
    
    // Update store first (this updates i18n.global.locale.value)
    languageStore.setLocale(value)
    // Immediately update component's locale for instant reactivity
    locale.value = value

    // Track language change
    if (previousLocale !== value) {
      trackLanguageChange(previousLocale, value)
    }

    // Announce change for screen readers (use nextTick to ensure translations are updated)
    nextTick(() => {
      const message = `${t('language.select')}: ${t(`language.${value}`)}`
      announceToScreenReader(message)
    })
  },
})

// Available locales from store
const availableLocales = computed(() => languageStore.availableLocales)

/**
 * Get flag emoji for a locale
 */
const getFlagIcon = (locale: Locale): string => {
  const flagMap: Record<Locale, string> = {
    en: '🇬🇧',
    es: '🇪🇸',
    fr: '🇫🇷',
  }
  return flagMap[locale] || ''
}
</script>
