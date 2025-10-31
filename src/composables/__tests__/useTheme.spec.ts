import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    // Clean up document classes before each test
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    // Clean up after each test
    document.documentElement.classList.remove('dark')
  })

  it('should initialize with isDark as false', () => {
    const { isDark } = useTheme()
    expect(isDark.value).toBe(false)
  })

  it('should toggle dark mode on', () => {
    const { isDark, toggleDark } = useTheme()

    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    toggleDark()

    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should toggle dark mode off', () => {
    const { isDark, toggleDark } = useTheme()

    // Toggle on
    toggleDark()
    expect(isDark.value).toBe(true)

    // Toggle off
    toggleDark()
    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
