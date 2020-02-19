<template>
	<div class="head">
		<div id="cog"></div>		

		<div id="grower" ref="grower"></div>

		<div class="container">
			<div class="row">
				<div class="col intro" v-view>

					<div class="mode" @click="$root.$emit('darkmode', $root.darkmode = !$root.darkmode)" title="choose your side">
						<span v-if="$root.darkmode"><i class="ion-ios-sunny"></i></span>
						<span v-else><i class="ion-ios-moon"></i></span>
					</div>

					<h1>
						<sub>Patrick</sub>
						<br />Stillhart
					</h1>
					<p class="half">I'm just here for the code</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Head from "@/assets/js/head";
import Projects from "@/assets/data/projects";

export default {
	name: "Head",
	mounted() {
		this.$root.$on("interact", this.onInteract);

		Head.init(this.$root, [
			...Projects.reduce((acc, cur) => {
				acc.push({
					label: cur.label,
					link: "/" + cur.label.toLowerCase(),
					big: true
				});
				return acc;
			}, []),

			{
				icon: "\uf229",
				link: "https://stackoverflow.com/users/3137109"
			},
			{
				icon: "\uf4e8",
				link: "https://github.com/arcs-"
			},
			{
				icon: "\uf4dd",
				link: "https://codepen.io/arcs/"
			},
			{
				icon: "\uf243",
				link: "https://twitter.com/tiredPatrick"
			}
		]);			

	},
	destroyed() {
		this.$root.$off("interact", this.onInteract);
		Head.stop();
	},
	methods: {
		onInteract(object) {
			this.$refs.grower.style.top = object.position.y + "px";
			this.$refs.grower.style.left = object.position.x + "px";
			this.$refs.grower.style.width = this.$refs.grower.style.height =
				object.circleRadius * 2 + "px";

			if (object.userData.link.startsWith("http")) {
				this.$nextTick(() => this.$refs.grower.classList.add("mega-expand"));
				setTimeout(() => {
					window.open(object.userData.link, '_blank');
					document.body.classList.remove("hover");
					this.$refs.grower.classList.remove("mega-expand");
				}, 300);
			} else {
				this.$nextTick(() => this.$refs.grower.classList.add("expand"));
				Head.stop();
				setTimeout(() => {
					document.body.classList.remove("hover");
					this.$router.push(object.userData.link);
				}, 300);
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.head {
	position: relative;
	min-height: 100vh;
}

#cog {
	position: absolute;
	top: 0;
	left: 0;
}

.mode {
	position: absolute;
	top: 0;
	right: 15px;
	font-size: 3.6rem;
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		color: $primary;
	}
}

#grower {
	position: absolute;
	z-index: 1000;
	background: $primary;
	border-radius: 50%;
	transform: translate(-50%, -50%) scale(0.01);

	&.expand {
		transition: transform 1s;
		transform: translate(-50%, -50%) scale(20);
	}

	&.mega-expand {
		transition: transform 1s;
		transform: translate(-50%, -50%) scale(80);
	}
}

.intro {
	position: relative;
	top: 15vh;

	opacity: 0;
	transform: translateY(10px);
	transition: all 0.7s ease-in-out;

	&.view-in--gt-half {
		opacity: 1;
		transform: translateY(0);
	}
}

h1 {
	margin: 0;

	font-size: 5rem;
	font-weight: 800;
	line-height: 0.8;

	sub {
		font-weight: 700;
		font-size: 0.7em;
	}

	@include media-breakpoint-down(md) {
		font-size: 4rem;
	}
}
</style>
