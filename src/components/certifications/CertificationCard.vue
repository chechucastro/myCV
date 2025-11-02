<template>
  <BaseCard
    border-color="blue"
    padding="md"
    aria-label="Certification entry"
    tag="article"
    custom-classes="border-l-0"
  >
    <!-- Certificate Image -->
    <div class="mb-4 flex justify-center">
      <div class="relative overflow-hidden rounded-lg">
        <img
          :src="certification.certificateImage"
          :alt="`${certification.title} certificate`"
          loading="lazy"
          width="128"
          height="128"
          class="h-32 w-32 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        ></div>
      </div>
    </div>

    <!-- Certificate Details -->
    <div class="space-y-3">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white">
        {{ certification.title }}
      </h3>
      <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div class="flex items-center gap-2">
          <svg
            class="h-4 w-4 text-blue-500 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span class="font-medium">Issued by:</span>
          <span class="dark:text-gray-300">{{ certification.issuedBy }}</span>
        </div>
        <div class="flex items-center gap-2">
          <svg
            class="h-4 w-4 text-blue-500 dark:text-blue-400"
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
          <span class="font-medium">Date:</span>
          <time :datetime="certification.issuedDate" class="dark:text-gray-300">{{
            formatDate(certification.issuedDate)
          }}</time>
        </div>
      </div>

      <!-- Certificate Link -->
      <div class="pt-2">
        <a
          :href="certification.certificateLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          :aria-label="`View ${certification.title} certificate (opens in new tab)`"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          View Certificate
        </a>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Certification } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'

interface Props {
  certification: Certification
}

defineProps<Props>()

const { formatDate } = useFormatters()
</script>

