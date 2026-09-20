<template>
  <AnimatedAppear is="article" class="relative">
    <div class="w-full md:w-5/6" slide>
      <div
        v-if="project.frame === 'phone'"
        class="flex justify-center md:justify-start md:pl-[12%]"
      >
        <div
          v-for="(shot, shotIndex) in [project.image, project.image2].filter(s => !!s)"
          :key="shot!.src"
          class="relative w-full max-w-64"
          :class="shotIndex > 0 ? 'mt-12 -ml-6' : 'z-10'"
        >
          <div class="absolute top-20 -left-1 h-6 w-1 rounded-l-md bg-yellow" />
          <div class="absolute top-32 -left-1 h-10 w-1 rounded-l-md bg-yellow" />
          <div class="absolute top-44 -left-1 h-10 w-1 rounded-l-md bg-yellow" />
          <div class="absolute top-36 -right-1 h-16 w-1 rounded-r-md bg-yellow" />
          <div
            class="
              relative overflow-hidden rounded-[2.5rem] border-4 border-yellow
              bg-white/10 drop-shadow-lg
            "
          >
            <img
              :src="'/assets' + shot!.src"
              :alt="'Screenshot of ' + project.title"
              :width="shot!.width"
              :height="shot!.height"
              :loading="index > 1 ? 'lazy' : 'eager'"
              class="w-full"
            />
          </div>
        </div>
      </div>
      <div
        v-else
        class="
          relative overflow-hidden rounded-xl border-2 border-t-0 border-yellow
          bg-white/10 drop-shadow-lg
        "
      >
        <div class="flex h-4 items-center gap-1 bg-yellow px-5">
          <div class="size-2 rounded-full bg-dark/90" />
          <div class="size-2 rounded-full bg-dark/90" />
          <div class="size-2 rounded-full bg-dark/90" />
          <div
            v-if="topicLabel === 'Prod'"
            class="
              mx-auto h-2.25 w-1/2 bg-dark/20 px-1 text-center text-[7px]/1.75
              text-dark
            "
          />
        </div>
        <ProjectLive :embed="project.embed" :title="project.title">
          <img
            :src="'/assets' + project.image.src"
            :alt="'Screenshot of ' + project.title"
            :width="project.image.width"
            :height="project.image.height"
            :loading="index > 1 ? 'lazy' : 'eager'"
            class="w-full rounded"
          />
        </ProjectLive>
      </div>
    </div>
    <div
      class="
        right-0 -bottom-16 z-10 border-yellow bg-white pt-6 text-xl
        lg:absolute lg:w-2/5 lg:rounded-tl lg:border-t-2 lg:border-l-2 lg:pt-10
        lg:pl-14
        dark:bg-dark
      "
    >
      <h2 class="mb-2 font-bold">^ {{ project.title }}</h2>
      <p class="text-base/5" v-html="project.description" />
      <p v-if="project.team" class="my-4 text-sm/5">
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
      <ProjectStats v-if="project.stats" :stats="project.stats" />

      <UiButton v-if="project.link" :to="project.link.target" class="my-4">
        &gt; {{ project.link.label }}
      </UiButton>
    </div>
  </AnimatedAppear>
</template>

<script lang="ts" setup>
import type { Project } from '@/assets/data/projects'

defineProps<{
  project: Project
  topicLabel: string
  index: number
}>()
</script>
