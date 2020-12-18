<template>

		<main>
			<transition name="default">
				<router-view class="child-view" />
			</transition>
			<canvas id="fireflies"></canvas>
		</main>

</template>

<style lang="scss">
@import "@/assets/scss/main.scss";

#fireflies {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	pointer-events: none;
}
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
