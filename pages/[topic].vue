<template>
  <UiContainer is="main" v-if="topic" class="py-16 md:pb-40 md:pt-24">
    <div class="relative mb-20!">
      <UiClose to="/" />
      <h1 v-if="topic.label" class="mb-4 text-6xl">{{ topic.label.toLowerCase() }}[]</h1>
      <p class="text-xl lg:w-3/5">
        {{ topic.intro }}
      </p>
    </div>

    <div class="space-y-28 md:space-y-80">
      <ProjectCard
        v-for="(project, index) in topic.projects"
        :key="project.title"
        :project="project"
        :topic-label="topic.label"
        :index="index"
      />
    </div>

    <div class="pt-20 text-center text-2xl md:pt-32">
      ~ <span class="inline-block -translate-y-1.5 px-2">end</span> ~
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
  title: `${topicParam}[] # Patrick Stillhart`,
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

let reachedEnd = false
useEventListener(document, 'scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (!reachedEnd) {
      reachedEnd = true
      jsConfetti?.addConfetti({
        confettiColors: ['#FFD168', '#FFD168', '#ffffff', '#000000'],
      })
    }
  } else {
    reachedEnd = false
  }
})
</script>
