import { useI18n } from 'vue-i18n'
import type { LanguageLevel, HierarchyMode } from '@/types'
import { getLanguageLevelColor as getLanguageLevelColorVariant } from './languageLevel.variants'

export function useFormatters() {
  const { t } = useI18n()
  const formatDate = (iso: string | undefined): string => {
    if (!iso) return ''
    try {
      const d = new Date(iso)
      return d.toLocaleString(undefined, { year: 'numeric', month: 'short' })
    } catch {
      return iso ?? ''
    }
  }

  const formatHierarchyMode = (mode: HierarchyMode): string => {
    return t(`hierarchy.${mode}`)
  }

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

  const getLanguageLevelColor = (level: LanguageLevel): string => {
    return getLanguageLevelColorVariant(level)
  }

  return {
    formatDate,
    formatHierarchyMode,
    getLanguageLevelNumber,
    getLanguageLevelColor,
  }
}
