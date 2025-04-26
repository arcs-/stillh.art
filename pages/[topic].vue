<template>
  <UiContainer is="main" v-if="topic" class="py-16 md:pb-40 md:pt-24">
    <div class="relative">
      <UiClose to="/" />
      <h1 v-if="topic.label" class="mb-4 text-6xl">
        {{ topic.label.toLowerCase() }}[]
      </h1>
      <p class="text-xl lg:w-3/5">
        {{ topic.intro }}
      </p>
    </div>

    <div class="!mt-20 space-y-40 md:space-y-80">
      <AnimatedAppear
        is="section"
        v-for="(project, index) in topic.projects"
        :key="project.title"
        class="relative"
      >
        <div class="w-full md:w-5/6" slide-right>
          <div
            class="
              relative overflow-hidden rounded border border-t-0 border-yellow bg-white/10 drop-shadow-lg
            "
          >
            <div class="flex h-4 items-center gap-1 bg-yellow px-2">
              <div class="size-2 rounded-full bg-dark/80" />
              <div class="size-2 rounded-full bg-dark/80" />
              <div class="size-2 rounded-full bg-dark/80" />
              <div
                v-if="topic.label == 'Sites'"
                class="mx-auto h-[9px] w-1/2 bg-dark/20 px-1 text-center text-[7px] leading-[7px] text-dark"
              />
            </div>
            <img
              :src="'/assets'+project.image"
              :alt="'Screenshot of '+project.title"
              :loading="index > 1 ? 'lazy' : 'eager'"
              class="w-full"
            />
          </div>
        </div>
        <div
          class="
            -bottom-16 right-0 z-10 border-yellow bg-white pt-6 text-xl
            dark:bg-dark
            lg:w-2/5
            md:absolute md:rounded-tl md:border-l-2 md:border-t-2 md:pl-14 md:pt-10
          "
        >
          <h2 class="mb-2 font-bold">
            ^ {{ project.title }}
          </h2>
          <p class="text-[1rem] leading-5" v-html="project.description" />
          <p v-if="project.team" class="my-4 text-sm leading-5">
            <span class="float-left pr-8">Together with: </span>
            <span class="inline-block">
              <UiGo
                v-for="(value, key) in project.team"
                :key="key"
                :to="value!"
                :class="{ link: value }"
                class="block"
              >
                {{ key }}
              </UiGo>
            </span>
          </p>

          <UiButton
            v-if="project.link"
            :to="project.link.target"
            class="my-4"
          >
            &gt; {{ project.link.label }}
          </UiButton>
        </div>
      </AnimatedAppear>
    </div>

    <div class="pt-32 text-center text-2xl">
      ~ <span class="inline-block translate-y-[-6px] px-2">end</span> ~
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
import JSConfetti from 'js-confetti'
import { projects as allProjects } from '@/assets/data/projects'

const route = useRoute()

const topicParam = route.params.topic as string
const topic = allProjects.find(g => g.label.toUpperCase() === topicParam.toUpperCase())

if (!topic) {
  throw createError({
    fatal: true,
    statusCode: 404,
    message: 'Not found',
  })
}

useHead({
  title: `Patrick Stillhart // ${topicParam}[]`,
  meta: [
    {
      name: 'description',
      content: topic.intro,
    },
  ],
})

let jsConfetti: JSConfetti | null = null
onMounted(() => {
  jsConfetti = new JSConfetti()
})
onUnmounted(() => {
  jsConfetti?.clearCanvas()
  jsConfetti = null
})

useEventListener(document, 'scroll', () => {
  if (window.innerHeight + window.scrollY === document.body.offsetHeight) {
    jsConfetti?.addConfetti({
      confettiColors: ['#FFD168', '#FFD168', '#ffffff', '#000000'],
    })
  }
})
</script>
