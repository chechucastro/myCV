<template>
  <header
    role="banner"
    aria-labelledby="site-title"
    class="relative w-screen overflow-hidden"
    style="margin-left: calc((100vw - 100%) / -2); margin-right: calc((100vw - 100%) / -2)"
  >
    <nav
      class="fixed top-0 right-0 left-0 z-50 w-screen bg-white transition-all duration-300 dark:border-neutral-700/50 dark:bg-gradient-to-br dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"
      :class="{ 'shadow-md': isScrolled }"
      role="navigation"
      aria-label="Primary navigation"
    >
      <div class="flex h-full items-center justify-between px-3 py-1.5 sm:px-6">
        <!-- Hero content in nav when scrolled -->
        <transition name="fade-slide">
          <NavigationHeader
            v-if="isScrolled || showNameInNav"
            :name="name"
            :job-title="jobTitle"
            :tech-stack="techStack"
            :profile-image="profileImage"
            :is-scrolled="isScrolled"
            :show-name-in-nav="showNameInNav"
          />
        </transition>
        <div v-if="!isScrolled && !showNameInNav" class="flex-1"></div>

        <ul class="flex items-center gap-4">
          <!-- Dark mode button -->
          <li>
            <ThemeToggle />
          </li>
          <li>
            <!-- Vertical separator -->
            <div class="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
          </li>
          <li class="flex items-center">
            <!-- Language selector -->
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <HeroSection
      :is-scrolled="isScrolled"
      :name="name"
      :job-title="jobTitle"
      :tech-stack="techStack"
      :profile-image="profileImage"
    />
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import LanguageSelector from './LanguageSelector.vue'
import NavigationHeader from './NavigationHeader.vue'
import HeroSection from './HeroSection.vue'

interface Props {
  name?: string
  jobTitle?: string
  techStack?: string
  profileImage?: string
  isScrolled: boolean
  showNameInNav: boolean
}

withDefaults(defineProps<Props>(), {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
})
</script>

<style scoped>
/* Fade slide transition for navigation name */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
