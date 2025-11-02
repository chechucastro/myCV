<template>
  <select
    v-model="currentLocale"
    name="language"
    id="language"
    :aria-label="t('language.select')"
    class="cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 focus:outline-none dark:text-white dark:hover:bg-neutral-800"
    @change="handleLanguageChange"
  >
    <option v-for="locale in availableLocales" :key="locale" :value="locale">
      {{ t(`language.${locale}`) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import type { Locale } from '@/plugins/i18n'

/**
 * Language Selector Component
 * Allows users to switch between available languages
 * Integrates with i18n and Pinia store for state management
 */

const { t, locale } = useI18n()
const languageStore = useLanguageStore()

// Computed property for two-way binding with select element
const currentLocale = computed<Locale>({
  get: () => languageStore.currentLocale,
  set: (value: Locale) => {
    languageStore.setLocale(value)
  },
})

// Available locales from store
const availableLocales = computed(() => languageStore.availableLocales)

/**
 * Handle language change event
 * Updates both i18n and store
 */
const handleLanguageChange = () => {
  // Update i18n locale
  locale.value = currentLocale.value
  
  // Announce change for screen readers
  const message = `${t('language.select')}: ${t(`language.${currentLocale.value}`)}`
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'polite')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)
  setTimeout(() => document.body.removeChild(announcement), 1000)
}
</script>

