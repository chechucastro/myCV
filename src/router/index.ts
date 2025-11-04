import { createRouter, createWebHistory } from 'vue-router'

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

export default router
