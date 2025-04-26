<template>
  <Component
    :is="is"
    class="relative mx-auto max-w-screen-xl space-y-12 px-7 md:space-y-36 md:px-20"
  >
    <slot />
  </Component>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  is?: string
}>(), {
  is: 'div',
})
</script>
