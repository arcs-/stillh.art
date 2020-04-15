<template>
  <a v-if="!to">
    <slot></slot>
  </a>

  <a v-else-if="to.startsWith('http')" :href="to" rel="noreferrer">
    <slot></slot>
  </a>

  <a v-else-if="to.startsWith('tel:') || to.startsWith('mailto:')" :href="to">
    <slot></slot>
  </a>

  <a v-else @click="click($event, to)" :href="to" >
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
	name: "Go",
	props: ["to"],
	methods: {
		click(e, to) {
			
			e.preventDefault();

			if (to === this.$route.path) {
				window.scroll({
					top: 0,
					left: 0,
					behavior: "smooth",
				});
			} else {
				this.$router.push({path: to})
			}

			this.$emit("navigation");
		},
	}
};
</script>
