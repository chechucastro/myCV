<template>
  <div class="base-carousel-container" :style="carouselStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'BaseCarousel',
})

interface Props {
  itemsPerViewMobile?: number
  itemsPerViewDesktop?: number
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerViewMobile: 1,
  itemsPerViewDesktop: 2,
  gap: 1.5,
})

/**
 * Computed style for carousel container
 */
const carouselStyle = computed(() => {
  const gapPx = `${props.gap * 16}px`
  const mobileWidth = `calc((100% - ${(props.itemsPerViewMobile - 1) * props.gap}rem) / ${props.itemsPerViewMobile})`
  const desktopWidth = `calc((100% - ${(props.itemsPerViewDesktop - 1) * props.gap}rem) / ${props.itemsPerViewDesktop})`

  return {
    '--carousel-gap': gapPx,
    '--carousel-mobile-width': mobileWidth,
    '--carousel-desktop-width': desktopWidth,
  } as CSSStyleDeclaration & {
    '--carousel-gap': string
    '--carousel-mobile-width': string
    '--carousel-desktop-width': string
  }
})
</script>

<style scoped>
.base-carousel-container {
  display: flex;
  gap: var(--carousel-gap);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 1rem;
}

.base-carousel-container::-webkit-scrollbar {
  display: none;
}

/* Default styles for carousel items - can be overridden by children */
.base-carousel-container > :deep(*) {
  flex-shrink: 0;
  scroll-snap-align: start;
  width: var(--carousel-mobile-width);
}

@media (min-width: 640px) {
  .base-carousel-container > :deep(*) {
    width: var(--carousel-desktop-width);
  }
}
</style>
