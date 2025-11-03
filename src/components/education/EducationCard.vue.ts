
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Education } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'

interface Props {
  education: Education
  educationIndex?: number
}

const props = defineProps<Props>()
const { t } = useI18n()
const { formatDate } = useFormatters()

const educationKey = computed(() => {
  return props.education.educationKey !== undefined ? props.education.educationKey : props.educationIndex
})

const translatedDegree = computed(() => {
  if (educationKey.value !== undefined) {
    return t(`articles.education.items.${educationKey.value}.degree`)
  }
  return ''
})

const translatedInstitution = computed(() => {
  if (educationKey.value !== undefined) {
    return t(`articles.education.items.${educationKey.value}.institution`)
  }
  return ''
})

const translatedFieldOfStudy = computed(() => {
  if (educationKey.value !== undefined) {
    const field = t(`articles.education.items.${educationKey.value}.fieldOfStudy`, '')
    return field || ''
  }
  return ''
})

const translatedLocation = computed(() => {
  if (educationKey.value !== undefined) {
    const loc = t(`articles.education.items.${educationKey.value}.location`, '')
    return loc || ''
  }
  return ''
})

const translatedDescription = computed(() => {
  if (educationKey.value !== undefined) {
    const desc = t(`articles.education.items.${educationKey.value}.description`, '')
    return desc || ''
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
{
// @ts-ignore
{  translatedDegree  };
}
{
// @ts-ignore
{  translatedInstitution  };
}
// @ts-ignore
if (translatedFieldOfStudy) {
{
// @ts-ignore
{  translatedFieldOfStudy  };
}
}
}
{
{
{
{
}
}
{
// @ts-ignore
(education.startDate);
// @ts-ignore
{  formatDate(education.startDate)  };
}
{
}
// @ts-ignore
if (education.endDate) {
{
// @ts-ignore
(education.endDate);
// @ts-ignore
{ 
          formatDate(education.endDate)
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
if (translatedLocation) {
{
{
{
}
{
}
}
{
// @ts-ignore
{  translatedLocation  };
}
}
}
// @ts-ignore
if (translatedDescription) {
{
// @ts-ignore
{  translatedDescription  };
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
