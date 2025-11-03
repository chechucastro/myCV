<template>
  <component :is="tag" :aria-label="ariaLabel" :class="cardClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants'

type BorderColor = 'blue' | 'purple' | 'green' | 'orange' | 'gray'
type PaddingSize = 'sm' | 'md' | 'lg'
type Tag = 'article' | 'div' | 'section'

interface Props {
  borderColor?: BorderColor
  padding?: PaddingSize
  ariaLabel?: string
  tag?: Tag
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  borderColor: 'purple',
  padding: 'md',
  tag: 'article',
})

const card = tv({
  base: 'group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-0 dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900 dark:shadow-lg dark:shadow-black/20 flex flex-col h-full',
  variants: {
    borderColor: {
      blue: 'border-l-4 border-blue-500 dark:border-l-4 dark:border-blue-400',
      purple: 'border-l-4 border-purple-500 dark:border-l-4 dark:border-purple-400',
      green: 'border-l-4 border-green-500 dark:border-l-4 dark:border-green-400',
      orange: 'border-l-4 border-orange-500 dark:border-l-4 dark:border-orange-400',
      gray: 'border-l-4 border-gray-500 dark:border-l-4 dark:border-gray-400',
    },
    padding: {
      sm: 'p-3 sm:p-6',
      md: 'p-6',
      lg: 'p-8',
    },
  },
})

const cardClasses = computed(() => {
  const baseClasses = card({
    borderColor: props.borderColor,
    padding: props.padding,
  })
  return props.customClasses ? `${baseClasses} ${props.customClasses}` : baseClasses
})
</script>
