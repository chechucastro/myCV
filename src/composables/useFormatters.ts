import { useI18n } from 'vue-i18n'
import type { LanguageLevel, HierarchyMode } from '@/types'

/**
 * Composable for formatting utility functions
 * Follows Single Responsibility Principle - only handles data formatting
 */
export function useFormatters() {
  const { t } = useI18n()
  /**
   * Small date formatter. Kept simple and typed.
   */
  const formatDate = (iso: string | undefined): string => {
    if (!iso) return ''
    try {
      const d = new Date(iso)
      // e.g. "Jun 2020"
      return d.toLocaleString(undefined, { year: 'numeric', month: 'short' })
    } catch {
      return iso ?? ''
    }
  }

  /**
   * Format hierarchy mode for display using i18n translations.
   */
  const formatHierarchyMode = (mode: HierarchyMode): string => {
    return t(`hierarchy.${mode}`)
  }

  /**
   * Get numeric level for language (1-5 for visual bars)
   */
  const getLanguageLevelNumber = (level: LanguageLevel): number => {
    const levelMap: Record<LanguageLevel, number> = {
      Basic: 1,
      Conversational: 2,
      Professional: 3,
      Fluent: 4,
      Native: 5,
    }
    return levelMap[level]
  }

  /**
   * Get color for language level bar and badges
   * Uses white text with darker backgrounds for WCAG AA compliance (4.5:1 contrast ratio)
   */
  const getLanguageLevelColor = (level: LanguageLevel): string => {
    const colorMap: Record<LanguageLevel, string> = {
      Native: 'bg-red-700 text-white dark:bg-red-600 dark:text-white',
      Fluent: 'bg-orange-700 text-white dark:bg-orange-600 dark:text-white',
      Professional: 'bg-yellow-800 text-white dark:bg-yellow-700 dark:text-white',
      Conversational: 'bg-cyan-700 text-white dark:bg-cyan-600 dark:text-white',
      Basic: 'bg-blue-700 text-white dark:bg-blue-600 dark:text-white',
    }
    return colorMap[level]
  }

  return {
    formatDate,
    formatHierarchyMode,
    getLanguageLevelNumber,
    getLanguageLevelColor,
  }
}
