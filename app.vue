<template>
  <div class="font-sans selection:bg-yellow">
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
body { @apply bg-white transition-colors duration-[.7s]; }
body.dark { @apply bg-dark text-white; }
</style>
