<template>
  <UiGo
    :to="to"
    class="
      group absolute right-0 block size-14
      before:absolute before:inset-0 before:-z-1 before:scale-0 before:rounded before:bg-yellow
      before:transition before:duration-[1s] before:content-['_']
      hover:before:rotate-[360deg] hover:before:scale-100
    "
    aria-label="Close this page"
    unstyled
  >
    <span
      class="scene"
      aria-hidden="true"
    >
      <span class="cross">
        <span
          v-for="bar in 2"
          :key="bar"
          class="bar"
        >
          <span
            v-for="face in ['front', 'back', 'left', 'right', 'top', 'bottom']"
            :key="face"
            class="face"
            :class="face"
          />
        </span>
      </span>
    </span>
  </UiGo>
</template>

<script lang="ts" setup>
defineProps<{ to: string }>()
</script>

<style scoped>
.scene {
  --length: 52px;
  --side: 12px;

  display: block;
  width: 100%;
  height: 100%;
  perspective: 300px;
}

.cross {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(18deg) rotateY(-28deg);
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .cross {
  transform: rotateX(18deg) rotateY(332deg);
}

.bar {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--side);
  height: var(--length);
  transform-style: preserve-3d;
}

.bar:first-child {
  transform: translate(-50%, -50%) rotateZ(45deg);
}

.bar:last-child {
  transform: translate(-50%, -50%) rotateZ(-45deg);
}

.face {
  position: absolute;
  inset: 0;
  background: currentColor;
}

.front {
  transform: translateZ(calc(var(--side) / 2));
}

.back {
  transform: rotateY(180deg) translateZ(calc(var(--side) / 2));
}

.left,
.right,
.top,
.bottom {
  background: theme('colors.yellow');
}

.left {
  transform: rotateY(-90deg) translateZ(calc(var(--side) / 2));
}

.right {
  transform: rotateY(90deg) translateZ(calc(var(--side) / 2));
}

.top,
.bottom {
  height: var(--side);
  filter: brightness(0.85);
}

.top {
  transform: rotateX(90deg) translateZ(calc(var(--side) / 2));
}

.bottom {
  top: auto;
  bottom: 0;
  transform: rotateX(-90deg) translateZ(calc(var(--side) / 2));
}
</style>
