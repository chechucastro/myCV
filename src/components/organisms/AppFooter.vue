<template>
  <footer
    role="contentinfo"
    class="relative w-screen border-t border-gray-200 bg-white py-6 transition-colors dark:border-neutral-800 dark:bg-neutral-950"
    style="margin-left: calc((100vw - 100%) / -2); margin-right: calc((100vw - 100%) / -2)"
  >
    <div class="mx-auto flex max-w-[1240px] flex-col items-center justify-center gap-4 px-4">
      <div class="flex items-center justify-center gap-2">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ t('footer.madeWithLove') }}
        </span>
        <svg
          class="h-4 w-4 text-red-500 transition-colors dark:text-red-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <BaseButton
          tag="a"
          href="/docs/Chechu-Castro-CV-EN-2025-full.pdf"
          external
          download
          variant="outline"
          color="gray"
          size="sm"
          :aria-label="t('footer.downloadCVFull')"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {{ t('footer.downloadCVFull') }}
        </BaseButton>
        <BaseButton
          tag="a"
          href="/docs/Chechu-Castro-CV-EN-2025-light.pdf"
          external
          download
          variant="outline"
          color="gray"
          size="sm"
          :aria-label="t('footer.downloadCVLight')"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {{ t('footer.downloadCVLight') }}
        </BaseButton>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'

const { t } = useI18n()
</script>

