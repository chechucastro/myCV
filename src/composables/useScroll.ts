import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Composable for managing scroll-related state
 * Follows Single Responsibility Principle - only handles scroll tracking
 */
export function useScroll() {
  const isScrolled: Ref<boolean> = ref<boolean>(false)

  const handleScroll = (): void => {
    const scrollY = window.scrollY
    isScrolled.value = scrollY > 50 // Start collapsing after 50px scroll
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial scroll position
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isScrolled,
  }
}

