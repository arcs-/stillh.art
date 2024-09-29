<template>
  <component :is="as" ref="el" class="animated-container">
    <slot />
  </component>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}
const props = withDefaults(defineProps<{
  as?: string
  start?: string
  end?: string
  markers?: boolean
  delay?: number
}>(), {
  as: 'div',
  delay: 0,
})

const el = ref<HTMLElement>()

onMounted(() => {
  gsap.delayedCall(props.delay, () => initAnimation())
})

const initAnimation = () => {
  gsap.context((self) => {
    const slide = self.selector!('[slide-up],[slide-right],[slide-left],[slide-down]')
    const zoomIn = self.selector!('[zoom-in]')
    const zoomInOut = self.selector!('[zoom-in-out]')
    const fadeIn = self.selector!('[fade-in]')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.value,
        start: props.start || 'top 85%',
        end: props.end || 'bottom 65%',
        markers: props.markers || false,
        scrub: true,
      },
    })

    if (slide.length) tl.add(
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

    if (zoomIn.length) tl.add(
      gsap.to(zoomIn, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.15,
      }),
      0,
    )

    if (zoomInOut.length) tl.add(
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

    if (fadeIn.length) tl.add(
      gsap.to(fadeIn, {
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.15,
      }),
    )
  }, el.value)
}
</script>

<style>
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
