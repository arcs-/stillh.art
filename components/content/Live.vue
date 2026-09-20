<template>
  <div
    ref="container"
    class="relative overflow-hidden"
    :class="{ '[&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover': embed?.height }"
    :style="embed?.height ? { aspectRatio: `${embed.width} / ${embed.height}` } : undefined"
  >
    <slot />
    <iframe
      v-if="embed && isVisible"
      :src="embed.src"
      :title="title"
      class="
        absolute left-0 top-0 max-w-none origin-top-left rounded border-0
        bg-dark
      "
      :style="frameStyle"
      allow="autoplay; fullscreen"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Embed } from '@/assets/data/projects'

// Mounts the iframe only while the poster (slot) is in the viewport, so the
// embedded page never runs while scrolled away.
//
// When the embed declares a native size, the iframe is rendered at that size
// and scaled down to the poster's width, so fixed-size content (e.g. an 800px
// wide game) fits without scrollbars. `frameHeight` lets the iframe be taller
// than what's shown, the excess is cropped by the container.
const props = defineProps<{
  embed?: Embed
  title: string
}>()

const container = ref<HTMLDivElement>()
const isVisible = props.embed
  ? useElementVisibility(container, { rootMargin: '100px' })
  : ref(false)
const { width: containerWidth, height: containerHeight } = useElementSize(container)

const frameStyle = computed(() => {
  const native = props.embed?.width
  if (!native || !containerWidth.value) return {
    width: '100%',
    height: '100%',
  }

  const scale = containerWidth.value / native
  const height = props.embed?.frameHeight ?? containerHeight.value / scale
  return {
    width: `${native}px`,
    height: `${height}px`,
    transform: `scale(${scale})`,
  }
})
</script>
