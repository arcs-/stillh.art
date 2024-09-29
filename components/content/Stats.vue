<template>
  <section class="flex flex-col gap-12 md:flex-row">
    <!-- TIMELINE -->
    <AnimatedLines class="mx-auto mb-20 md:mb-0 md:w-3/5">
      <ul class="mt-2 space-y-24 pt-1 [&_li]:md:w-[30rem] md:space-y-28">
        <AnimatedAppear as="li" data-path-element class="relative">
          <div
            zoom-in-out
            class="absolute left-0 size-3 rounded-full bg-black dark:bg-white"
            data-path-from
            data-path-to
          />
          <div class="pl-14" slide-left>
            <span>
              2022 - present <small>CH</small>
            </span>
            <h3 class="text-xl">
              Frontend Circle Lead at <UiGo to="https://novu.ch">
                novu
              </UiGo>
            </h3>
          </div>
        </AnimatedAppear>

        <AnimatedAppear as="li" data-path-element class="relative">
          <div
            zoom-in-out
            class="absolute top-8 size-3 rounded-full bg-black dark:bg-white"
            data-path-from
            data-path-to
          />
          <div class="pl-14" slide-left>
            <span>
              2019 - 3 Years <small>CH</small>
            </span>
            <h3 class="text-xl">
              Coding Websites and Apps at
              <UiGo to="https://jkweb.ch/">
                jkweb
              </UiGo>
            </h3>
          </div>
        </AnimatedAppear>

        <AnimatedAppear as="li" data-path-element class="relative !my-28">
          <div
            zoom-in-out
            class="absolute right-0 top-12 size-3 rounded-full bg-black dark:bg-white"
            data-path-from
            data-path-to
          />
          <div class="pr-14 pt-4 text-right" slide-right>
            <span>2017 - 3 Years <small>CH</small></span>
            <h3 class="text-xl">
              B.Sc. in Informatics in Digital Ideation at
              <UiGo to="https://www.hslu.ch/en/lucerne-school-of-information-technology/degree-programs/bachelor/digital-ideation/">
                Hochschule Luzern
              </UiGo>
            </h3>
          </div>
        </AnimatedAppear>

        <AnimatedAppear as="li" data-path-element class="relative !mb-20">
          <div
            zoom-in-out
            class="absolute top-12 size-3 rounded-full bg-black dark:bg-white"
            data-path-from
            data-path-to
          />
          <div class="pl-14" slide-left>
            <span>2016 - 2 Months <small>USA</small></span>
            <h3 class="text-xl">
              Establishing a new IT environment & forged a new website for
              <UiGo to="https://florentinoicecream.com/">
                Florentino Ice Cream
              </UiGo>
            </h3>
          </div>
        </AnimatedAppear>

        <AnimatedAppear as="li" class="relative" data-path-element>
          <div
            zoom-in-out
            class="absolute right-0 top-12 size-3 rounded-full bg-black dark:bg-white"
            data-path-from
            data-path-to
          />
          <div class="pr-14 pt-4 text-right" slide-right>
            <span>2013 - 4 Years <small>CH</small></span>
            <h3 class="text-xl">
              Automated testing and upgrading databases at
              <UiGo to="https://www.credit-suisse.com/">
                Credit Suisse
              </UiGo>
            </h3>
          </div>
        </AnimatedAppear>
      </ul>
    </AnimatedLines>

    <!-- SHIELDS -->
    <div class="w-full space-y-16 text-xl [&_span]:text-yellow md:w-2/5">
      <AnimatedAppear>
        <div slide-up>
          <h3 class="mb-3 text-2xl">
            > Weapons
          </h3>
          <p>JS&nbsp;<span>♥</span> / TS / WebGL&nbsp;<span>♥</span></p>
          <p>PHP / CSS / SVG</p>
          <p>Java / C#</p>
        </div>
      </AnimatedAppear>
      <AnimatedAppear :delay=".3">
        <div slide-up>
          <h3 class="mb-3 text-2xl">
            > Battlegrounds
          </h3>
          <p>
            node.js / Vue.js&nbsp;<span>♥</span> / three.js&nbsp;<span>♥</span>
          </p>
          <p>gsap / d3 / Git / webpack / Ionic</p>
          <p>Docker / UnrealEngine / Unity</p>
          <p>MongoDB / MySQL / ElasticSearch</p>
        </div>
      </AnimatedAppear>
      <AnimatedAppear :delay=".6">
        <div slide-up>
          <h3 class="mb-3 text-2xl">
            > Environments
          </h3>
          <p>vscode&nbsp;<span>♥</span> / nano</p>
          <p>macOS / Solus</p>
          <p>Illustrator / Cinema 4D</p>
        </div>
      </AnimatedAppear>
    </div>
  </section>
</template>
