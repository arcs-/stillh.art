<template>
  <div ref="container" class="relative">
    <ClientOnly>
      <svg
        ref="svg"
        class="
          pointer-events-none absolute size-full
          [&_path]:fill-none [&_path]:stroke-yellow [&_path]:stroke-[4]
        "
        aria-hidden="true"
      >
        <defs />
      </svg>
    </ClientOnly>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { path as d3Path } from 'd3'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}
const svg = ref<SVGAElement>()
const container = ref<HTMLDivElement>()

let ctx: gsap.Context

const spacing = 0
const maxRadius = 65

function refresh() {
  svg.value!.innerHTML = ''

  const stepElements = [
    ...container.value!.querySelectorAll('[data-path-element]'),
  ]

  // get positions
  const offset = svg.value!.getBoundingClientRect()
  const connections = stepElements.map((el, index) => {
    const from = el.querySelector('[data-path-from]')!.getBoundingClientRect()
    const to = el.querySelector('[data-path-to]')!.getBoundingClientRect()
    return { from, to, index }
  })

  // draw connections
  for (let i = 0; i < connections.length - 1; i++) {
    const start = connections[i].from
    const startX = start.left + (start.width / 2) - offset.left
    const startY = start.bottom - offset.top + spacing

    const end = connections[i + 1].to
    const endX = end.left + (end.width / 2) - offset.left
    const endY = end.top - offset.top - spacing

    const path = d3Path()
    path.moveTo(startX, startY)

    // draw connecting arcs
    if (startX !== endX) {
      const r = Math.min(Math.abs(startX - endX) / 2, maxRadius)
      const swapY = startY + ((endY - startY) * 0.85) - (r * 2)

      if (startX < endX) {
        path.arc(startX + r, swapY, r, Math.PI, Math.PI / 2, true)
        path.arc(endX - r, swapY + (r * 2), r, Math.PI / -2, 0)
      } else {
        path.arc(startX - r, swapY, r, 0, Math.PI / 2)
        path.arc(endX + r, swapY + (r * 2), r, Math.PI / -2, Math.PI, true)
      }
    }

    path.lineTo(endX, endY)

    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathElement.setAttribute('d', path.toString())
    pathElement.setAttribute('data-path', '' + i)
    svg.value!.appendChild(pathElement)

    ctx = gsap.context(() => {
      stepElements.forEach((el, index) => {
        const path = svg.value?.querySelector(`[data-path="${index}"]`)
        if (!path) return

        gsap.set(path, {
          strokeDasharray: (_, el) => el.getTotalLength(),
          strokeDashoffset: (_, el) => el.getTotalLength(),
        })

        gsap.to(path, {
          duration: 0.1,
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 50%',
            end: 'bottom 90%',
            scrub: 1,
          },
        })
      })
    })
  }
}

onMounted(() => {
  setTimeout(() => refresh(), 100)
})

useEventListener('resize', refresh)

onUnmounted(() => ctx?.kill())

defineExpose({ refresh })
</script>
