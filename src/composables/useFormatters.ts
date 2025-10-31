import type { LanguageLevel, HierarchyMode } from '@/types'

/**
 * Composable for formatting utility functions
 * Follows Single Responsibility Principle - only handles data formatting
 */
export function useFormatters() {
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
   * Format hierarchy mode for display.
   */
  const formatHierarchyMode = (mode: HierarchyMode): string => {
    const modeMap: Record<HierarchyMode, string> = {
      client: 'Chechu was my client',
      colleague: 'We worked together on the same team',
      manager: 'I managed Chechu directly',
      reports_to: 'I reported to Chechu directly',
    }
    return modeMap[mode]
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
      Native: 'bg-red-500 dark:bg-red-400',
      Fluent: 'bg-orange-500 dark:bg-orange-400',
      Professional: 'bg-yellow-500 dark:bg-yellow-400',
      Conversational: 'bg-cyan-500 dark:bg-cyan-400',
      Basic: 'bg-blue-500 dark:bg-blue-400',
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

