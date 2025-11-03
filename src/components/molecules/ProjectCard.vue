<template>
  <BaseCard border-color="purple" padding="md" aria-label="Personal project entry" tag="article">
    <div class="flex h-full flex-col">
      <div class="mb-4">
        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {{ translatedTitle }}
        </h3>
        <div
          v-if="hasDates"
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
        >
          <svg
            class="h-4 w-4 text-purple-500 dark:text-purple-400"
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
          <template v-if="isSameMonth">
            <time v-if="project.startDate" :datetime="project.startDate">{{
              formatDate(project.startDate)
            }}</time>
          </template>
          <template v-else>
            <time v-if="project.startDate" :datetime="project.startDate">{{
              formatDate(project.startDate)
            }}</time>
            <span v-if="project.startDate && project.endDate" aria-hidden="true">—</span>
            <time v-if="project.endDate" :datetime="project.endDate">{{
              formatDate(project.endDate)
            }}</time>
          </template>
          <span
            v-if="project.startDate && !project.endDate"
            class="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
            >{{ t('employment.present') }}</span
          >
        </div>
      </div>

      <p
        v-if="translatedDescription"
        class="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-200"
      >
        {{ translatedDescription }}
      </p>

      <div
        v-if="translatedTechStack"
        class="mb-4 border-t border-gray-200 pt-4 dark:border-gray-700"
      >
        <h5 class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {{ t('employment.techStack') }}:
        </h5>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ translatedTechStack }}</p>
      </div>

      <div v-if="hasLinks" class="mt-auto flex flex-wrap gap-3 pt-4">
        <BaseButton
          v-if="project.projectUrl"
          tag="a"
          :href="project.projectUrl"
          variant="outline"
          color="purple"
          size="md"
          :aria-label="`View ${translatedTitle} project (opens in new tab)`"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          {{ t('common.viewProject') }}
        </BaseButton>
        <BaseButton
          v-if="project.githubUrl || project.githubIsPrivate"
          :tag="project.githubIsPrivate ? 'button' : 'a'"
          :href="project.githubIsPrivate ? undefined : project.githubUrl"
          variant="outline"
          color="black"
          size="md"
          :disabled="project.githubIsPrivate"
          :aria-label="
            project.githubIsPrivate
              ? 'Private repository'
              : 'View project on GitHub (opens in new tab)'
          "
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
          {{ project.githubIsPrivate ? t('common.privateRepo') : t('common.github') }}
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalProject } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/molecules/BaseCard.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'

interface Props {
  project: PersonalProject
  projectIndex?: number
}

const props = defineProps<Props>()
const { t } = useI18n()
const { formatDate } = useFormatters()

const projectKey = computed(() => {
  return props.project.projectKey !== undefined ? props.project.projectKey : props.projectIndex
})

const translatedTitle = computed(() => {
  if (projectKey.value !== undefined) {
    return t(`articles.personalProjects.items.${projectKey.value}.title`)
  }
  return ''
})

const translatedDescription = computed(() => {
  if (projectKey.value !== undefined) {
    const desc = t(`articles.personalProjects.items.${projectKey.value}.description`, '')
    return desc || ''
  }
  return ''
})

const translatedTechStack = computed(() => {
  if (projectKey.value !== undefined) {
    const tech = t(`articles.personalProjects.items.${projectKey.value}.techStack`, '')
    return tech || ''
  }
  return ''
})

const hasDates = computed(() => {
  return !!(props.project.startDate || props.project.endDate)
})

const isSameMonth = computed(() => {
  if (!props.project.startDate || !props.project.endDate) {
    return false
  }
  try {
    const startDate = new Date(props.project.startDate)
    const endDate = new Date(props.project.endDate)
    return (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth()
    )
  } catch {
    return false
  }
})

const hasLinks = computed(() => {
  return !!(props.project.projectUrl || props.project.githubUrl)
})
</script>
