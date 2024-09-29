<template>
  <UiContainer v-if="topic" class="pb-40 pt-20 md:pb-80 md:pt-32">
    <div class="relative">
      <UiClose to="/">
        ×
      </UiClose>
      <h1 v-if="topic.label" class="mb-4 text-6xl">
        {{ topic.label.toLowerCase() }}[]
      </h1>
      <p class="text-xl lg:w-3/5">
        {{ topic.intro }}
      </p>
    </div>

    <div class="!mt-16 space-y-40 md:space-y-60">
      <AnimatedAppear
        v-for="project in topic.projects"
        :key="project.title"
        class="relative"
      >
        <div class="w-full md:w-5/6" slide-up>
          <img
            :src="'/assets'+project.image"
            :alt="'Screenshot of '+ project.title "
            loading="lazy"
            class="aspect-[3/2] w-full rounded object-contain drop-shadow-lg"
          />
        </div>
        <div
          class="
            -bottom-16 right-0 z-10 rounded-tl border-l-2 bg-white pl-14 pt-10 text-xl
            dark:border-yellow dark:bg-dark
            lg:w-2/5
            md:absolute md:border-t-2
          "
        >
          <h2 class="mb-2 font-bold">
            $ {{ project.title }}
          </h2>
          <p class="text-sm leading-5" v-html="project.description" />
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
  </UiContainer>
</template>

<script lang="ts" setup>
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
})
</script>
