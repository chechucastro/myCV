<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HierarchyMode } from '@/types'
import { badge } from './Badge.variants'

defineOptions({
  name: 'BadgeComponent',
})

interface Props {
  mode: HierarchyMode
}

const props = defineProps<Props>()

const badgeClasses = computed(() => badge({ mode: props.mode }))
</script>
