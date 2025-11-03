
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CompanyHistory } from '@/types'
import CompanyHistorySection from './CompanyHistorySection.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  companyHistory: CompanyHistory[]
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 4,
})

const { t } = useI18n()
const showAll = ref<boolean>(false)

const hasMoreCompanies = computed<boolean>(() => {
  return props.companyHistory.length > props.initialCount
})

const visibleCompanies = computed<CompanyHistory[]>(() => {
  if (showAll.value || !hasMoreCompanies.value) {
    return props.companyHistory
  }
  return props.companyHistory.slice(0, props.initialCount)
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
CompanyHistorySection;
// @ts-ignore
BaseButton;
{
{
// @ts-ignore
for (let company of visibleCompanies) {
// @ts-ignore
let cIdx = {} as any;{
// @ts-ignore
((company.companyKey || 'company') + '-' + cIdx);
// @ts-ignore
(company);
}
}
}
// @ts-ignore
if (hasMoreCompanies) {
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
