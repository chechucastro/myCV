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
        class="mx-auto flex max-w-7xl flex-col gap-8 px-1 py-8 sm:px-4 lg:flex-row lg:items-start lg:px-8"
      >
        <!-- Sidebar -->
        <CVSidebar ref="sidebarRef" />

        <!-- Main article content -->
        <CVArticle />
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, type Ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SkipToContent from '@/components/atoms/SkipToContent/SkipToContent.vue'
import AppHeader from '@/components/organisms/AppHeader.vue'
import CVSidebar from '@/components/organisms/CVSidebar.vue'
import CVArticle from '@/components/organisms/CVArticle.vue'
import { useScroll } from '@/composables/useScroll'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import type { ContactInfo } from '@/types'

// Use scroll composable
const { isScrolled } = useScroll()

// Sidebar ref to access contactInfo
const sidebarRef = ref<InstanceType<typeof CVSidebar> | null>(null)

// Get contactInfo from sidebar
const contactInfo = computed<ContactInfo | undefined>(() => {
  return sidebarRef.value?.contactInfo
})

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

onMounted(() => {
  // Setup scroll reveal animations
  setupScrollReveal()

  // Track scroll events for first scroll detection
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Check initial scroll position
  handleScroll()

  // Observe hero section to track visibility and show name in navigation
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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // Disconnect observer to ensure bfcache compatibility
  if (heroObserver) {
    heroObserver.disconnect()
    heroObserver = null
  }
})
</script>

<style scoped>
/* Scroll reveal animations */
.scroll-reveal {
  opacity: 0;
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
