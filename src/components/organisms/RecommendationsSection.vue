<template>
  <div class="space-y-6">
    <transition-group name="fade-slide" tag="div" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <RecommendationCard
        v-for="(rec, recIdx) in visibleRecommendations"
        :key="rec.name + '-' + rec.surname + '-' + recIdx"
        :recommendation="rec"
        :recommendation-index="recIdx"
      />
    </transition-group>
    <div v-if="hasMoreRecommendations" class="flex justify-center pt-4">
      <BaseButton
        variant="outline"
        color="purple"
        size="md"
        button-type="button"
        :aria-label="showAll ? t('common.showLess') : t('common.showMore')"
        @click="toggleShowAll"
      >
        <span>{{ showAll ? t('common.showLess') : t('common.showMore') }}</span>
        <svg
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': showAll }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Recommendation } from '@/types'
import { trackSectionToggle } from '@/composables/useGoogleAnalytics'
import RecommendationCard from '@/components/molecules/RecommendationCard.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'

/**
 * Recommendations metadata
 */
const recommendationsMetadata: Recommendation[] = [
  {
    name: 'Divya',
    surname: 'E',
    postDate: '2023-02-28',
    hierarchyMode: 'client',
    linkedInUrl: 'https://www.linkedin.com/in/divya-e-11463740/?locale=en_US',
  },
  {
    name: 'Vasil',
    surname: 'Yovchev',
    postDate: '2023-02-28',
    hierarchyMode: 'colleague',
    linkedInUrl: 'https://www.linkedin.com/in/vyovchev/?locale=en_US',
  },
  {
    name: 'Ante',
    surname: 'Rukavina',
    postDate: '2023-02-28',
    hierarchyMode: 'colleague',
    linkedInUrl: 'https://www.linkedin.com/in/ante-rukavina-9792271b0/?locale=en_US',
  },
  {
    name: 'Juliana',
    surname: 'RALAIVAO',
    postDate: '2018-10-23',
    hierarchyMode: 'manager',
    linkedInUrl: 'https://www.linkedin.com/in/juliana-ralaivao-a297a6a5/?locale=en_US',
  },
  {
    name: 'Antoine',
    surname: 'Martin',
    postDate: '2018-10-11',
    hierarchyMode: 'colleague',
    linkedInUrl: 'https://www.linkedin.com/in/antoine-martin-55712084/?locale=en_US',
  },
  {
    name: 'Alexis',
    surname: 'Estrade',
    postDate: '2018-10-11',
    hierarchyMode: 'manager',
    linkedInUrl: 'https://www.linkedin.com/in/alexis-estrade/?locale=en_US',
  },
  {
    name: 'Frédéric',
    surname: 'Rodas',
    postDate: '2015-11-06',
    hierarchyMode: 'manager',
    linkedInUrl: 'https://www.linkedin.com/in/fredericrodas/?locale=en_US',
  },
  {
    name: 'Nicolas',
    surname: 'Escoffier',
    postDate: '2015-07-20',
    hierarchyMode: 'reports_to',
    linkedInUrl: 'https://www.linkedin.com/in/nicolasescoffier?locale=en_US',
  },
  {
    name: 'Sylvia',
    surname: 'Moreno',
    postDate: '2015-05-21',
    hierarchyMode: 'reports_to',
    linkedInUrl: 'https://www.linkedin.com/in/sylvia-m-30161859?locale=en_US',
  },
  {
    name: 'Bruno',
    surname: 'Haouli',
    postDate: '2015-05-21',
    hierarchyMode: 'reports_to',
    linkedInUrl: 'https://www.linkedin.com/in/bruno-haouli-052a414?locale=en_US',
  },
  {
    name: 'Nicolas',
    surname: 'Delfour',
    postDate: '2014-11-22',
    hierarchyMode: 'colleague',
    linkedInUrl: 'https://www.linkedin.com/in/nicolasdelfour?locale=en_US',
  },
  {
    name: 'François',
    surname: 'JULIENNE',
    postDate: '2014-07-24',
    hierarchyMode: 'reports_to',
    linkedInUrl: 'https://www.linkedin.com/in/francoisjulienne?locale=en_US',
  },
  {
    name: 'Rudy',
    surname: 'THIMOTHÉE',
    postDate: '2012-10-24',
    hierarchyMode: 'colleague',
    linkedInUrl: 'https://www.linkedin.com/in/rudy-thimoth%C3%A9e-20a11716?locale=en_US',
  },
  {
    name: 'Rudy',
    surname: 'THIMOTHÉE',
    postDate: '2012-09-11',
    hierarchyMode: 'colleague',
    linkedInUrl: 'https://www.linkedin.com/in/rudy-thimoth%C3%A9e-20a11716?locale=en_US',
  },
  {
    name: 'Moez',
    surname: 'Kacem',
    postDate: '2012-01-12',
    hierarchyMode: 'colleague',
    linkedInUrl: 'https://www.linkedin.com/in/moez-kacem?locale=en_US',
  },
]

interface Props {
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 4,
})

const { t, tm, locale } = useI18n()

/**
 * Build recommendations list from translations and metadata
 * Reactive to locale changes by accessing locale.value
 */
const recommendations = computed<Recommendation[]>(() => {
  // Access locale.value to make this computed reactive to locale changes
  void locale.value // Access to track reactivity, even if unused

  const items = tm('articles.recommendations.items') as unknown

  if (!Array.isArray(items)) {
    return []
  }

  return (items as unknown[]).map((_item, idx: number): Recommendation => {
    const metadata = recommendationsMetadata[idx] ?? recommendationsMetadata[0]
    if (!metadata) {
      // In case recommendationsMetadata is empty, return default empty values
      return {
        name: '',
        surname: '',
        postDate: '',
        hierarchyMode: 'colleague' as const,
        linkedInUrl: '',
      }
    }
    return {
      name: metadata.name,
      surname: metadata.surname,
      postDate: metadata.postDate,
      hierarchyMode: metadata.hierarchyMode,
      linkedInUrl: metadata.linkedInUrl,
    }
  })
})
const showAll = ref<boolean>(false)

const hasMoreRecommendations = computed<boolean>(() => {
  return recommendations.value.length > props.initialCount
})

const visibleRecommendations = computed<Recommendation[]>(() => {
  if (showAll.value || !hasMoreRecommendations.value) {
    return recommendations.value
  }
  return recommendations.value.slice(0, props.initialCount)
})

const toggleShowAll = (): void => {
  const action = showAll.value ? 'show_less' : 'show_all'
  showAll.value = !showAll.value

  // Track section toggle
  trackSectionToggle('recommendations', action)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-move {
  transition: transform 0.4s ease-out;
}
</style>
