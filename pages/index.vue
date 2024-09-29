<template>
  <div
    class="
      relative h-screen w-screen overflow-hidden
      before:absolute before:size-full before:bg-black/10 before:transition before:content-['']
      before:[mask-image:url('/assets/images/banner.svg')] before:[mask-position:center]
      before:[mask-size:85vw]
      dark:before:bg-white/10
    "
  >
    <h1 class="opacity-0">
      Patrick Stillhart
    </h1>

    <nav
      class="
        pointer-events-none relative z-10 w-0 p-12 opacity-0 transition duration-700
        focus-within:opacity-100
      "
    >
      <menu>
        <template v-for="link in links" :key="link.label">
          <li v-if="link.link && link.link != 'MODE'">
            <UiGo :to="link.link">
              {{ link.label }}
            </UiGo>
          </li>
        </template>
      </menu>
    </nav>

    <div ref="container" class="absolute inset-0 size-full" />

    <div
      ref="grower"
      class="
        absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-yellow transition duration-700
      "
      :class="{
        'scale-[15]': expand,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import Balls from '@/assets/js/balls'
import { projects } from '@/assets/data/projects'

const emit = defineEmits(['mode'])

const isDark = inject<Ref<boolean>>('isDark')!
Balls.setTheme(isDark.value, true)

const router = useRouter()

const grower = ref()
const container = ref<HTMLDivElement>()
const expand = ref(false)

