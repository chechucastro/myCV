<template>
  <article
    class="group relative rounded-lg border-l-4 border-blue-500 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border dark:border-l-4 dark:border-blue-400 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-md dark:shadow-black/10"
    aria-label="Employment entry"
  >
    <h4 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
      {{ position.position }}
    </h4>

    <div class="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-200">
      <svg
        class="h-4 w-4"
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
        >Present</span
      >
    </div>

    <ul class="ml-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
      <li v-for="(d, dIdx) in position.description" :key="dIdx" class="flex items-start gap-2">
        <span
          class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500 dark:bg-blue-400"
        ></span>
        <span>{{ d }}</span>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import type { EmploymentPosition } from '@/types'
import { useFormatters } from '@/composables/useFormatters'

interface Props {
  position: EmploymentPosition
}

defineProps<Props>()

const { formatDate } = useFormatters()
</script>

