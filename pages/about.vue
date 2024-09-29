<template>
  <UiContainer class="overflow-hidden py-20 md:py-36 md:pb-40">
    <section class="relative">
      <UiClose
        to="/"
      />
      <h1 class="mb-4 text-6xl">
        About
      </h1>
      <p class="text-xl lg:w-3/5">
        I have two passions: web development and game development. Combining
        these allows me to create some truly exciting projects. My expertise
        lies in crafting 3D websites and animations.
      </p>
    </section>

    <ContentStats />

    <section class="text-xl">
      <AnimatedAppear>
        <h2 class="mb-4 text-6xl" slide-right>
          Articles and Awards
        </h2>
      </AnimatedAppear>
      <AnimatedAppear as="ul">
        <li slide-up>
          HSLU > Apr 2021 >
          <UiGo to="https://www.hslu.ch/en/lucerne-school-of-information-technology/degree-programs/dean-list/">
            Dean List
          </UiGo>
        </li>
        <li slide-up>
          PAGE > Oct 2020 >
          <UiGo to="https://page-online.de/branche-karriere/bachelorarbeit-werkschau-mal-anders/">
            Werkschau mal anders
          </UiGo>
        </li>
        <li slide-up>
          awwwards > Aug 2020 >
          <UiGo to="https://www.awwwards.com/sites/di-museum">
            Honorable Mention
          </UiGo>
        </li>
        <li slide-up>
          awwwards > Jul 2020 >
          <UiGo to="https://www.awwwards.com/sites/di-museum">
            Mobile Excellence
          </UiGo>
        </li>
        <li slide-up>
          ICT Berufsbildung > Aug 2017 >
          <UiGo to="https://www.zli.ch/berufsverband-oda/ict-berufsabschluss/">
            Berufsabschluss im Rang
          </UiGo>
        </li>
      </AnimatedAppear>

      <AnimatedAppear as="div">
        <h4 class="mb-2 mt-12 text-2xl" slide-up>
          Also seen here
        </h4>
        <UiGo class="inline-block leading-5" to="https://soi.ch/" slide-up>
          SOI
        </UiGo>
        <span class="inline-block px-2" slide-up>•</span>
        <UiGo class="inline-block leading-5" to="https://globalgamejam.org/" slide-up>
          GGJ
        </UiGo>
      </AnimatedAppear>
    </section>

    <AnimatedAppear as="section">
      <h2 class="mb-4 text-6xl" slide-right>
        Note
      </h2>
      <div class="flex flex-col gap-20 md:flex-row">
        <div class="w-full md:w-3/5">
          <div class="space-y-8 text-xl">
            <p slide-up>
              <span title="General Kenobi">Hello there!</span>
              I’m Patrick (aka arcs) - creator of many things, one of which is
              this page. I love coding and do a lot of frontend and animation
              work. Although, I am trying to get knowledge in as many areas as I
              can, so I’d consider myself a full-stack dev with a passion for
              frontend.
            </p>
            <p slide-up>
              I did get into coding when I was 11 because I was too lazy to
              manage permissions on my Minecraft server. It took me half a year
              to finally get my 30 lines of code to work, but it was so worth
              it. From then on, everything I did was do push further into the
              world of programming.
            </p>
            <p slide-up>
              Aside from coding, I found joy in photography, camping, gaming,
              cycling, and cooking. Also, whenever I work, I kind of need music,
              so you rarely see me without headphones. The legend goes that
              sometimes I dance to it; this is a lie.
            </p>
          </div>
        </div>

        <div class="w-3/5 md:w-2/5" slide-down>
          <img
            src="/assets/images/me.jpg"
            loading="lazy"
            alt="Profile of me"
          />
        </div>
      </div>
    </AnimatedAppear>

    <AnimatedAppear class="!mt-12">
      <p slide-up>
        <UiButton to="/cv.pdf">
          Curriculum Vitae
        </UiButton>
      </p>
      <p class="my-24 text-lg" slide-up>
        cheers and <span class="text-yellow">♥</span> by yours truly,
        <UiGo to="/">
          Patrick
        </UiGo>
      </p>
    </AnimatedAppear>
  </UiContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'Patrick Stillhart // About',
})
</script>
