import { ref, type Ref } from 'vue'

const THEME_STORAGE_KEY = 'theme-preference'

/**
 * Retrieves the saved theme preference from localStorage
 * Defaults to dark mode if no preference is found
 * @returns true for dark mode, false for light mode
 */
const getSavedTheme = (): boolean => {
  if (typeof window === 'undefined') {
    return true // Default to dark mode in SSR
  }

  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme === 'dark') {
      return true
    }
    if (savedTheme === 'light') {
      return false
    }
  } catch (error) {
    console.warn('Could not retrieve theme from localStorage:', error)
  }

  // Default to dark mode
  return true
}

/**
 * Apply theme to document
 */
const applyTheme = (dark: boolean): void => {
  if (typeof document === 'undefined') {
    return
  }
  
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/**
 * Composable for managing dark mode theme
 * Follows Single Responsibility Principle - only handles theme state
 * Persists theme preference to localStorage
 */
export function useTheme() {
  // Initialize with saved preference or default to dark mode
  const savedTheme = getSavedTheme()
  const isDark: Ref<boolean> = ref<boolean>(savedTheme)

  // Apply theme immediately on initialization
  applyTheme(savedTheme)

  /**
   * Save theme preference to localStorage
   */
  const saveTheme = (dark: boolean): void => {
    if (typeof window === 'undefined') {
      return
    }
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light')
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error)
    }
  }

  /**
   * Toggle dark mode on/off
   */
  const toggleDark = (): void => {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
    saveTheme(isDark.value)
  }

  return {
    isDark,
    toggleDark,
  }
}

