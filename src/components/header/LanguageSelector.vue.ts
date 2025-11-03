
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import { useAccessibility } from '@/composables/useAccessibility'
import type { Locale } from '@/plugins/i18n'

/**
 * Language Selector Component
 * Allows users to switch between available languages
 * Integrates with i18n and Pinia store for state management
 */

const { t, locale } = useI18n()
const languageStore = useLanguageStore()
const { announceToScreenReader } = useAccessibility()

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
  announceToScreenReader(message)
}
export default (await import('vue')).defineComponent({
setup() {
() => {
{
// @ts-ignore
(currentLocale);
// @ts-ignore
(t('language.select'));
// @ts-ignore
() => { handleLanguageChange };
// @ts-ignore
for (let locale of availableLocales) {
{
// @ts-ignore
(locale);
// @ts-ignore
(locale);
// @ts-ignore
{  t(`language.${locale}`)  };
}
}
}
};
return { };
},
});
