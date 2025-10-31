<template>
  <DefaultLayout aria-label="Main layout">
    <!-- Skip to main content for keyboard users -->
    <SkipToContent />

    <!-- Header with navigation and hero section -->
    <AppHeader
      :is-scrolled="isScrolled"
      :show-name-in-nav="showNameInNav"
      :name="contactInfo.name"
      :job-title="contactInfo.jobTitle"
      :tech-stack="contactInfo.techStack"
      :profile-image="contactInfo.profileImage"
    />

    <main
      id="maincontent"
      role="main"
      tabindex="-1"
      aria-label="Primary content"
      class="relative bg-white dark:bg-neutral-950"
    >
      <div class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 lg:flex-row lg:px-8">
        <!-- Sidebar -->
        <CVSidebar :skills="skills" :languages="languages" :contact-info="contactInfo" />

        <!-- Main article content -->
        <CVArticle :sections="articleSections" />
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SkipToContent from '@/components/header/SkipToContent.vue'
import AppHeader from '@/components/header/AppHeader.vue'
import CVSidebar from '@/components/sidebar/CVSidebar.vue'
import CVArticle from '@/components/article/CVArticle.vue'
import { useScroll } from '@/composables/useScroll'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { skills, languages, articleSections, contactInfo } from '@/data/cv-data'

// Use scroll composable
const { isScrolled } = useScroll()

// Use intersection observer composable
const { observeElement, setupScrollReveal } = useIntersectionObserver()

// Show name in navigation when scrolled past hero section
const showNameInNav: Ref<boolean> = ref<boolean>(false)

onMounted(() => {
  // Setup scroll reveal animations
  setupScrollReveal()

  // Observe hero section to show name in navigation when hero is no longer in view
  observeElement(
    'hero-section',
    (entry: IntersectionObserverEntry): void => {
      // Show name when hero section is NOT in view (scrolled past it)
      // Hide name when hero section IS in view (only if not scrolled)
      if (!isScrolled.value) {
        showNameInNav.value = !entry.isIntersecting
      }
    },
    { threshold: 0, rootMargin: '0px' },
    false, // Keep observing continuously
  )
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
