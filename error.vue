<template>
  <div
    ref="container"
    class="
      relative
      before:absolute before:-z-10 before:size-full before:bg-black/10 before:transition before:content-['']
      before:[mask-image:url('/assets/images/banner.svg')] before:[mask-position:center]
      before:[mask-size:85vw]
      dark:before:bg-white/10
    "
    :aria-label="props.error?.message"
  />
</template>

<script lang="ts" setup>
import Balls from '@/assets/js/balls'

const props = defineProps<{
  error: any
}>()
console.error(props.error)

const { isDark } = useTheme()

const container = ref<HTMLDivElement>()

useHead({
  title: `Patrick Stillhart // ${props.error?.message}`,
  bodyAttrs: { class: computed(() => (isDark.value ? 'dark' : '')) },
})

onMounted(() => {
  const code = props.error?.statusCode
  const entries = code
    .toString()
    .repeat(45)
    .split('')
    .map((label: string) => ({ label }))

  entries.push({ label: props.error?.message, big: true })

  entries.push({
    label: 'Homee',
    icon: 'M9.9.3c-.4,0-.7.3-.7.7v10.7H3.8v-6.6c0-.4-.3-.7-.7-.7H-2.8c-.4,0-.7.3-.7.7v6.6h-5.3V1c0-.4-.3-.7-.7-.7s-.7.3-.7.7v11.4c0,.4.3.7.7.7H-2.8c.4,0,.7-.3.7-.7v-6.6H2.4v6.6c0,.4.3.7.7.7h6.7c.4,0,.7-.3.7-.7V1c0-.4-.3-.7-.7-.7h0ZM13.4-.2L.6-10.3c-.3-.2-.6-.2-.9,0L-13.1-.2c-.3.2-.4.7-.1,1,.1.2.3.3.6.3s.3,0,.4-.2L.2-8.8,12.5.9c.3.2.7.2,1-.1.2-.3.2-.7-.1-1h0ZM9.5-4.1c.4,0,.7-.3.7-.7v-4.3c0-.4-.3-.7-.7-.7h-3c-.4,0-.7.3-.7.7v2.2c0,.4.3.7.7.7s.7-.3.7-.7v-1.5h1.6v3.6c0,.4.3.7.7.7h0Z',
    link: '/',
    pin: { x: 0.85, y: 0.8 },
  })

  Balls.setTheme(isDark.value, true)
  Balls.init(container.value!, (event: MouseEvent | TouchEvent, object: any) => {
    if (object.userData.link) window.location.href = object.userData.link
  }, entries)
})

onBeforeUnmount(() => Balls.stop())
</script>
