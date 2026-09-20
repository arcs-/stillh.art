<template>
  <div class="w-full space-y-16 text-xl md:w-2/5 [&_span]:text-yellow">
    <AnimatedAppear>
      <div slide-up>
        <h3 class="mb-3 text-2xl">> Weapons</h3>
        <p>JS&nbsp;<span>♥</span> / TS / WebGL&nbsp;<span>♥</span></p>
        <p>PHP / CSS / SVG</p>
        <p>Java / C#</p>
      </div>
    </AnimatedAppear>
    <AnimatedAppear :delay="0.3">
      <div slide-up>
        <h3 class="mb-3 text-2xl">> Battlegrounds</h3>
        <p>node.js / Vue.js&nbsp;<span>♥</span> / three.js&nbsp;<span>♥</span></p>
        <p>gsap / d3 / Git / React / Ionic</p>
        <p>Docker / Unreal Engine / Unity</p>
        <p>MySQL / MongoDB / Elasticsearch</p>
      </div>
    </AnimatedAppear>
    <AnimatedAppear :delay="0.6">
      <div slide-up>
        <h3 class="mb-3 text-2xl">> Environments</h3>
        <p>vscode / zsh / OMZ</p>
        <p>macOS / windows / Solus</p>
        <p>Illustrator / Cinema 4D</p>
      </div>
    </AnimatedAppear>
  </div>
</template>
