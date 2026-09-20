<template>
  <BallsCanvas ref="balls" :entries="links" @select="onSelect">
    <nav
      class="pointer-events-none relative z-10 w-0 whitespace-nowrap p-12 opacity-0 transition duration-700 focus-within:opacity-100"
    >
      <h1 class="mb-4">Patrick Stillhart's Portfolio</h1>
      <menu>
        <template v-for="link in links" :key="link.label">
          <li v-if="link.link && link.link !== MODE_LINK">
            <UiGo :to="link.link">
              {{ link.label }}
            </UiGo>
          </li>
        </template>
      </menu>
    </nav>

    <button
      v-if="promptInteract"
      type="button"
      class="fixed left-1/2 top-16 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-yellow px-7 py-2 font-bold text-black shadow [&_*]:size-full"
      @click="requestGyro"
    >
      Press to use gyro
    </button>

    <div
      ref="grower"
      class="absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-yellow transition duration-700"
      :class="{
        'scale-[15]': expand,
      }"
    />
  </BallsCanvas>
</template>

<script setup lang="ts">
import type { BallEntry, BallObject } from '@/assets/js/balls'
import { links, MODE_LINK } from '@/assets/data/links'

const colorMode = useColorMode()
const router = useRouter()

const balls = ref<{ stop: () => void }>()
const grower = ref<HTMLDivElement>()
const expand = ref(false)

const promptInteract = ref(false)

function getPermissionFunction() {
  const DeviceMotion = window.DeviceMotionEvent as any as DeviceMotionEvent & {
    requestPermission?: () => Promise<string>
  }
  return DeviceMotion?.requestPermission
}

async function hasGyroPermission() {
  try {
    const response = await getPermissionFunction()?.()
    return response === 'granted'
  } catch {
    return false
  }
}

function requestGyro() {
  getPermissionFunction()?.()
  promptInteract.value = false
}

onMounted(async () => {
  if (getPermissionFunction() && !(await hasGyroPermission())) {
    promptInteract.value = true
    document.getElementById('arcs')?.addEventListener('click', requestGyro, {
      capture: true,
      once: true,
    })
  }
})

function onSelect(entry: BallEntry, object: BallObject, event: MouseEvent | TouchEvent) {
  if (entry.link === MODE_LINK) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    event.preventDefault()

    return
  }

  if (!entry.link) return
  if ((event as MouseEvent).which === 3) return

  grower.value!.style.top = object.position.y + 'px'
  grower.value!.style.left = object.position.x + 'px'
  grower.value!.style.width = object.circleRadius! * 2 + 'px'
  grower.value!.style.height = grower.value!.style.width

  event.preventDefault()

  const mouse = event as MouseEvent
  const newTab = mouse.ctrlKey || mouse.which === 2 || entry.link.startsWith('http')
  if (newTab || entry.link.startsWith('mailto')) {
    if (!newTab) expand.value = true

    window.open(entry.link, newTab ? '_blank' : '_self', newTab ? 'noopener noreferrer' : '')
    setTimeout(() => {
      document.body.classList.remove('cursor-pointer')
      expand.value = false
    }, 700)

    return
  }

  expand.value = true
  balls.value?.stop()
  setTimeout(() => {
    document.body.classList.remove('cursor-pointer')
    router.push(entry.link!)
  }, 500)
}
</script>
