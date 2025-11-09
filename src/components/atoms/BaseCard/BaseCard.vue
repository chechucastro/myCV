<template>
  <component :is="tag" :aria-label="ariaLabel" :class="cardClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Tag } from './BaseCard.const'
import { card } from './BaseCard.variants'

interface Props {
  borderColor?: 'blue' | 'purple' | 'green' | 'orange' | 'gray'
  padding?: 'sm' | 'md' | 'lg'
  ariaLabel?: string
  tag?: Tag
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  borderColor: 'purple',
  padding: 'md',
  tag: 'article',
})

const cardClasses = computed<string>(() => {
  const baseClasses = card({
    borderColor: props.borderColor,
    padding: props.padding,
  })
  return props.customClasses ? `${baseClasses} ${props.customClasses}` : baseClasses
})
</script>
