<template>
  <div ref="root" class="w-full text-xl md:w-2/5">
    <AnimatedAppear>
      <div slide-up>
        <h3 class="mb-3 text-2xl">> Numbers</h3>
        <p v-for="item in numbers" :key="item.label" class="
          flex justify-between gap-4
        ">
          <span>{{ item.label }}:</span>
          <ClientOnly>
            <span class="tabular-nums">{{ item.value.toLocaleString() }}</span>
            <template #fallback>
              <span class="tabular-nums">{{ item.value.toLocaleString('en-US') }}</span>
            </template>
          </ClientOnly>
        </p>
      </div>
    </AnimatedAppear>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// snapshot, see STATS_AS_OF in assets/data/projects.ts
const SINCE = 2010
const numbers = [
  { value: new Date().getFullYear() - SINCE, label: 'Years programming' },
  { value: 1953356, label: 'Unsplash views' },
  { value: 658016, label: 'Stack Overflow people reached' },
  { value: 362153, label: 'CodePen views' },
  { value: 84806, label: 'npm downloads' },
  { value: 29543, label: 'Bukkit downloads' },
  { value: 18467, label: 'Unsplash downloads' },
  { value: 3502, label: 'CodePen loves' },
]

const root = ref<HTMLDivElement>()

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  await nextTick()
  const spans = root.value!.querySelectorAll<HTMLSpanElement>('.tabular-nums')
  ScrollTrigger.create({
    trigger: root.value,
    start: 'top 80%',
    once: true,
    onEnter: () =>
      numbers.forEach((item, index) => {
        const counter = { value: 0 }
        gsap.to(counter, {
          value: item.value,
          duration: 1.6,
          delay: index * 0.1,
          ease: 'power2.out',
          onUpdate: () => {
            spans[index]!.textContent = Math.round(counter.value).toLocaleString()
          },
        })
      }),
  })
})
</script>
