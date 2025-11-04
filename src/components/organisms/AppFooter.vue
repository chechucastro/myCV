<template>
  <footer
    role="contentinfo"
    class="relative w-screen border-t border-gray-200 bg-white py-6 transition-colors dark:border-neutral-800 dark:bg-neutral-950"
    style="margin-left: calc((100vw - 100%) / -2); margin-right: calc((100vw - 100%) / -2)"
  >
    <div class="mx-auto flex max-w-[1240px] items-center justify-center gap-2 px-4">
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
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

