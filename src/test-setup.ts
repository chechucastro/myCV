import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    fr,
  },
  allowComposition: true,
})

const pinia = createPinia()

config.global.plugins = [i18n, pinia]
config.global.stubs = {
  RouterLink: true,
}
