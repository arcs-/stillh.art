<template>
  <div
    ref="container"
    class="relative overflow-hidden"
    :class="{
      '[&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover': aspectRatio,
    }"
    :style="{ aspectRatio }"
  >
    <slot />
    <iframe
      v-if="embed && isVisible"
      :src="src"
      :title="title"
      class="
        absolute top-0 left-0 max-w-none origin-top-left rounded border-0
        bg-dark
      "
      :style="frameStyle"
      allow="autoplay 'none'; fullscreen"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Embed } from '@/assets/data/projects'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// mounted one viewport ahead; fixed-size embeds render at native width and get scaled down
const props = defineProps<{
  embed?: Embed
  title: string
}>()

const container = ref<HTMLDivElement>()
const isVisible = ref(false)
const { width: containerWidth, height: containerHeight } = useElementSize(container)

let trigger: ScrollTrigger | undefined
onMounted(() => {
  if (!props.embed) return
  trigger = ScrollTrigger.create({
    trigger: container.value,
    start: 'top 200%',
    end: 'bottom -100%',
    onToggle: self => (isVisible.value = self.isActive),
  })
})
onBeforeUnmount(() => trigger?.kill())

// codepen embeds: bars in the site colors, and the 30px footer gets cropped away
const isCodepen = computed(() => !!props.embed?.src.includes('codepen.io/'))
const CODEPEN_FOOTER = 30
const CODEPEN_THEME =
  'border=none&theme-id=dark&tab-bar-color=%23FFD168&tab-link-color=%23FFD168&active-tab-color=%23000000&active-link-color=%23FFD168&link-logo-color=%23000000'
const src = computed(() =>
  isCodepen.value ? `${props.embed!.src}&${CODEPEN_THEME}` : props.embed!.src,
)
// pens that size themselves get a taller box than the 16:9 posters
const aspectRatio = computed(() =>
  props.embed?.height
    ? `${props.embed.width} / ${props.embed.height}`
    : isCodepen.value
      ? '3 / 2'
      : undefined,
)

// embeds without a size still get a desktop-wide viewport, so phones show a scaled page instead of a mobile layout
const MIN_WIDTH = 960

const frameStyle = computed(() => {
  if (!containerWidth.value) return { width: '100%', height: '100%' }
  const native = props.embed?.width ?? Math.max(containerWidth.value, MIN_WIDTH)

  const scale = containerWidth.value / native
  const height =
    props.embed?.frameHeight ??
    containerHeight.value / scale + (isCodepen.value ? CODEPEN_FOOTER : 0)
  return {
    width: `${native}px`,
    height: `${height}px`,
    transform: `scale(${scale})`,
  }
})
</script>
