import { tv } from 'tailwind-variants'
import type { LanguageLevel } from '@/types'

/**
 * Language level variant configuration
 * Defines color styles for different language proficiency levels
 * Uses white text with darker backgrounds for WCAG AA compliance (4.5:1 contrast ratio)
 */
export const languageLevel = tv({
  base: 'text-white',
  variants: {
    level: {
      Native: 'bg-red-700 dark:bg-red-600',
      Fluent: 'bg-orange-800 dark:bg-orange-700',
      Professional: 'bg-yellow-800 dark:bg-yellow-700',
      Conversational: 'bg-cyan-800 dark:bg-cyan-700',
      Basic: 'bg-blue-700 dark:bg-blue-600',
    },
  },
})

/**
 * Get language level color classes
 * @param level - The language proficiency level
 * @returns Tailwind CSS classes for the level
 */
export const getLanguageLevelColor = (level: LanguageLevel): string => {
  return languageLevel({ level })
}
