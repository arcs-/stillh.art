<template>
	<div class="notfound">
		<video id="back" playsinline autoplay muted loop>
			<source src="/nothing.mp4" type="video/mp4" />
		</video>

		<section class="center">
			<video ref="video" playsinline autoplay muted loop>
				<source src="/nothing.mp4" type="video/mp4" />
			</video>

			<h1>404</h1>
			<h2>
				Nothing to see here.
				<br />Please disperse.
			</h2>
		</section>
	</div>
</template>

<script>
export default {
	name: "NotFound",
	methods: {
		toggleMute() {
			this.$refs.video.muted = !this.$refs.video.muted;
		}
	},
	mounted() {
		document.title = "Nothing to see here";
		window.addEventListener('click', this.toggleMute)
	},
	destroyed() {
		window.removeEventListener('click', this.toggleMute)
	}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.notfound {
	background-color: #171717;
	color: #fff;
	text-shadow: 4px 4px #000;
	font-family: Tahoma, sans-serif;
	-webkit-user-select: none;
	user-select: none;
	height: 100vh;
}
#back {
	position: fixed;
	min-width: 100vw;
	min-height: 100vh;
	top: 0;
	left: 0;
	opacity: 0.07;
}
section {
	position: relative;
	margin: 10% auto;
	width: 100%;
	max-width: 1000px;
}
h1 {
	font-size: 170px;
	margin-bottom: 0;
	line-height: 1em;
}
h2 {
	opacity: 1;
	font-size: 2rem;
	transform: none;
}
a {
	color: #fff;
	border-bottom: 3px solid #fff;
	text-decoration: none;
	cursor: pointer;
}
section video {
	float: right;
	width: 600px;
	max-width: 100%;
	margin-left: 20px;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
		0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>

