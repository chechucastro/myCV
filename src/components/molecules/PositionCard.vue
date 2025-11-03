<template>
  <BaseCard
    border-color="purple"
    padding="md"
    aria-label="Employment entry"
    tag="article"
    custom-classes="rounded-lg bg-white shadow-sm hover:shadow-md dark:bg-neutral-800 dark:shadow-md dark:shadow-black/10"
  >
    <h4 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
      {{ translatedPosition }}
    </h4>

    <div class="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-200">
      <svg
        class="h-4 w-4 text-purple-500 dark:text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <time :datetime="position.startDate">{{ formatDate(position.startDate) }}</time>
      <span aria-hidden="true">—</span>
      <time v-if="position.endDate" :datetime="position.endDate">{{
        formatDate(position.endDate)
      }}</time>
      <span
        v-else
        class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
        >{{ t('employment.present') }}</span
      >
    </div>

    <ul v-if="translatedDescription.length > 0" class="ml-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
      <li v-for="(d, dIdx) in translatedDescription" :key="dIdx" class="flex items-start gap-2">
        <span
          class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500 dark:bg-purple-400"
        ></span>
        <span>{{ d }}</span>
      </li>
    </ul>

    <div v-if="translatedTechStack" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h5 class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{{ t('employment.techStack') }}:</h5>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ translatedTechStack }}</p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { EmploymentPosition } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/molecules/BaseCard.vue'

interface Props {
  position: EmploymentPosition
  companyKey?: string
  positionIndex?: number
}

const props = defineProps<Props>()
const { t, tm } = useI18n()
const { formatDate } = useFormatters()

const translatedPosition = computed(() => {
  if (props.companyKey !== undefined && props.positionIndex !== undefined) {
    return t(`articles.employment.companies.${props.companyKey}.positions.${props.positionIndex}.position`)
  }
  return ''
})

const translatedDescription = computed(() => {
  if (props.companyKey !== undefined && props.positionIndex !== undefined) {
    const translationKey = `articles.employment.companies.${props.companyKey}.positions.${props.positionIndex}.description`
    try {
      // Use tm() for returning message objects/arrays in vue-i18n v9
      const desc = tm(translationKey)
      return Array.isArray(desc) ? desc : []
    } catch (error) {
      console.error('Error fetching description translation:', error, translationKey)
      return []
    }
  }
  return []
})

const translatedTechStack = computed(() => {
  if (props.companyKey !== undefined && props.positionIndex !== undefined) {
    return t(`articles.employment.companies.${props.companyKey}.positions.${props.positionIndex}.techStack`)
  }
  return ''
})
</script>

