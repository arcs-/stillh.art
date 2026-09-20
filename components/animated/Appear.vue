<template>
  <component :is="is" ref="el" class="animated-container">
    <slot />
  </component>
</template>

<script lang="ts">
// [slide] comes in from a random side, never the same one twice in a row (shared across instances)
const SLIDE_FROM = {
  left: { x: -160, y: 0 },
  right: { x: 160, y: 0 },
  bottom: { x: 0, y: 320 },
}
type Side = keyof typeof SLIDE_FROM
let lastSide: Side | undefined
const randomSide = () => {
  const sides = (Object.keys(SLIDE_FROM) as Side[]).filter(s => s !== lastSide)
  lastSide = sides[Math.floor(Math.random() * sides.length)] ?? 'bottom'
  return SLIDE_FROM[lastSide]
}
</script>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}
const props = withDefaults(
  defineProps<{
    is?: string
    start?: string
    end?: string
    markers?: boolean
    delay?: number
    out?: boolean
  }>(),
  {
    is: 'div',
    delay: 0,
    out: true,
  },
)

const el = ref<HTMLElement>()

onMounted(() => {
  gsap.delayedCall(props.delay, () => initAnimation())
})

useResizeObserver(
  el,
  useThrottleFn(() => {
    ScrollTrigger.refresh()
  }, 100),
)

const initAnimation = () => {
  gsap.context(self => {
    const slide = self.selector!('[slide-up],[slide-right],[slide-left],[slide-down]')
    const slideRandom = self.selector!('[slide]')
    const zoomIn = self.selector!('[zoom-in]')
    const zoomInOut = self.selector!('[zoom-in-out]')
    const fadeIn = self.selector!('[fade-in]')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.value,
        start: props.start || 'top 90%',
        end: props.end || 'clamp(top 45%)',
        markers: props.markers || false,
        scrub: true,
      },
    })

    if (slide.length)
      tl.add(
        gsap.to(slide, {
          opacity: 1,
          visibility: 'visible',
          y: 0,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: 'easeOut',
        }),
      )

    ;(slideRandom as Element[]).forEach((node, index) =>
      tl.add(
        gsap.fromTo(
          node,
          { ...randomSide(), opacity: 0 },
          { x: 0, y: 0, opacity: 1, visibility: 'visible', duration: 0.4, ease: 'easeOut' },
        ),
        index * 0.1,
      ),
    )

    if (zoomIn.length)
      tl.add(
        gsap.to(zoomIn, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.15,
        }),
        0,
      )

    if (zoomInOut.length)
      tl.add(
        gsap.to(zoomInOut, {
          autoAlpha: 1,
          scale: 1.5,
          duration: 0.9,
          stagger: 0.4,
          delay: 0.5,
          ease: 'back.out(5)',
        }),
        0,
      )

    if (fadeIn.length)
      tl.add(
        gsap.to(fadeIn, {
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.15,
        }),
      )

    // in the top 10% the block gets pushed out faster than the scroll
    if (props.out)
      gsap.fromTo(
        el.value!,
        { y: 0 },
        {
          y: () => -window.innerHeight * 0.1,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: el.value,
            start: 'bottom 10%',
            end: 'bottom 0%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
  }, el.value)
}
</script>

<style>
@reference "~/assets/css/main.css";

@media (prefers-reduced-motion: no-preference) {
  [slide-up] {
    @apply invisible;
    transform: translateY(20rem);
  }
  [slide-down] {
    @apply invisible;
    transform: translateY(-10rem);
    opacity: 0;
  }
  [slide-left] {
    @apply invisible;
    transform: translateX(10rem);
    opacity: 0;
  }
  [slide-right] {
    @apply invisible;
    transform: translateX(-10rem);
    opacity: 0;
  }
  [slide] {
    @apply invisible;
  }
  [fade-in] {
    @apply invisible;
  }
  [zoom-in] {
    @apply invisible;
    transform-box: fill-box;
    transform: scale(0.9);
    transform-origin: center;
  }
  [zoom-in-out] {
    @apply invisible;
    transform-box: fill-box;
    transform: scale(0);
    transform-origin: center;
  }
}
</style>
