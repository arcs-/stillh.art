<template>
  <UiGo
    :to="to"
    class="
      absolute right-0 text-[7rem] leading-[3.5rem]
      before:absolute before:right-0 before:-z-1 before:aspect-square before:size-full before:scale-0
      before:rounded before:bg-yellow before:transition before:duration-[1s] before:content-['_']
      hover:before:rotate-[360deg] hover:before:scale-[1]
    "
    aria-label="Close this page"
    unstyled
  >
    ×
  </UiGo>
</template>

<script lang="ts" setup>
defineProps<{ to: string }>()
</script>
