
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Recommendation } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'
import Badge from '@/components/ui/Badge.vue'

interface Props {
  recommendation: Recommendation
  recommendationIndex?: number
}

const props = defineProps<Props>()
const { t } = useI18n()
const { formatDate, formatHierarchyMode } = useFormatters()

const translatedHierarchyMode = computed(() => {
  return formatHierarchyMode(props.recommendation.hierarchyMode)
})

const translatedJobPosition = computed(() => {
  if (props.recommendationIndex !== undefined) {
    return t(`articles.recommendations.items.${props.recommendationIndex}.jobPosition`)
  }
  return ''
})

const translatedPostComment = computed(() => {
  if (props.recommendationIndex !== undefined) {
    return t(`articles.recommendations.items.${props.recommendationIndex}.postComment`)
  }
  return ''
})
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
BaseCard;
// @ts-ignore
Badge;
{
{
{
{
{
{
// @ts-ignore
{  recommendation.name  };
// @ts-ignore
{  recommendation.surname  };
}
// @ts-ignore
if (recommendation.linkedInUrl) {
{
// @ts-ignore
(recommendation.linkedInUrl);
// @ts-ignore
(`${t('aria.linkedinProfile')} - ${recommendation.name} ${recommendation.surname}`);
{
{
}
}
}
}
}
{
// @ts-ignore
{  translatedJobPosition  };
}
}
{
// @ts-ignore
(recommendation.postDate);
// @ts-ignore
{  formatDate(recommendation.postDate)  };
}
}
{
{
// @ts-ignore
(recommendation.hierarchyMode);
// @ts-ignore
{  translatedHierarchyMode  };
}
}
}
{
{
// @ts-ignore
{  translatedPostComment  };
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
