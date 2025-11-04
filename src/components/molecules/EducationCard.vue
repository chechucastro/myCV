<template>
  <BaseCard
    border-color="purple"
    padding="md"
    aria-label="Education entry"
    tag="article"
  >
    <!-- Education Header -->
    <div class="mb-4">
      <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {{ translatedDegree }}
      </h3>
      <p class="text-lg font-semibold text-purple-600 dark:text-purple-400">
        {{ translatedInstitution }}
      </p>
      <p v-if="translatedFieldOfStudy" class="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {{ translatedFieldOfStudy }}
      </p>
    </div>

    <!-- Education Details -->
    <div class="space-y-3">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <svg
          class="h-4 w-4 text-purple-500 dark:text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <time :datetime="education.startDate">{{ formatDate(education.startDate) }}</time>
        <span aria-hidden="true">—</span>
        <time v-if="education.endDate" :datetime="education.endDate">{{
          formatDate(education.endDate)
        }}</time>
        <span
          v-else
          class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
          >{{ t('employment.present') }}</span
        >
      </div>

      <div v-if="translatedLocation" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <svg
          class="h-4 w-4 text-purple-500 dark:text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="whitespace-pre-line">{{ translatedLocation }}</span>
      </div>

    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Education } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/atoms/BaseCard/BaseCard.vue'

interface Props {
  education: Education
  educationIndex?: number
}

const props = defineProps<Props>()
const { t } = useI18n()
const { formatDate } = useFormatters()

const educationKey = computed(() => {
  return props.education.educationKey !== undefined ? props.education.educationKey : props.educationIndex
})

const translatedDegree = computed(() => {
  if (educationKey.value !== undefined) {
    return t(`articles.education.items.${educationKey.value}.degree`)
  }
  return ''
})

const translatedInstitution = computed(() => {
  if (educationKey.value !== undefined) {
    return t(`articles.education.items.${educationKey.value}.institution`)
  }
  return ''
})

const translatedFieldOfStudy = computed(() => {
  if (educationKey.value !== undefined) {
    const field = t(`articles.education.items.${educationKey.value}.fieldOfStudy`, '')
    return field || ''
  }
  return ''
})

const translatedLocation = computed(() => {
  if (educationKey.value !== undefined) {
    const loc = t(`articles.education.items.${educationKey.value}.location`, '')
    return loc || ''
  }
  return ''
})

</script>

