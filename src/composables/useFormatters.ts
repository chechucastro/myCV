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
   * Get color for language level bar
   */
  const getLanguageLevelColor = (level: LanguageLevel): string => {
    const colorMap: Record<LanguageLevel, string> = {
      Native: 'bg-red-500 dark:bg-red-600',
      Fluent: 'bg-orange-500 dark:bg-orange-600',
      Professional: 'bg-yellow-500 dark:bg-yellow-600',
      Conversational: 'bg-cyan-500 dark:bg-cyan-600',
      Basic: 'bg-blue-500 dark:bg-blue-600',
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
