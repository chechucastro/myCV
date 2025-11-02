<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants'
import type { HierarchyMode } from '@/types'

defineOptions({
  name: 'BadgeComponent',
})

interface Props {
  mode: HierarchyMode
}

const props = defineProps<Props>()

const badge = tv({
  base: 'inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm',
  variants: {
    mode: {
      client: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      colleague: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      manager: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      reports_to: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    },
  },
})

const badgeClasses = computed(() => badge({ mode: props.mode }))
</script>
