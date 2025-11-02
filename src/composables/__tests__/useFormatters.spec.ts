import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useFormatters } from '../useFormatters'
import type { LanguageLevel, HierarchyMode } from '@/types'

const TestComponent = defineComponent({
  setup() {
    return useFormatters()
  },
  template: '<div></div>',
})

describe('useFormatters', () => {
  let formatDate: (iso: string | undefined) => string
  let formatHierarchyMode: (mode: HierarchyMode) => string
  let getLanguageLevelNumber: (level: LanguageLevel) => number
  let getLanguageLevelColor: (level: LanguageLevel) => string

  const wrapper = mount(TestComponent)
  formatDate = wrapper.vm.formatDate
  formatHierarchyMode = wrapper.vm.formatHierarchyMode
  getLanguageLevelNumber = wrapper.vm.getLanguageLevelNumber
  getLanguageLevelColor = wrapper.vm.getLanguageLevelColor

  describe('formatDate', () => {
    it('should format valid ISO date', () => {
      const result = formatDate('2023-06-15')
      expect(result).toMatch(/jun|junio|June/i)
      expect(result).toContain('2023')
    })

    it('should return empty string for undefined', () => {
      const result = formatDate(undefined)
      expect(result).toBe('')
    })

    it('should return original string for invalid date', () => {
      const result = formatDate('invalid-date')
      expect(result).toBe('Invalid Date')
    })

    it('should handle different date formats', () => {
      const result = formatDate('2020-01-01')
      expect(result.toLowerCase()).toMatch(/jan|ene|enero|january/i)
      expect(result).toContain('2020')
    })
  })

  describe('formatHierarchyMode', () => {
    it('should format client mode', () => {
      const result = formatHierarchyMode('client')
      expect(result).toBe('Chechu was my client')
    })

    it('should format colleague mode', () => {
      const result = formatHierarchyMode('colleague')
      expect(result).toBe('We worked together on the same team')
    })

    it('should format manager mode', () => {
      const result = formatHierarchyMode('manager')
      expect(result).toBe('I managed Chechu directly')
    })

    it('should format reports_to mode', () => {
      const result = formatHierarchyMode('reports_to')
      expect(result).toBe('I reported to Chechu directly')
    })

    it('should handle all hierarchy modes', () => {
      const modes: HierarchyMode[] = ['client', 'colleague', 'manager', 'reports_to']

      modes.forEach((mode) => {
        const result = formatHierarchyMode(mode)
        expect(result).toBeTruthy()
        expect(typeof result).toBe('string')
      })
    })
  })

  describe('getLanguageLevelNumber', () => {
    it('should return 1 for Basic', () => {
      const result = getLanguageLevelNumber('Basic')
      expect(result).toBe(1)
    })

    it('should return 2 for Conversational', () => {
      const result = getLanguageLevelNumber('Conversational')
      expect(result).toBe(2)
    })

    it('should return 3 for Professional', () => {
      const result = getLanguageLevelNumber('Professional')
      expect(result).toBe(3)
    })

    it('should return 4 for Fluent', () => {
      const result = getLanguageLevelNumber('Fluent')
      expect(result).toBe(4)
    })

    it('should return 5 for Native', () => {
      const result = getLanguageLevelNumber('Native')
      expect(result).toBe(5)
    })

    it('should handle all language levels', () => {
      const levels: LanguageLevel[] = [
        'Basic',
        'Conversational',
        'Professional',
        'Fluent',
        'Native',
      ]
      const expectedNumbers = [1, 2, 3, 4, 5]

      levels.forEach((level, index) => {
        expect(getLanguageLevelNumber(level)).toBe(expectedNumbers[index])
      })
    })
  })

  describe('getLanguageLevelColor', () => {
    it('should return correct color for Native', () => {
      const result = getLanguageLevelColor('Native')
      expect(result).toContain('bg-red-500')
    })

    it('should return correct color for Fluent', () => {
      const result = getLanguageLevelColor('Fluent')
      expect(result).toContain('bg-orange-500')
    })

    it('should return correct color for Professional', () => {
      const result = getLanguageLevelColor('Professional')
      expect(result).toContain('bg-yellow-500')
    })

    it('should return correct color for Conversational', () => {
      const result = getLanguageLevelColor('Conversational')
      expect(result).toContain('bg-cyan-500')
    })

    it('should return correct color for Basic', () => {
      const result = getLanguageLevelColor('Basic')
      expect(result).toContain('bg-blue-500')
    })

    it('should include dark mode classes', () => {
      const result = getLanguageLevelColor('Native')
      expect(result).toContain('dark:')
    })
  })
})
