<template>
  <button
    id="theme-toggle"
    @click="toggleDark"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Disable dark mode' : 'Enable dark mode'"
    class="group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white"
  >
    <!-- if dark mode is on show light mode button, if not show dark mode button -->
    <template v-if="isDark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mx-auto block h-4 w-4"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </template>
    <template v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mx-auto block h-4 w-4"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </template>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleDark } = useTheme()
</script>

