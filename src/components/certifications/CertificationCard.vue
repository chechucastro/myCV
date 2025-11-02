<template>
  <BaseCard
    border-color="purple"
    padding="lg"
    aria-label="Certification entry"
    tag="article"
    custom-classes="flex flex-col h-full"
  >
    <!-- Certificate Logo Container -->
    <div class="mb-6 flex justify-center">
      <div class="flex h-24 w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
        <img
          :src="props.certification.certificateImage"
          :alt="`${props.certification.title} certificate`"
          loading="lazy"
          class="h-full w-auto max-w-full"
        />
      </div>
    </div>

    <!-- Certificate Details -->
    <div class="flex flex-1 flex-col space-y-4">
      <h3 class="text-xl font-bold leading-tight text-gray-900 dark:text-white">
        {{ props.certification.title }}
      </h3>

      <div class="space-y-3 text-sm">
        <div class="flex items-start gap-3">
          <svg
            class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500 dark:text-blue-400"
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
          <div>
            <span class="font-semibold text-gray-700 dark:text-gray-300">Issued by</span>
            <p class="mt-0.5 text-gray-600 dark:text-gray-400">{{ props.certification.issuedBy }}</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <svg
            class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500 dark:text-blue-400"
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
          <div>
            <span class="font-semibold text-gray-700 dark:text-gray-300">Date</span>
            <p class="mt-0.5 text-gray-600 dark:text-gray-400">
              <time :datetime="props.certification.issuedDate">{{
                formatDate(props.certification.issuedDate)
              }}</time>
            </p>
          </div>
        </div>
      </div>

      <!-- Certificate Link -->
      <div class="mt-auto pt-4">
        <BaseButton
          tag="a"
          :href="props.certification.certificateLink"
          variant="outline"
          color="purple"
          size="md"
          :full-width="true"
          :aria-label="`View ${props.certification.title} certificate (opens in new tab)`"
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
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Certification } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  certification: Certification
}

const props = defineProps<Props>()
const { formatDate } = useFormatters()
</script>

