<template>
  <DefaultLayout aria-label="Main layout">
    <!-- Skip to main content for keyboard users -->
    <SkipToContent />

    <!-- Header with navigation and hero section -->
    <AppHeader
      :is-scrolled="isScrolled"
      :show-name-in-nav="showNameInNav"
      :show-nav="showNav"
      :name="contactInfo?.name || 'Chechu Castro'"
      :job-title="contactInfo?.jobTitle || 'UI Frontend Web Developer'"
      :tech-stack="contactInfo?.techStack || 'VueJS • Quasar • Nuxt • TailwindCSS'"
      :profile-image="contactInfo?.profileImage || '/chechuLinkedInOpentoWork.webp'"
    />

    <main
      id="maincontent"
      role="main"
      tabindex="-1"
      aria-label="Primary content"
      class="relative bg-white transition-all duration-300 dark:bg-neutral-950"
      :class="{ 'pt-20 sm:pt-24': showNav }"
    >
      <div
        class="mx-auto max-w-7xl px-1 py-8 sm:px-4 lg:px-8"
      >
        <!-- Main article content -->
        <CVArticle />
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, type Ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SkipToContent from '@/components/atoms/SkipToContent/SkipToContent.vue'
import AppHeader from '@/components/organisms/AppHeader.vue'
import AppFooter from '@/components/organisms/AppFooter.vue'
import CVArticle from '@/components/organisms/CVArticle.vue'
import { useScroll } from '@/composables/useScroll'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { CONTACT_INFO } from '@/config/constants'

// Use scroll composable
const { isScrolled } = useScroll()

// Use shared contactInfo constant
const contactInfo = computed(() => CONTACT_INFO)

// Use intersection observer composable
const { observeElement, setupScrollReveal } = useIntersectionObserver()

// Show name in navigation when scrolled past hero section
const showNameInNav: Ref<boolean> = ref<boolean>(false)

// Track if user has scrolled at least once
const hasScrolled: Ref<boolean> = ref<boolean>(false)

// Track if hero section is visible
const isHeroVisible: Ref<boolean> = ref<boolean>(true)

// Show navigation only after first scroll and when hero is not visible
const showNav = computed(() => hasScrolled.value && !isHeroVisible.value)

// Track scroll to detect first scroll
const handleScroll = (): void => {
  if (window.scrollY > 0 && !hasScrolled.value) {
    hasScrolled.value = true
  }
}

// Store hero observer reference for cleanup
let heroObserver: IntersectionObserver | null = null
let isScrollListenerActive = false

/**
 * Initialize scroll listener
 */
const initScrollListener = (): void => {
  if (!isScrollListenerActive) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    isScrollListenerActive = true
    handleScroll() // Check initial scroll position
  }
}

/**
 * Cleanup function for event listeners and observers
 * Called on both unmount and pagehide (bfcache)
 */
const cleanup = (): void => {
  if (isScrollListenerActive) {
    window.removeEventListener('scroll', handleScroll)
    isScrollListenerActive = false
  }
  if (heroObserver) {
    heroObserver.disconnect()
    heroObserver = null
  }
}

/**
 * Initialize hero observer
 */
const initializeHeroObserver = (): void => {
  // Clean up existing observer if any
  if (heroObserver) {
    heroObserver.disconnect()
    heroObserver = null
  }

  nextTick(() => {
    const heroElement = document.getElementById('hero-section')
    if (heroElement) {
      heroObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            // Update hero visibility (trigger on both entry and exit)
            isHeroVisible.value = entry.isIntersecting

            // Show name when hero section is NOT in view (scrolled past it)
            // Hide name when hero section IS in view (only if not scrolled)
            if (!isScrolled.value) {
              showNameInNav.value = !entry.isIntersecting
            }
          })
        },
        { threshold: 0, rootMargin: '0px' },
      )
      heroObserver.observe(heroElement)
    }
  })
}

/**
 * Handle pagehide event for bfcache compatibility
 */
const handlePageHide = (event: PageTransitionEvent): void => {
  if (event.persisted) {
    // Page is being cached, clean up resources
    cleanup()
  }
}

/**
 * Handle pageshow event for bfcache restoration
 */
const handlePageShow = (event: PageTransitionEvent): void => {
  if (event.persisted) {
    // Page was restored from bfcache, reinitialize observers and listeners
    initScrollListener()
    initializeHeroObserver()
  }
}

onMounted(() => {
  // Setup scroll reveal animations
  setupScrollReveal()

  // Initialize scroll listener
  initScrollListener()

  // Setup bfcache handlers
  window.addEventListener('pagehide', handlePageHide)
  window.addEventListener('pageshow', handlePageShow)

  // Observe hero section to track visibility and show name in navigation
  initializeHeroObserver()
})

onUnmounted(() => {
  window.removeEventListener('pagehide', handlePageHide)
  window.removeEventListener('pageshow', handlePageShow)
  cleanup()
})
</script>

<style scoped>
/* Scroll reveal animations */
.scroll-reveal {
  opacity: 0.01;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
