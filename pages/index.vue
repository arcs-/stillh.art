<template>
  <BallsCanvas ref="balls" :entries="links" @select="onSelect">
    <nav
      class="
        pointer-events-none relative z-10 w-0 p-12 whitespace-nowrap opacity-0
        transition duration-700
        focus-within:opacity-100
      "
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
      class="
        fixed top-16 left-1/2 z-10 -translate-x-1/2 rounded bg-yellow px-7 py-2
        font-bold whitespace-nowrap text-black shadow
        **:size-full
      "
      @click="requestGyro"
    >
      Press to use gyro
    </button>
  </BallsCanvas>
</template>

<script setup lang="ts">
import type { BallEntry, BallObject } from '@/assets/js/balls'
import { links, MODE_LINK } from '@/assets/data/links'
import BallsCanvas from '@/components/balls/Canvas.vue'

const colorMode = useColorMode()
const router = useRouter()

const balls = ref<InstanceType<typeof BallsCanvas>>()

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
  event.preventDefault()

  const mouse = event as MouseEvent
  const newTab = mouse.ctrlKey || mouse.which === 2 || entry.link.startsWith('http')
  if (newTab || entry.link.startsWith('mailto')) {
    if (!newTab) balls.value!.grow(object)

    window.open(entry.link, newTab ? '_blank' : '_self', newTab ? 'noopener noreferrer' : '')
    setTimeout(() => balls.value?.shrink(), 700)

    return
  }

  balls.value!.leave(object, () => router.push(entry.link!))
}
</script>
