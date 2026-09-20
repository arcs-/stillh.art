<template>
  <p class="my-4 flex flex-wrap gap-x-6 text-sm/5">
    <UiGo v-for="stat in stats" :key="stat.to" :to="stat.to" unstyled>
      <ClientOnly>
        {{ format(stat) }}
        <template #fallback>
          {{ format(stat, 'en-US') }}
        </template>
      </ClientOnly>
    </UiGo>
  </p>
</template>

<script lang="ts" setup>
import type { Stat } from '@/assets/data/projects'

defineProps<{
  stats: Stat[]
}>()

const format = (stat: Stat, locale?: string) => {
  const n = (value: number) => value.toLocaleString(locale)
  const date = (iso: string) => {
    const [year, month, day] = iso.split('-').map(Number)
    return new Date(year!, month! - 1, day).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
    })
  }
  return [
    stat.created && date(stat.created),
    stat.loves !== undefined && `♥ ${n(stat.loves)}`,
    stat.stars !== undefined && stat.stars >= 5 && `★ ${n(stat.stars)}`, // a handful of stars is nothing to brag about
    stat.views !== undefined && `${n(stat.views)} views`,
    stat.downloads !== undefined && `${n(stat.downloads)} downloads`,
    stat.users !== undefined && `${n(stat.users)} users`,
  ]
    .filter(Boolean)
    .join(' · ')
}
</script>
