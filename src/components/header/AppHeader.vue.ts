
import ThemeToggle from './ThemeToggle.vue'
import LanguageSelector from './LanguageSelector.vue'
import NavigationHeader from './NavigationHeader.vue'
import HeroSection from './HeroSection.vue'

interface Props {
  name?: string
  jobTitle?: string
  techStack?: string
  profileImage?: string
  isScrolled: boolean
  showNameInNav: boolean
  showNav: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
  showNav: false,
})
export default (await import('vue')).defineComponent({
props: (__VLS_mergePropDefaults({} as __VLS_DefinePropsToOptions<Props>, {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
  showNav: false,
})),
setup() {
() => {
// @ts-ignore
ThemeToggle;
// @ts-ignore
LanguageSelector;
// @ts-ignore
NavigationHeader;
// @ts-ignore
HeroSection;
{
// @ts-ignore
({"margin-left":"calc((100vw - 100%) / -2)","margin-right":"calc((100vw - 100%) / -2)"});
{
// @ts-ignore
(showNav);
// @ts-ignore
(vShow);
// @ts-ignore
({ 'shadow-md': isScrolled });
{
{
// @ts-ignore
if (isScrolled || showNameInNav) {
{
// @ts-ignore
(name);
// @ts-ignore
(jobTitle);
// @ts-ignore
(techStack);
// @ts-ignore
(profileImage);
// @ts-ignore
(isScrolled);
// @ts-ignore
(showNameInNav);
}
}
}
// @ts-ignore
if (!isScrolled && !showNameInNav) {
{
}
}
{
{
{
}
}
{
{
}
}
{
{
}
}
}
}
}
{
// @ts-ignore
(isScrolled);
// @ts-ignore
(name);
// @ts-ignore
(jobTitle);
// @ts-ignore
(techStack);
// @ts-ignore
(profileImage);
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
