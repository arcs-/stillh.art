<template>
  <UiGo :to="to" class="button">
    <slot />
  </UiGo>
</template>

<script lang="ts" setup>
defineProps<{ to: string }>()
</script>

<style lang="postcss" scoped>
.button {
    position: relative;
    display: inline-block;
    overflow: hidden;
    @apply border-yellow border-[3px];
    padding: 10px 30px;
    margin-top: 30px;
    text-align: center;
    background: transparent;
    min-width: 8rem;

    &:before,
    &:after {
        content: "";
        position: absolute;
        top: 50%;
        width: 20px;
        height: 20px;
        @apply bg-yellow;
        border-radius: 50%;
        z-index: -1;
    }
    &:before {
        left: -20px;
        transform: translate(-50%, -50%);
    }
    &:after {
        right: -20px;
        transform: translate(50%, -50%);
    }
    &:hover {
        &:before {
            animation: criss-cross-left 0.8s both;
        }
        &:after {
            animation: criss-cross-right 0.8s both;
        }
    }
}

@keyframes criss-cross-right {
    0% {
        right: -20px;
    }
    50% {
        right: 50%;
        width: 20px;
        height: 20px;
    }
    100% {
        right: 50%;
        width: 375px;
        height: 375px;
    }
}

@keyframes criss-cross-left {
    0% {
        left: -20px;
    }
    50% {
        left: 50%;
        width: 20px;
        height: 20px;
    }
    100% {
        left: 50%;
        width: 375px;
        height: 375px;
    }
}
</style>
