<template>
  <div
    class="relative h-dvh w-dvw overflow-hidden before:absolute before:size-full before:bg-black/10 before:transition before:content-[''] before:[mask-image:url('/assets/images/banner.svg')] before:[mask-position:center] before:[mask-size:160vw] md:before:[mask-size:85vw] dark:before:bg-white/10"
  >
    <div
      ref="container"
      class="absolute inset-0 h-dvh w-dvw [&_*]:size-full"
      :aria-label="ariaLabel"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Balls, { type BallEntry, type BallObject } from '@/assets/js/balls'

const props = defineProps<{
  entries: BallEntry[]
  ariaLabel?: string
}>()

const emit = defineEmits<{
  select: [entry: BallEntry, object: BallObject, event: MouseEvent | TouchEvent]
}>()

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const container = ref<HTMLDivElement>()

watch(isDark, dark => Balls.setTheme(dark))

onMounted(() => {
  Balls.setTheme(isDark.value, true)
  Balls.init(
    container.value!,
    (event, object) => emit('select', object.userData, object, event),
    props.entries,
  )
})

onBeforeUnmount(() => Balls.stop())

defineExpose({
  stop: () => Balls.stop(),
})
</script>
