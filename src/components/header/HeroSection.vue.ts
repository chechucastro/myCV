
interface Props {
  isScrolled: boolean
  name?: string
  jobTitle?: string
  techStack?: string
  profileImage?: string
}

withDefaults(defineProps<Props>(), {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
})
export default (await import('vue')).defineComponent({
props: (__VLS_mergePropDefaults({} as __VLS_DefinePropsToOptions<Props>, {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
})),
setup() {
() => {
{
// @ts-ignore
(isScrolled ? 'h-24 pt-16' : 'h-screen');
{
{
// @ts-ignore
(isScrolled ? 'opacity-0' : 'opacity-100');
}
{
// @ts-ignore
(isScrolled ? 'opacity-0' : 'opacity-100');
}
}
// @ts-ignore
if (!isScrolled) {
{
{
{
{
{
// @ts-ignore
(profileImage);
// @ts-ignore
(name);
}
{
}
}
}
{
{
// @ts-ignore
{  name  };
}
}
{
// @ts-ignore
{  jobTitle  };
}
{
// @ts-ignore
{  techStack  };
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