const links = [
  {
    label: 'About',
    link: '/about',
    big: true,
  },
  ...projects.map(cur => ({
    label: cur.label,
    link: '/' + cur.label.toLowerCase(),
    big: true,
  })),
  {
    icon: 'M5.31,10.33H-9.09c-.24,0-.24,0-.24-.25v-9h1.51V8.82H3.8V1.11H5.31ZM-6.56,5.44V7.32H2.29V5.44ZM-3.42-6.12l-1,1.63L3.25,0l1-1.63Zm6,8.49L3.09.54l-8.55-2.3L-5.95.07ZM6.77-12.11l-1.87.32L6.42-3.06l1.86-.33ZM4.52-1.88,6.08-2.95l-5-7.32L-.48-9.2ZM2.34,4.89,2.51,3l-8.82-.82-.17,1.89Z',
    link: 'https://stackoverflow.com/users/3137109',
    label: 'Stackoverflow',
  },
  {
    icon: 'M-7.07-5.12H7.32L7.4-5a3,3,0,0,0-.26.16L.38.76C.25.88.15,1,0,.8-2.32-1.13-4.63-3-6.93-5A.84.84,0,0,0-7.07-5.12Zm9,6.42L.16,2.74-1.58,1.3-7.21,6H7.52ZM-2.65.4-8.21-4.23V5ZM8.51-4.22,3,.4,8.51,5Z',
    link: 'mailto:patrick@stillh.art',
    label: 'Email',
  },
  {
    icon: 'M8.32-5A5.24,5.24,0,0,0,7.15-7.55a.25.25,0,0,1-.06-.26,4.8,4.8,0,0,0-.16-3c0-.08-.08-.08-.14-.08a3.79,3.79,0,0,0-1.56.28,7.14,7.14,0,0,0-1.6.88.17.17,0,0,1-.17,0,12.7,12.7,0,0,0-3.58-.35,11.77,11.77,0,0,0-2.5.35.23.23,0,0,1-.15,0,6.47,6.47,0,0,0-2.17-1.07A3.65,3.65,0,0,0-6-11a.13.13,0,0,0-.14.1,4.8,4.8,0,0,0-.13,3.13.17.17,0,0,1,0,.14A5.51,5.51,0,0,0-7.55-3.8,5.7,5.7,0,0,0-6.61-.75,5.43,5.43,0,0,0-4.77.91a8.62,8.62,0,0,0,2.61.91l.1,0-.06.06A2.61,2.61,0,0,0-3,3.37c0,.1-.06.14-.16.16-.28.07-.56.18-.85.24a2,2,0,0,1-1.92-.56c-.29-.29-.55-.61-.83-.91a4.34,4.34,0,0,0-.52-.53,1.78,1.78,0,0,0-1.63-.39H-9v.05a1.41,1.41,0,0,0,.65.69,2.1,2.1,0,0,1,.92,1.19,3.78,3.78,0,0,0,.5,1,2.75,2.75,0,0,0,1.7,1,5,5,0,0,0,2,0l.14,0a.15.15,0,0,0,0,.07c0,.5,0,1,0,1.49A3.55,3.55,0,0,1-3.15,8a1.07,1.07,0,0,1-.51.71,2.61,2.61,0,0,0-.28.17.6.6,0,0,0-.26.43c.15,0,.3.08.45.1A2.07,2.07,0,0,0-2.3,9.06,1.56,1.56,0,0,0-1.67,7.9a9,9,0,0,0,0-1.72,7,7,0,0,1,0-1.51,1.61,1.61,0,0,1,.13-.49,2,2,0,0,1,.23-.36l0,0a1.49,1.49,0,0,0,0,.21,13.49,13.49,0,0,0,0,2A11.2,11.2,0,0,1-1.29,8a4,4,0,0,1-.17.83,2.68,2.68,0,0,1-.31.54.93.93,0,0,0-.2.48c0,.11,0,.17.13.15l.06,0h.3l.37-.07a1.43,1.43,0,0,0,.89-.76A3.65,3.65,0,0,0,.11,8,17.36,17.36,0,0,0,.16,5.72c0-.21,0-.43,0-.65s0-.57,0-.86a2.23,2.23,0,0,1,0-.37c0-.14.11-.2.28-.22,0,.24.07.47.08.71,0,.61,0,1.23,0,1.84s0,1.13,0,1.69A3.44,3.44,0,0,0,.86,9.08a1.42,1.42,0,0,0,1.26.9l.09,0h.3l.12,0a.39.39,0,0,0,0-.35,1,1,0,0,0-.16-.28A2.28,2.28,0,0,1,2,8.14,11.66,11.66,0,0,1,2,6C2,5.3,2,4.6,2.06,3.9v0h0a2.93,2.93,0,0,1,.21.39,3,3,0,0,1,.16,1.35c0,.59-.08,1.18-.09,1.77a6.51,6.51,0,0,0,.06.88.74.74,0,0,0,.12.29,2,2,0,0,0,1.72.92.75.75,0,0,0,.59-.29A1.71,1.71,0,0,0,4.76,9a.88.88,0,0,0-.21-.18,1.6,1.6,0,0,1-.78-1.44,15.19,15.19,0,0,1,0-1.91,10.94,10.94,0,0,0,0-1.81,2.22,2.22,0,0,0-.42-1.1L3,2.09l-.15-.24.47-.09A7.58,7.58,0,0,0,6.15.57,5.16,5.16,0,0,0,8.29-2.85c.05-.23.06-.47.09-.71,0,0,0-.06,0-.1v-.71C8.37-4.58,8.35-4.79,8.32-5Z',
    link: 'https://github.com/arcs-',
    label: 'Github',
  },
  {
    icon: 'M-9.6,3.45,0,9.85a.91.91,0,0,0,1,0l9.6-6.4A.91.91,0,0,0,11,2.7V-3.71a.9.9,0,0,0-.4-.74L1-10.85a.91.91,0,0,0-1,0l-9.6,6.4a.9.9,0,0,0-.4.74V2.7a.92.92,0,0,0,.4.75Zm8.6,4L-8.07,2.7-4.91.59-1,3.2Zm2,0V3.2L4.91.59,8.07,2.7ZM9,1,6.74-.5,9-2ZM1-8.41,8.07-3.7,4.91-1.59,1-4.2ZM.26-2.63,3.45-.5.26,1.63-2.93-.5ZM-1-8.41V-4.2L-4.91-1.59-8.07-3.7ZM-8-2h0L-5.74-.5-8,1Z',
    link: 'https://codepen.io/arcs/',
    label: 'Codepen',
  },
  {
    icon: 'M-4.21-4.91v-6.31H4.21v6.31ZM4.21-1.4h7V11.22H-11.22V-1.4h7V4.91H4.21Z',
    link: 'https://unsplash.com/@arcs_',
    label: 'Unsplash',
  },
  {
    icon: 'M-5.8-3.87h-4.36a.34.34,0,0,0-.35.35v14a.35.35,0,0,0,.35.35H-5.8a.35.35,0,0,0,.35-.35v-14A.35.35,0,0,0-5.8-3.87Zm-2.18-7A2.88,2.88,0,0,0-10.86-8,2.88,2.88,0,0,0-8-5.09,2.88,2.88,0,0,0-5.11-8,2.88,2.88,0,0,0-8-10.84ZM5.29-4.22A5.1,5.1,0,0,0,1.46-2.61v-.91a.35.35,0,0,0-.35-.35H-3.07a.35.35,0,0,0-.35.35v14a.35.35,0,0,0,.35.35H1.28a.35.35,0,0,0,.35-.35V3.55c0-2.33.63-3.24,2.26-3.24S5.81,1.77,5.81,3.68v6.81a.35.35,0,0,0,.35.35h4.35a.35.35,0,0,0,.35-.35V2.8C10.86-.67,10.2-4.22,5.29-4.22Z',
    link: 'https://www.linkedin.com/in/patrick-stillhart/',
    label: 'Linkedin',
  },
  {
    label: 'Toggle Theme',
    icon: 'M7.64-12.57c-2.73-2.81-6.08-3.83-9.88-2.89C-9.17-13.73-12.19-5.85-8.55.06c.5.81,1.08,1.56,1.64,2.33.71.98,1.1,2.06,1.06,3.27-.02.69,0,1.37,0,2.06,0,.5.17.92.48,1.31.1.12.13.27.13.4v3.95c0,1.16.67,1.81,1.81,1.85h.17c.39,2.04,1.54,3.08,3.41,3.08,1.98,0,3.1-.98,3.49-3.06.17-.02.31-.04.46-.06.94-.15,1.5-.75,1.52-1.71.02-1.33,0-2.66,0-3.99,0-.21.04-.37.19-.52.29-.29.42-.65.42-1.06v-2.43c0-1.08.35-2.06.96-2.93.39-.54.79-1.08,1.19-1.64,1.25-1.73,2.02-3.68,2.1-5.81.12-2.97-.85-5.58-2.93-7.7h0l.08.02ZM.98,7.91H-.56V2.58c0-1.02-.02-2.02-.37-2.97C-.56-.52-.23-.67.11-.79h.17c.35.13.71.29,1.06.42-.1.42-.21.89-.29,1.35-.06.29-.06.58-.06.87v6.07h-.02ZM3.85,9.72v1H-3.41v-1s7.26,0,7.26,0ZM.48,16.56c-1.08.08-1.73-.39-1.83-1.31H1.83c0,.71-.54,1.27-1.33,1.31h-.02ZM3.85,13.48H-3.41v-1H3.85v1ZM7.01-.15c-.4.54-.79,1.08-1.19,1.64-.89,1.19-1.27,2.56-1.31,4.04-.02.79,0,1.58,0,2.39h-1.68c0-.1-.04-.21-.04-.33V1.87c0-1.42.52-2.64,1.48-3.7.23-.27.37-.56.25-.9-.19-.71-1-.92-1.54-.4-.27.25-.48.58-.69.89-.12.15-.23.27-.42.17-.06-.02-.12,0-.19-.02-.33-.04-.52-.13-.54-.54-.02-.54-.44-.87-.92-.85-.5,0-.87.35-.9.89,0,.33-.15.4-.44.48-.5.12-.48.12-.79-.29-.17-.23-.33-.44-.52-.65-.4-.4-.96-.46-1.35-.13-.37.33-.4.9,0,1.35C-2.7-.62-2.26.81-2.29,2.45c-.02,1.69,0,3.41,0,5.1v.4h-1.71v-.37c0-.89,0-1.77-.06-2.68-.08-1.42-.65-2.68-1.52-3.79-.73-.94-1.44-1.91-1.94-3.02-1.5-3.37-.62-7.41,2.14-9.86,1.89-1.68,4.08-2.41,6.59-2.18,1.85.17,3.45.94,4.79,2.21,1.96,1.87,2.97,4.14,2.83,6.87-.1,1.75-.73,3.33-1.77,4.74h0l-.04-.04Z',
    link: 'MODE',
    pin: { x: 0.85, y: 0.8 },
  },
]

