<template>
  <section aria-labelledby="details-heading" class="scroll-reveal">
    <h2
      id="details-heading"
      class="relative mb-6 text-2xl font-bold text-gray-900 after:absolute after:left-0 after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      Details
    </h2>
    <div class="mx-auto">
      <address class="space-y-4 text-sm not-italic">
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">Social</h3>

        <!-- LinkedIn -->
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-6 w-6 rounded"
            aria-hidden="true"
            focusable="false"
          >
            <rect width="24" height="24" rx="4" fill="#0A66C2" />
            <path
              fill="white"
              d="M4.983 3.5A1.5 1.5 0 1 1 3.5 5a1.5 1.5 0 0 1 1.483-1.5zM2 8.982h3.967V21H2V8.982zM9 8.982h3.81v1.648h.053c.53-1.002 1.828-2.06 3.762-2.06 4.024 0 4.764 2.65 4.764 6.093V21h-3.967v-5.367c0-1.28-.027-2.924-1.782-2.924-1.784 0-2.058 1.395-2.058 2.835V21H9V8.982z"
            />
          </svg>
          <a
            :href="contactInfo.linkedin.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
            aria-label="Open LinkedIn profile (opens in a new tab)"
          >
            {{ contactInfo.linkedin.handle }}
          </a>
        </div>

        <!-- Github -->
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-6 w-6 rounded fill-gray-900 dark:fill-white"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <a
            :href="contactInfo.github.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
            aria-label="Open GitHub profile (opens in a new tab)"
          >
            {{ contactInfo.github.handle }}
          </a>
        </div>

        <!-- Email -->
        <h3 class="font-semibold text-gray-900 dark:text-white">Contact</h3>
        <div class="flex items-center gap-3">
          <span class="h-6 w-6 flex-shrink-0" aria-hidden="true">
            <!-- Envelope SVG (decorative) -->
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6 text-gray-700 dark:text-gray-300"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
          </span>
          <a
            :href="`mailto:${contactInfo.email}`"
            class="text-gray-900 underline hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
            aria-label="Send an email"
          >
            {{ contactInfo.email }}
          </a>
        </div>

        <!-- Postal address -->
        <h3 class="font-semibold text-gray-900 dark:text-white">Address</h3>
        <div class="flex items-start gap-3">
          <span class="mt-0.5 h-6 w-6 flex-shrink-0" aria-hidden="true">
            <!-- Map pin / location SVG (decorative) -->
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6 text-red-600"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
              />
            </svg>
          </span>
          <div>
            <span class="block text-gray-900 dark:text-white">{{ contactInfo.address }}</span>
            <span class="block text-gray-900 dark:text-white">{{ contactInfo.country }}</span>
          </div>
        </div>

        <h3 class="font-semibold text-gray-900 dark:text-white">Nationality</h3>
        <div class="flex items-center gap-2">
          <span class="block text-gray-900 dark:text-white">{{ contactInfo.nationality }}</span>
        </div>
      </address>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ContactInfo } from '@/types'

interface Props {
  contactInfo: ContactInfo
}

defineProps<Props>()
</script>

