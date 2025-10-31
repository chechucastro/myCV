import { ref, type Ref } from 'vue'

/**
 * Composable for managing dark mode theme
 * Follows Single Responsibility Principle - only handles theme state
 */
export function useTheme() {
  const isDark: Ref<boolean> = ref<boolean>(false)

  const toggleDark = (): void => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    isDark,
    toggleDark,
  }
}

