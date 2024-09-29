<template>
  <a v-if="!to">
    <slot />
  </a>

  <a
    v-else-if="to.startsWith('http')"
    :href="to"
    rel="noreferrer noopener"
    target="_blank"
    class="bg-gradient-to-t from-yellow to-yellow bg-[0_1.06rem] bg-no-repeat transition-all hover:bg-[0_0]"
    :class="{
      'bg-gradient-to-t from-yellow to-yellow bg-[0_1.06rem] bg-no-repeat transition-all hover:bg-[0_0]': !unstyled,
    }"
  >
    <slot />
  </a>

  <NuxtLink
    v-else
    :to="to"
    :class="{
      'bg-gradient-to-t from-yellow to-yellow bg-[0_1.06rem] bg-no-repeat transition-all hover:bg-[0_0]': !unstyled,
    }"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{ to: string; unstyled?: boolean }>()
</script>
