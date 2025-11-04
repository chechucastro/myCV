import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import gtm from './plugins/gtm'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(gtm, {
  id: 'GTM-5PZSPQJ5',
  enabled: true,
  debug: import.meta.env.DEV, // Enable debug mode in development
})
app.use(router)

app.mount('#app')