onMounted(() => {
  Balls.init(container.value!, onInteract, links)

  const motionEvent = window.DeviceMotionEvent as any
  if (motionEvent.requestPermission) {
    document
      .getElementsByTagName('main')[0]
      .addEventListener(
        'click',
        () => motionEvent.requestPermission(),
        { capture: true, once: true },
      )
  }
})

onBeforeUnmount(() => Balls.stop())

function onInteract(event: MouseEvent | TouchEvent, object: any) {
  if (object.userData.link == 'MODE') {
    emit('mode', !isDark.value)
    Balls.setTheme(isDark.value)

    return
  }

  if (event.which == 3) return

  grower.value.style.top = object.position.y + 'px'
  grower.value.style.left = object.position.x + 'px'
  grower.value.style.width = (object.circleRadius * 2) + 'px'
  grower.value.style.height = grower.value.style.width

  event.preventDefault()

  const newTab = event instanceof MouseEvent && (event.ctrlKey || event.which == 2)

  if (
    newTab
    || object.userData.link.startsWith('http')
    || object.userData.link.startsWith('mailto')
  ) {
    if (!newTab) expand.value = true

    window.open(object.userData.link, newTab ? '_blank' : '_self', newTab ? 'noopener noreferrer' : '')
    setTimeout(() => {
      document.body.classList.remove('cursor-pointer')
      expand.value = false
    }, 700)

    return
  }

  expand.value = true
  Balls.stop()
  setTimeout(() => {
    document.body.classList.remove('cursor-pointer')
    router.push(object.userData.link)
  }, 500)
}
</script>
