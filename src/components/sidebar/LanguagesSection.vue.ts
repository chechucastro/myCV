
import { ref, onMounted, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Language } from '@/types'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useAccessibility } from '@/composables/useAccessibility'
import { useFormatters } from '@/composables/useFormatters'

interface Props {
  languages: Language[]
}

const props = defineProps<Props>()
const { t } = useI18n()

const { observeElement } = useIntersectionObserver()
const { announceToLiveRegion } = useAccessibility()
const { getLanguageLevelNumber, getLanguageLevelColor } = useFormatters()

const languagesVisible: Ref<boolean> = ref<boolean>(false)

onMounted(() => {
  // Observe languages section to animate bars only when visible
  observeElement(
    'languages-section',
    () => {
      languagesVisible.value = true
      // Announce languages briefly (one-by-one) so screen reader users hear initial values
      props.languages.forEach((lang: Language, i: number) => {
        window.setTimeout((): void => {
          announceToLiveRegion('languages-live', `${lang.name}: ${lang.level}`)
        }, i * 200)
      })
    },
    { threshold: 0.2, rootMargin: '0px' },
    true,
  )
})
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
{
{
// @ts-ignore
{  t('sections.languages')  };
}
{
}
{
// @ts-ignore
for (let lang of props.languages) {
// @ts-ignore
let idx = {} as any;{
// @ts-ignore
(lang.name);
// @ts-ignore
('lang-name-' + idx);
{
{
// @ts-ignore
('lang-name-' + idx);
// @ts-ignore
{  lang.name  };
}
{
// @ts-ignore
(getLanguageLevelColor(lang.level));
// @ts-ignore
{  t('languages.levels.' + lang.level.toLowerCase())  };
}
}
{
// @ts-ignore
for (let barIndex of 5) {
{
// @ts-ignore
(barIndex);
// @ts-ignore
(true);
{
// @ts-ignore
({
// @ts-ignore
                [getLanguageLevelColor(lang.level)]: barIndex <= getLanguageLevelNumber(lang.level),
// @ts-ignore
                'language-bar-fill':
// @ts-ignore
                  languagesVisible && barIndex <= getLanguageLevelNumber(lang.level),
// @ts-ignore
              });
// @ts-ignore
({
// @ts-ignore
                transitionDelay: `${(barIndex - 1) * 150}ms`,
// @ts-ignore
              });
}
}
}
}
{
// @ts-ignore
(1);
// @ts-ignore
(5);
// @ts-ignore
(getLanguageLevelNumber(lang.level));
// @ts-ignore
(t('aria.languageProficiency', { language: lang.name, level: lang.level }));
// @ts-ignore
{ 
            t('aria.levelOutOf', {
              current: getLanguageLevelNumber(lang.level),
              total: 5,
            })
           };
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
