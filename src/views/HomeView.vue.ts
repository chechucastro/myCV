
import { ref, onMounted, onUnmounted, computed, nextTick, type Ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SkipToContent from '@/components/header/SkipToContent.vue'
import AppHeader from '@/components/header/AppHeader.vue'
import CVSidebar from '@/components/sidebar/CVSidebar.vue'
import CVArticle from '@/components/article/CVArticle.vue'
import { useScroll } from '@/composables/useScroll'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { skills, languages, articleSections, contactInfo } from '@/data/cv-data'

// Use scroll composable
const { isScrolled } = useScroll()

// Use intersection observer composable
const { observeElement, setupScrollReveal } = useIntersectionObserver()

// Show name in navigation when scrolled past hero section
const showNameInNav: Ref<boolean> = ref<boolean>(false)

// Track if user has scrolled at least once
const hasScrolled: Ref<boolean> = ref<boolean>(false)

// Track if hero section is visible
const isHeroVisible: Ref<boolean> = ref<boolean>(true)

// Show navigation only after first scroll and when hero is not visible
const showNav = computed(() => hasScrolled.value && !isHeroVisible.value)

// Track scroll to detect first scroll
const handleScroll = (): void => {
  if (window.scrollY > 0 && !hasScrolled.value) {
    hasScrolled.value = true
  }
}

onMounted(() => {
  // Setup scroll reveal animations
  setupScrollReveal()

  // Track scroll events for first scroll detection
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Check initial scroll position
  handleScroll()

  // Observe hero section to track visibility and show name in navigation
  nextTick(() => {
    const heroElement = document.getElementById('hero-section')
    if (heroElement) {
      const heroObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            // Update hero visibility (trigger on both entry and exit)
            isHeroVisible.value = entry.isIntersecting

            // Show name when hero section is NOT in view (scrolled past it)
            // Hide name when hero section IS in view (only if not scrolled)
            if (!isScrolled.value) {
              showNameInNav.value = !entry.isIntersecting
            }
          })
        },
        { threshold: 0, rootMargin: '0px' }
      )
      heroObserver.observe(heroElement)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
export default (await import('vue')).defineComponent({
setup() {
() => {
// @ts-ignore
DefaultLayout;
// @ts-ignore
SkipToContent;
// @ts-ignore
AppHeader;
// @ts-ignore
CVSidebar;
// @ts-ignore
CVArticle;
{
{
}
{
// @ts-ignore
(isScrolled);
// @ts-ignore
(showNameInNav);
// @ts-ignore
(showNav);
// @ts-ignore
(contactInfo.name);
// @ts-ignore
(contactInfo.jobTitle);
// @ts-ignore
(contactInfo.techStack);
// @ts-ignore
(contactInfo.profileImage);
}
{
// @ts-ignore
({ 'pt-20 sm:pt-24': showNav });
{
{
// @ts-ignore
(skills);
// @ts-ignore
(languages);
// @ts-ignore
(contactInfo);
}
{
// @ts-ignore
(articleSections);
}
}
}
}
};
return { };
},
});
