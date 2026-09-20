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
    <div
      ref="grower"
      class="absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-yellow transition duration-700"
      :class="{ 'scale-1500': expand }"
    />
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
const grower = ref<HTMLDivElement>()
const expand = ref(false)

// the yellow circle that grows out of a ball into the next page
const grow = (object: BallObject) => {
  const style = grower.value!.style
  style.top = object.position.y + 'px'
  style.left = object.position.x + 'px'
  style.width = object.circleRadius! * 2 + 'px'
  style.height = style.width
  expand.value = true
}
const shrink = () => {
  expand.value = false
  document.body.classList.remove('cursor-pointer')
}
const leave = (object: BallObject, then: () => void) => {
  grow(object)
  Balls.stop()
  setTimeout(() => {
    document.body.classList.remove('cursor-pointer')
    then()
  }, 500)
}

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

defineExpose({ grow, shrink, leave })
</script>
