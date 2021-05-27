<template>
  <main>
    <transition name="default">
      <router-view class="child-view" />
    </transition>
  </main>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>

<script>
export default {
	mounted() {
		this.$root.$on('darkmode', this.onDarkmode)
		this.onDarkmode()
		setTimeout(_ => document.body.classList.remove('loading'), 5)
	},
	methods: {
		onDarkmode() {
			if(this.$root.darkmode) document.body.classList.add('dark')
			else document.body.classList.remove('dark')
		}
	},
	destroyed() {
		this.$root.$off('darkmode', this.onDarkmode)
	}
}
</script>
