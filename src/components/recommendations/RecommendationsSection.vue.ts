
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Recommendation } from '@/types'
import RecommendationCard from './RecommendationCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  recommendations: Recommendation[]
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 4,
})

const { t } = useI18n()
const showAll = ref<boolean>(false)

const hasMoreRecommendations = computed<boolean>(() => {
  return props.recommendations.length > props.initialCount
})

const visibleRecommendations = computed<Recommendation[]>(() => {
  if (showAll.value || !hasMoreRecommendations.value) {
    return props.recommendations
  }
  return props.recommendations.slice(0, props.initialCount)
})

const toggleShowAll = (): void => {
  showAll.value = !showAll.value
}
export default (await import('vue')).defineComponent({
props: (__VLS_mergePropDefaults({} as __VLS_DefinePropsToOptions<Props>, {
  initialCount: 4,
})),
setup() {
() => {
// @ts-ignore
RecommendationCard;
// @ts-ignore
BaseButton;
{
{
// @ts-ignore
for (let rec of visibleRecommendations) {
// @ts-ignore
let recIdx = {} as any;{
// @ts-ignore
(rec.name + '-' + rec.surname + '-' + recIdx);
// @ts-ignore
(rec);
// @ts-ignore
(recIdx);
}
}
}
// @ts-ignore
if (hasMoreRecommendations) {
{
{
// @ts-ignore
(showAll ? t('common.showLess') : t('common.showMore'));
// @ts-ignore
() => { toggleShowAll };
{
// @ts-ignore
{  showAll ? t('common.showLess') : t('common.showMore')  };
}
{
// @ts-ignore
({ 'rotate-180': showAll });
{
}
}
}
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
declare function __VLS_mergePropDefaults<P, D>(props: P, defaults: D): {
			[K in keyof P]: K extends keyof D ? P[K] & {
				default: D[K]
			} : P[K]
		}
