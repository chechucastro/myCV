
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { EmploymentPosition } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'

interface Props {
  position: EmploymentPosition
  companyKey?: string
  positionIndex?: number
}

const props = defineProps<Props>()
const { t, tm } = useI18n()
const { formatDate } = useFormatters()

const translatedPosition = computed(() => {
  if (props.companyKey !== undefined && props.positionIndex !== undefined) {
    return t(`articles.employment.companies.${props.companyKey}.positions.${props.positionIndex}.position`)
  }
  return ''
})

const translatedDescription = computed(() => {
  if (props.companyKey !== undefined && props.positionIndex !== undefined) {
    const translationKey = `articles.employment.companies.${props.companyKey}.positions.${props.positionIndex}.description`
    try {
      // Use tm() for returning message objects/arrays in vue-i18n v9
      const desc = tm(translationKey)
      return Array.isArray(desc) ? desc : []
    } catch (error) {
      console.error('Error fetching description translation:', error, translationKey)
      return []
    }
  }
  return []
})

const translatedTechStack = computed(() => {
  if (props.companyKey !== undefined && props.positionIndex !== undefined) {
    return t(`articles.employment.companies.${props.companyKey}.positions.${props.positionIndex}.techStack`)
  }
  return ''
})
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
BaseCard;
{
{
// @ts-ignore
{  translatedPosition  };
}
{
{
{
}
}
{
// @ts-ignore
(position.startDate);
// @ts-ignore
{  formatDate(position.startDate)  };
}
{
}
// @ts-ignore
if (position.endDate) {
{
// @ts-ignore
(position.endDate);
// @ts-ignore
{ 
        formatDate(position.endDate)
       };
}
}
// @ts-ignore
else {
{
// @ts-ignore
{  t('employment.present')  };
}
}
}
// @ts-ignore
if (translatedDescription.length > 0) {
{
// @ts-ignore
for (let d of translatedDescription) {
// @ts-ignore
let dIdx = {} as any;{
// @ts-ignore
(dIdx);
{
}
{
// @ts-ignore
{  d  };
}
}
}
}
}
// @ts-ignore
if (translatedTechStack) {
{
{
// @ts-ignore
{  t('employment.techStack')  };
}
{
// @ts-ignore
{  translatedTechStack  };
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
