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

// Track if page was restored from bfcache
let isRestoredFromBfcache = false

// Handle pageshow event to detect bfcache restoration
if (typeof window !== 'undefined') {
  window.addEventListener('pageshow', (event: PageTransitionEvent) => {
    isRestoredFromBfcache = event.persisted
    // Reset flag after a short delay to allow router navigation to complete
    setTimeout(() => {
      isRestoredFromBfcache = false
    }, 100)
  })
}

// Track page views on route changes (but not on bfcache restoration)
router.afterEach((to) => {
  // Don't track page views when restored from bfcache to avoid duplicate tracking
  if (!isRestoredFromBfcache) {
    trackPageView(to.path, document.title)
  }
})

export default router
