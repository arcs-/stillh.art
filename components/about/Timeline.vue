<template>
  <AnimatedLines class="mx-auto mb-20 md:mb-0 md:w-3/5">
    <ul class="mt-2 space-y-24 pt-1 md:space-y-28 md:[&_li]:w-120">
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
          :class="{
            'top-1 right-0': entry.side === 'right',
            'left-0': entry.side === 'left',
            'top-5': entry.side === 'left' && index > 0,
          }"
          data-path-from
          data-path-to
        />
        <div
          :class="{
            'pr-14 text-right': entry.side === 'right',
            'pl-14 text-left': entry.side === 'left',
            'pt-4': entry.side === 'left' && index > 0,
          }"
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
import { timeline } from '@/assets/data/resume'
</script>
