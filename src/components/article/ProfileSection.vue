<template>
  <div class="text-gray-900 dark:text-white">
    <p v-if="typeof body === 'string'">{{ body }}</p>
    <div v-else>
      <p v-for="(para, idx) in body" :key="idx">{{ para }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  body: string | string[]
}

defineProps<Props>()
</script>

