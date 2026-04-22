<template>
  <div
    id="hero-section"
    class="relative flex w-full items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100 px-8 transition-all duration-500 sm:px-12 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"
    :class="isScrolled ? 'h-24 pt-16' : 'h-screen'"
  >
    <div v-if="!isScrolled" class="relative z-10 max-w-4xl text-center">
      <div class="fade-in-up space-y-6">
        <!-- Profile Image -->
        <div class="flex justify-center">
          <div class="relative">
            <img
              :src="profileImage"
              :alt="name"
              loading="eager"
              fetchpriority="high"
              width="160"
              height="160"
              class="profile-image-fall mx-auto h-32 w-32 rounded-full border-4 border-gray-200 shadow-2xl transition-transform duration-300 hover:scale-105 sm:h-40 sm:w-40 dark:border-neutral-700"
            />
            <div
              class="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 hover:opacity-100"
            ></div>
          </div>
        </div>
        <h1
          id="site-title"
          class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl dark:text-white"
        >
          <span
            class="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
          >
            {{ name }}
          </span>
        </h1>
        <p class="text-xl font-medium text-gray-600 sm:text-2xl md:text-3xl dark:text-white">
          {{ jobTitle }}
        </p>
        <p class="mx-auto max-w-2xl text-lg text-gray-500 sm:text-xl dark:text-white">
          {{ techStack }}
        </p>
      </div>
    </div>
    <button
      v-if="!isScrolled"
      type="button"
      class="scroll-indicator absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      aria-label="Scroll to next section"
      @click="scrollToNextSection"
    >
      <span class="scroll-arrow"></span>
      <span class="scroll-arrow scroll-arrow-delayed"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isScrolled: boolean
  name?: string
  jobTitle?: string
  techStack?: string
  profileImage?: string
}

withDefaults(defineProps<Props>(), {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
})

const scrollToNextSection = () => {
  emit('collapseHero')
}

const emit = defineEmits<{
  collapseHero: []
}>()
</script>

<style scoped>
/* Fade in up animation */
.fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0.01;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Profile image fall animation */
.profile-image-fall {
  animation: fallFromTop 1s ease-out forwards;
  opacity: 0.01;
}

@keyframes fallFromTop {
  from {
    opacity: 0.01;
    transform: translateY(-100px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.scroll-indicator {
  opacity: 0.9;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}

.scroll-indicator:focus-visible {
  outline: 2px solid rgb(59 130 246 / 0.8);
  outline-offset: 8px;
  border-radius: 4px;
}

.scroll-arrow {
  width: 28px;
  height: 28px;
  margin-top: 6px;
  border-right: 4px solid rgb(71 85 105 / 0.85);
  border-bottom: 4px solid rgb(71 85 105 / 0.85);
  transform: rotate(45deg);
  animation: arrowPulseDown 1.6s ease-in-out infinite;
}

.scroll-arrow-delayed {
  animation-delay: 0.28s;
}

:global(.dark) .scroll-arrow {
  border-right-color: rgb(226 232 240 / 0.75);
  border-bottom-color: rgb(226 232 240 / 0.75);
}

@keyframes arrowPulseDown {
  0%,
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(-2px, -2px);
  }
  35% {
    opacity: 1;
  }
  50% {
    transform: rotate(45deg) translate(2px, 2px);
  }
}
</style>
