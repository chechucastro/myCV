<template>
  <BaseButton
    v-if="props.showNav"
    button-type="button"
    variant="outline"
    color="purple"
    size="sm"
    :aria-label="props.ariaLabel"
    custom-classes="!fixed !right-0 !bottom-0 !z-40 !p-0 !m-0 !bg-transparent !border-0 !shadow-none !rounded-none !font-normal overflow-visible transition-all duration-300 hover:opacity-90  focus:outline-none "
    @click="scrollToDetails"
  >
    <!-- Triangle ribbon in bottom right corner -->
    <div
      class="ribbon relative flex h-14 w-14 items-center justify-center overflow-visible bg-linear-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50 transition-all duration-300 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:shadow-purple-400/50 dark:hover:from-purple-600 dark:hover:to-blue-600"
    >
      <!-- Download icon -->
      <svg
        class="absolute right-0 bottom-0 z-10 h-4.5 w-4.5 text-white drop-shadow-md"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
      <!-- Text positioned vertically along the base of the triangle -->
      <span
        class="pointer-events-none absolute bottom-[6%] left-[50%] z-10 block origin-left -rotate-45 text-[0.75rem] font-bold tracking-wide whitespace-nowrap text-white! opacity-100 drop-shadow-lg"
      >
        PDF
      </span>
    </div>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'

interface Props {
  ariaLabel?: string
  targetId?: string
  showNav?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Scroll to Details section to download CV',
  targetId: 'download-buttons-container',
  showNav: false,
})

/**
 * Scroll to the Details section smoothly and highlight download buttons
 * Stops scroll when second button is aligned with ribbon at the right edge of viewport
 */
const scrollToDetails = (): void => {
  const lightButton = document.getElementById('download-cv-light-button')
  const ribbonButton = document.querySelector('[aria-label*="Scroll to Details"]') as HTMLElement

  if (!lightButton || !ribbonButton) {
    // Fallback: simple scroll if elements not found
    const targetElement = document.getElementById(props.targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      setTimeout(() => {
        const fullButton = document.getElementById('download-cv-full-button')
        const lightButton = document.getElementById('download-cv-light-button')

        if (fullButton) {
          fullButton.classList.add('highlight-download')
        }
        if (lightButton) {
          lightButton.classList.add('highlight-download')
        }

        setTimeout(() => {
          if (fullButton) {
            fullButton.classList.remove('highlight-download')
          }
          if (lightButton) {
            lightButton.classList.remove('highlight-download')
          }
        }, 2000)
      }, 300)
    }
    return
  }

  // Scroll directly to the second button in one go, aligning it with the ribbon
  lightButton.scrollIntoView({
    behavior: 'smooth',
    block: 'end', // Align to bottom of viewport (near ribbon)
    inline: 'end', // Align to right edge of viewport (align with ribbon)
  })

  // After 300ms, apply effects to buttons
  setTimeout(() => {
    const fullButton = document.getElementById('download-cv-full-button')

    if (fullButton) {
      fullButton.classList.add('highlight-download')
    }
    if (lightButton) {
      lightButton.classList.add('highlight-download')
    }

    // After 2 seconds, remove effects
    setTimeout(() => {
      if (fullButton) {
        fullButton.classList.remove('highlight-download')
      }
      if (lightButton) {
        lightButton.classList.remove('highlight-download')
      }
    }, 2000) // 2 seconds to show the effect
  }, 300) // 300ms after scroll starts
}
</script>

<style scoped>
.ribbon {
  /* Proper triangle shape in bottom right corner */
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}
</style>
