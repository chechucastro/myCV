<template>
  <div>
    <!-- Live region for language announcements -->
    <div id="languages-live" class="sr-only" aria-live="polite" aria-atomic="true"></div>

    <ul class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <li
        v-for="(lang, idx) in languages"
        :key="lang.name"
        class="group flex flex-col gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
        :aria-labelledby="'lang-name-' + idx"
      >
        <div class="flex items-center justify-between">
          <div
            :id="'lang-name-' + idx"
            class="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400"
          >
            {{ getTranslatedLanguageName(lang.name) }}
          </div>
          <div
            class="rounded-full px-3 py-1 text-xs font-medium text-white"
            :class="getLanguageLevelColor(lang.level)"
          >
            {{ t('languages.levels.' + lang.level.toLowerCase()) }}
          </div>
        </div>

        <!--  Horizontal Bars -->
        <div class="flex items-center gap-1">
          <div
            v-for="barIndex in 5"
            :key="barIndex"
            class="language-bar h-1 flex-1 overflow-hidden rounded-sm bg-gray-300 dark:bg-gray-600"
            :aria-hidden="true"
          >
            <div
              class="h-full w-0 rounded-sm transition-all duration-700 ease-out"
              :class="{
                [getLanguageLevelColor(lang.level)]: barIndex <= getLanguageLevelNumber(lang.level),
                'language-bar-fill':
                  languagesVisible && barIndex <= getLanguageLevelNumber(lang.level),
              }"
              :style="{
                transitionDelay: `${(barIndex - 1) * 150}ms`,
              }"
            ></div>
          </div>
        </div>

        <!-- Accessible progressbar for screen readers -->
        <div
          role="progressbar"
          :aria-valuemin="1"
          :aria-valuemax="5"
          :aria-valuenow="getLanguageLevelNumber(lang.level)"
          :aria-label="
            t('aria.languageProficiency', {
              language: getTranslatedLanguageName(lang.name),
              level: t('languages.levels.' + lang.level.toLowerCase()),
            })
          "
          class="sr-only"
        >
          {{
            t('aria.levelOutOf', {
              current: getLanguageLevelNumber(lang.level),
              total: 5,
            })
          }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Language } from '@/types'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useAccessibility } from '@/composables/useAccessibility'
import { useFormatters } from '@/composables/useFormatters'

/**
 * Languages data
 */
const languages: Language[] = [
  { name: 'Spanish', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'French', level: 'Professional' },
  { name: 'Portuguese', level: 'Professional' },
  { name: 'Italian', level: 'Conversational' },
]

const { t } = useI18n()

const { observeElement } = useIntersectionObserver()
const { announceToLiveRegion } = useAccessibility()
const { getLanguageLevelNumber, getLanguageLevelColor } = useFormatters()

const languagesVisible: Ref<boolean> = ref<boolean>(false)

/**
 * Get translated language name from translation keys
 */
const getTranslatedLanguageName = (languageName: string): string => {
  const languageKey = languageName.toLowerCase()
  const translationKey = `languages.names.${languageKey}`
  const translated = t(translationKey)
  // If translation exists and is different from the key, return it
  if (translated !== translationKey) {
    return translated
  }
  // Fallback to original name if translation not found
  return languageName
}

onMounted(() => {
  // Observe languages section to animate bars only when visible
  observeElement(
    'languages-section',
    () => {
      languagesVisible.value = true
      // Announce languages briefly (one-by-one) so screen reader users hear initial values
      languages.forEach((lang: Language, i: number) => {
        window.setTimeout((): void => {
          const translatedName = getTranslatedLanguageName(lang.name)
          const translatedLevel = t('languages.levels.' + lang.level.toLowerCase())
          announceToLiveRegion('languages-live', `${translatedName}: ${translatedLevel}`)
        }, i * 200)
      })
    },
    { threshold: 0.2, rootMargin: '0px' },
    true,
  )
})
</script>

<style scoped>
/* Language bar fill animation */
.language-bar-fill {
  width: 100% !important;
}
</style>
