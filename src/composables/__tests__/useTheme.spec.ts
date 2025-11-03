import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    // Clean up document classes and localStorage before each test
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })

  afterEach(() => {
    // Clean up after each test
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })

  it('should initialize with isDark as true (dark mode default)', () => {
    const { isDark } = useTheme()
    expect(isDark.value).toBe(true)
  })

  it('should initialize with dark mode applied to document', () => {
    const { isDark } = useTheme()
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should toggle dark mode off', () => {
    const { isDark, toggleDark } = useTheme()

    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    toggleDark()

    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should toggle dark mode on after being toggled off', () => {
    const { isDark, toggleDark } = useTheme()

    // Toggle off
    toggleDark()
    expect(isDark.value).toBe(false)

    // Toggle on
    toggleDark()
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should persist theme preference to localStorage', () => {
    const { toggleDark } = useTheme()

    toggleDark() // Toggle to light mode
    expect(localStorage.getItem('theme-preference')).toBe('light')

    toggleDark() // Toggle back to dark mode
    expect(localStorage.getItem('theme-preference')).toBe('dark')
  })

  it('should load saved theme preference from localStorage', () => {
    // Set preference to light mode
    localStorage.setItem('theme-preference', 'light')
    const { isDark } = useTheme()
    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    // Clear and test default (should be dark)
    localStorage.clear()
    const { isDark: isDark2 } = useTheme()
    expect(isDark2.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
