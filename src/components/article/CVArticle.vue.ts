
import type { ArticleSection } from '@/types'
import ArticleSectionComponent from './ArticleSection.vue'

interface Props {
  sections: ArticleSection[]
}

const props = defineProps<Props>()
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
ArticleSectionComponent;
{
// @ts-ignore
for (let sec of sections) {
// @ts-ignore
let i = {} as any;{
// @ts-ignore
(i);
// @ts-ignore
(sec);
// @ts-ignore
(i);
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
