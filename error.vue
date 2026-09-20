<template>
  <NuxtLayout>
    <BallsCanvas
      :entries="entries"
      :aria-label="error?.message"
      @select="entry => entry.link && clearError({ redirect: entry.link })"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app'
import type { BallEntry } from '@/assets/js/balls'

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
    .repeat(45)
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
  {
    label: 'Home',
    icon: 'M9.9.3c-.4,0-.7.3-.7.7v10.7H3.8v-6.6c0-.4-.3-.7-.7-.7H-2.8c-.4,0-.7.3-.7.7v6.6h-5.3V1c0-.4-.3-.7-.7-.7s-.7.3-.7.7v11.4c0,.4.3.7.7.7H-2.8c.4,0,.7-.3.7-.7v-6.6H2.4v6.6c0,.4.3.7.7.7h6.7c.4,0,.7-.3.7-.7V1c0-.4-.3-.7-.7-.7h0ZM13.4-.2L.6-10.3c-.3-.2-.6-.2-.9,0L-13.1-.2c-.3.2-.4.7-.1,1,.1.2.3.3.6.3s.3,0,.4-.2L.2-8.8,12.5.9c.3.2.7.2,1-.1.2-.3.2-.7-.1-1h0ZM9.5-4.1c.4,0,.7-.3.7-.7v-4.3c0-.4-.3-.7-.7-.7h-3c-.4,0-.7.3-.7.7v2.2c0,.4.3.7.7.7s.7-.3.7-.7v-1.5h1.6v3.6c0,.4.3.7.7.7h0Z',
    link: '/',
    pin: {
      x: 0.85,
      y: 0.85,
    },
  },
]
</script>
