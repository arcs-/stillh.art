<template>
  <AnimatedLines class="mx-auto mb-20 md:mb-0 md:w-3/5">
    <ul class="mt-2 space-y-24 pt-1 md:space-y-28 [&_li]:md:w-120">
      <AnimatedAppear
        is="li"
        v-for="(entry, index) in timeline"
        :key="entry.period"
        data-path-element
        class="relative"
        :class="{ 'pb-8': index === 0 }"
      >
        <div
          zoom-in-out
          class="absolute size-3 rounded-full bg-black dark:bg-white"
          :class="dotClass(entry, index)"
          data-path-from
          data-path-to
        />
        <div
          :class="
            entry.side === 'left'
              ? [
                  'pl-14 text-left',
                  index > 0 &&
                    `
            pt-4
          `,
                ]
              : `pr-14 text-right`
          "
          :slide-left="entry.side === 'left' ? '' : undefined"
          :slide-right="entry.side === 'right' ? '' : undefined"
        >
          <span
            >{{ entry.period }} <small>{{ entry.where }}</small></span
          >
          <h3 class="text-xl">
            {{ entry.text }}
            <UiGo :to="entry.link.to">
              {{ entry.link.label }}
            </UiGo>
          </h3>
        </div>
      </AnimatedAppear>
    </ul>
  </AnimatedLines>
</template>

<script lang="ts" setup>
import { timeline, type TimelineEntry } from '@/assets/data/resume'

const dotClass = (entry: TimelineEntry, index: number) => {
  if (entry.side === 'right') return 'right-0 top-1'
  return index === 0 ? 'left-0' : 'left-0 top-5'
}
</script>
