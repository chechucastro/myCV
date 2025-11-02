<template>
  <BaseCard border-color="blue" padding="sm" aria-label="Recommendation entry" tag="article">
    <!-- Recommendation Header -->
    <div class="mb-5">
      <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ recommendation.name }} {{ recommendation.surname }}
            </h3>
            <a
              v-if="recommendation.linkedInUrl"
              :href="recommendation.linkedInUrl"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${t('aria.linkedinProfile')} - ${recommendation.name} ${recommendation.surname}`"
              class="inline-flex items-center justify-center rounded-lg p-1.5 text-blue-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
              title="LinkedIn Profile"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
            {{ translatedJobPosition }}
          </p>
        </div>
        <time :datetime="recommendation.postDate" class="text-sm text-gray-500 dark:text-gray-300">
          {{ formatDate(recommendation.postDate) }}
        </time>
      </div>

      <!-- Hierarchy Mode Badge -->
      <div>
        <Badge :mode="recommendation.hierarchyMode">
          {{ translatedHierarchyMode }}
        </Badge>
      </div>
    </div>

    <!-- Recommendation Comment -->
    <blockquote
      class="relative border-blue-200 pl-3 text-gray-700 sm:border-l-4 sm:pl-6 dark:border-blue-700 dark:text-gray-200"
    >
      <p class="relative text-base leading-relaxed italic">"{{ translatedPostComment }}"</p>
    </blockquote>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Recommendation } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'
import Badge from '@/components/ui/Badge.vue'

interface Props {
  recommendation: Recommendation
  recommendationIndex?: number
}

const props = defineProps<Props>()
const { t } = useI18n()
const { formatDate, formatHierarchyMode } = useFormatters()

const translatedHierarchyMode = computed(() => {
  return formatHierarchyMode(props.recommendation.hierarchyMode)
})

const translatedJobPosition = computed(() => {
  if (props.recommendation.jobPosition) {
    return props.recommendation.jobPosition
  }
  if (props.recommendationIndex !== undefined) {
    return t(`articles.recommendations.items.${props.recommendationIndex}.jobPosition`)
  }
  return ''
})

const translatedPostComment = computed(() => {
  if (props.recommendation.postComment) {
    return props.recommendation.postComment
  }
  if (props.recommendationIndex !== undefined) {
    return t(`articles.recommendations.items.${props.recommendationIndex}.postComment`)
  }
  return ''
})
</script>
