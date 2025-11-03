
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Skill } from '@/types'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useAccessibility } from '@/composables/useAccessibility'
import { TOP_SKILLS_COUNT } from '@/config/constants'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  skills: Skill[]
}

const props = defineProps<Props>()
const { t } = useI18n()

const { observeElement } = useIntersectionObserver()
const { announceToLiveRegion } = useAccessibility()

const showMore = ref(false)
const topSkillsCount = TOP_SKILLS_COUNT

// Sort skills by level (descending) and split into top skills and the rest
const sortedSkills = computed(() => {
  return [...props.skills].sort((a, b) => b.level - a.level)
})

const topSkills = computed(() => {
  return sortedSkills.value.slice(0, topSkillsCount)
})

const additionalSkills = computed(() => {
  return sortedSkills.value.slice(topSkillsCount)
})

const hasMoreSkills = computed(() => {
  return additionalSkills.value.length > 0
})

const visibleSkills = computed(() => {
  return showMore.value ? sortedSkills.value : topSkills.value
})

const toggleShowMore = async () => {
  showMore.value = !showMore.value
  if (showMore.value) {
    // Wait for DOM update before animating
    await nextTick()
    animateAdditionalSkills()
  }
}

const animateAdditionalSkills = () => {
  additionalSkills.value.forEach((skill: Skill, i: number) => {
    window.setTimeout((): void => {
      const index = topSkillsCount + i
      const arrow: HTMLElement | null = document.querySelector<HTMLElement>(
        `[data-skill-index="${index}"]`,
      )
      if (arrow) {
        arrow.style.left = `${skill.level}%`
      }
      announceToLiveRegion('skills-live', `${skill.name}: ${skill.level}%`)
    }, i * 200)
  })
}

const animateSkills = (skills: Skill[], startIndex: number = 0) => {
  skills.forEach((skill: Skill, i: number) => {
    window.setTimeout((): void => {
      const index = startIndex + i
      const arrow: HTMLElement | null = document.querySelector<HTMLElement>(
        `[data-skill-index="${index}"]`,
      )
      if (arrow) {
        arrow.style.left = `${skill.level}%`
      }
      announceToLiveRegion('skills-live', `${skill.name}: ${skill.level}%`)
    }, i * 200)
  })
}

onMounted(() => {
  // Observe skills section to animate arrows only when visible
  observeElement(
    'skills-section',
    () => {
      // Animate top skills initially
      animateSkills(topSkills.value, 0)
    },
    { threshold: 0.2, rootMargin: '0px' },
    true,
  )
})

// Watch for when additional skills are shown and animate them
watch(showMore, (newValue: boolean) => {
  if (newValue) {
    nextTick(() => {
      animateAdditionalSkills()
    })
  }
})
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
BaseButton;
{
{
// @ts-ignore
{  t('sections.skills')  };
}
{
}
{
// @ts-ignore
for (let skill of visibleSkills) {
// @ts-ignore
let index = {} as any;{
// @ts-ignore
(skill.name);
// @ts-ignore
('skill-name-' + index);
// @ts-ignore
({ 'additional-skill': index >= topSkillsCount });
{
// @ts-ignore
('skill-name-' + index);
// @ts-ignore
{  skill.name  };
}
{
// @ts-ignore
(skill.level);
// @ts-ignore
('skill-name-' + index);
// @ts-ignore
(0);
// @ts-ignore
(100);
// @ts-ignore
(skill.level);
// @ts-ignore
{  skill.level  };
}
{
{
// @ts-ignore
({
// @ts-ignore
              background:
// @ts-ignore
                'linear-gradient(to right, #3b82f6 0%, #22c55e 30%, #22c55e 31%, #f97316 49%, #f97316 65%, #ef4444 70%, #ef4444 71%, #ef4444 100%)',
// @ts-ignore
              transform: `scaleX(${skill.level / 100})`,
// @ts-ignore
              transformOrigin: 'left',
// @ts-ignore
            });
}
{
// @ts-ignore
(index);
// @ts-ignore
({"left":"0%","transform":"translateX(-50%)"});
{
}
}
}
}
}
}
// @ts-ignore
if (hasMoreSkills) {
{
{
// @ts-ignore
(showMore);
// @ts-ignore
('additional-skills');
// @ts-ignore
(showMore ? t('common.showLess') : t('common.showMore'));
// @ts-ignore
() => { toggleShowMore };
{
// @ts-ignore
{  showMore ? t('common.showLess') : t('common.showMore')  };
}
{
// @ts-ignore
({ 'rotate-180': showMore });
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
