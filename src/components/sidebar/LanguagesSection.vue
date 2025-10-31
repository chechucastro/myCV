<template>
  <section id="languages-section" aria-labelledby="languages-heading" class="scroll-reveal mb-8">
    <h2
      id="languages-heading"
      class="relative mb-6 text-2xl font-bold text-gray-900 after:absolute after:left-0 after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      Languages
    </h2>

    <!-- Live region for language announcements -->
    <div id="languages-live" class="sr-only" aria-live="polite" aria-atomic="true"></div>

    <ul class="space-y-5">
      <li
        v-for="(lang, idx) in languages"
        :key="lang.name"
        class="group flex flex-col gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
        :aria-labelledby="'lang-name-' + idx"
      >
        <div class="flex items-center justify-between">
          <div
            :id="'lang-name-' + idx"
            class="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
          >
            {{ lang.name }}
          </div>
          <div
            class="rounded-full px-3 py-1 text-xs font-medium text-white"
            :class="getLanguageLevelColor(lang.level)"
          >
            {{ lang.level }}
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
                [getLanguageLevelColor(lang.level)]:
                  barIndex <= getLanguageLevelNumber(lang.level),
                'language-bar-fill': languagesVisible && barIndex <= getLanguageLevelNumber(lang.level),
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
          :aria-label="`${lang.name} proficiency: ${lang.level}`"
          class="sr-only"
        >
          Level {{ getLanguageLevelNumber(lang.level) }} out of 5
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import type { Language } from '@/types'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useAccessibility } from '@/composables/useAccessibility'
import { useFormatters } from '@/composables/useFormatters'

interface Props {
  languages: Language[]
}

const props = defineProps<Props>()

const { observeElement } = useIntersectionObserver()
const { announceToLiveRegion } = useAccessibility()
const { getLanguageLevelNumber, getLanguageLevelColor } = useFormatters()

const languagesVisible: Ref<boolean> = ref<boolean>(false)

onMounted(() => {
  // Observe languages section to animate bars only when visible
  observeElement(
    'languages-section',
    () => {
      languagesVisible.value = true
      // Announce languages briefly (one-by-one) so screen reader users hear initial values
      props.languages.forEach((lang: Language, i: number) => {
        window.setTimeout((): void => {
          announceToLiveRegion('languages-live', `${lang.name}: ${lang.level}`)
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

