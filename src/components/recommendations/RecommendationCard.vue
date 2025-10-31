<template>
  <article
    class="group relative overflow-hidden rounded-xl border-l-4 border-blue-500 bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border dark:border-l-4 dark:border-blue-400 dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900 dark:shadow-lg dark:shadow-black/20"
    aria-label="Recommendation entry"
  >
    <!-- Recommendation Header -->
    <div class="mb-5">
      <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ recommendation.name }} {{ recommendation.surname }}
          </h3>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
            {{ recommendation.jobPosition }}
          </p>
        </div>
        <time :datetime="recommendation.postDate" class="text-sm text-gray-500 dark:text-gray-300">
          {{ formatDate(recommendation.postDate) }}
        </time>
      </div>

      <!-- Hierarchy Mode Badge -->
      <div>
        <span
          class="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm"
          :class="getHierarchyBadgeClass(recommendation.hierarchyMode)"
        >
          {{ formatHierarchyMode(recommendation.hierarchyMode) }}
        </span>
      </div>
    </div>

    <!-- Recommendation Comment -->
    <blockquote
      class="relative border-l-4 border-blue-200 pl-6 text-gray-700 dark:border-blue-700 dark:text-gray-200"
    >
      <p class="relative text-base leading-relaxed italic">"{{ recommendation.postComment }}"</p>
    </blockquote>
  </article>
</template>

<script setup lang="ts">
import type { Recommendation, HierarchyMode } from '@/types'
import { useFormatters } from '@/composables/useFormatters'

interface Props {
  recommendation: Recommendation
}

defineProps<Props>()

const { formatDate, formatHierarchyMode } = useFormatters()

const getHierarchyBadgeClass = (mode: HierarchyMode): string => {
  const classMap: Record<HierarchyMode, string> = {
    client: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    colleague: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    manager: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    reports_to: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  }
  return classMap[mode]
}
</script>

