
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CompanyHistory } from '@/types'
import PositionCard from './PositionCard.vue'

interface Props {
  company: CompanyHistory
}

const props = defineProps<Props>()
const { t } = useI18n()

const companyName = computed(() => {
  if (props.company.companyKey) {
    return t(`articles.employment.companies.${props.company.companyKey}.name`)
  }
  return ''
})
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
PositionCard;
{
{
// @ts-ignore
if (props.company.companyLogo) {
{
{
// @ts-ignore
(props.company.companyLogo);
// @ts-ignore
(`${companyName} logo`);
}
}
}
{
// @ts-ignore
{  companyName  };
}
}
{
// @ts-ignore
for (let pos of props.company.positions) {
// @ts-ignore
let pIdx = {} as any;{
// @ts-ignore
((props.company.companyKey || 'company') + '-' + pIdx);
// @ts-ignore
(pos);
// @ts-ignore
(props.company.companyKey);
// @ts-ignore
(pIdx);
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
