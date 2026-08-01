<template>
  <div
    class="
      font-sans
      bg-white
      selection:bg-yellow
      dark:selection:text-dark dark:bg-dark dark:text-white
      transition-colors duration-[.7s]
    ">
    <NuxtLoadingIndicator color="#FFD168" />
    <NuxtPage @mode="toggleTheme" />
  </div>
</template>

<script lang="ts" setup>
const { isDark, toggleTheme } = useTheme()

provide('isDark', isDark)
useHead({
  bodyAttrs: { class: computed(() => (isDark.value ? 'dark' : '')) },
})
</script>

<style>
body { @apply bg-yellow; }
</style>
