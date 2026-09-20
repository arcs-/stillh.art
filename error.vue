<template>
  <NuxtLayout>
    <BallsCanvas ref="balls" :entries="entries" :aria-label="error?.message" @select="onSelect" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app'
import type { BallEntry, BallObject } from '@/assets/js/balls'
import BallsCanvas from '@/components/balls/Canvas.vue'
import { MODE_LINK, themeToggle } from '@/assets/data/links'

const props = defineProps<{
  error: NuxtError
}>()
console.error(props.error)

useHead({
  title: `${props.error?.message} # Patrick Stillhart`,
})

const code = String(props.error?.statusCode ?? '')
const entries: BallEntry[] = [
  ...code
    .repeat(30)
    .split('')
    .map(label => ({
      label,
      link: '/',
    })),
  {
    label: props.error?.message,
    big: true,
    link: '/',
  },
  themeToggle,
]

const balls = ref<InstanceType<typeof BallsCanvas>>()
const colorMode = useColorMode()
function onSelect(entry: BallEntry, object: BallObject) {
  if (entry.link === MODE_LINK) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    return
  }
  if (!entry.link) return
  balls.value!.leave(object, async () => {
    await navigateTo(entry.link)
    clearError()
  })
}
</script>
