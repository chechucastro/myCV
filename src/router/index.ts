import { createRouter, createWebHistory } from 'vue-router'
import { trackPageView } from '@/composables/useGoogleAnalytics'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Lazy load the home view for better initial bundle size
      component: () => import('../views/HomeView.vue'),
    },
  ],
})

// Track page views on route changes
router.afterEach((to) => {
  trackPageView(to.path, document.title)
})

export default router
