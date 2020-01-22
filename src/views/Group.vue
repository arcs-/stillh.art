<template>
	<div class="group">
		<div class="container" v-if="data">
			<div class="row">
				<div class="col">
					<go to="/" id="close">
						<i class="ion-close"></i>
					</go>
					<h1 v-view>My {{data.label}}</h1>
				</div>
			</div>

			<div class="projects mt-4">
				<div class="project row mb-4" v-for="project of data.projects" :key="project.title" v-view>
					<div class="col-md-6">
						<div class="aspect a32 image">
							<img v-lazy="project.image" />
						</div>
					</div>
					<div class="col-md-6 right info">
						<h2>{{ project.title }}</h2>
						<p v-html="project.description"></p>

						<p v-if="project.team" class="mt-2">
							<span class="mr-1">Togheter with: </span><go v-for="(value, key) of project.team" :to="value" class="team" :class="{link: value}">{{ key }}</go>
						</p>

						<go :to="project.link.target" class="button" v-html="project.link.label"></go>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="container">
			<go to="/" id="close">
				<i class="ion-close"></i>
			</go>
			<h1>You fucked it up! -.-'</h1>
		</div>
	</div>
</template>

<script>
import Head from "@/assets/js/head";
import Projects from "@/assets/data/projects";

export default {
	name: "Group",
	data() {
		return {
			data: {}
		};
	},
	beforeRouteEnter(to, from, next) {
		if (!to.params.group) return next();

		let data = Projects.find(
			g => g.label.toUpperCase() == to.params.group.toUpperCase()
		);

		if (data) {
			next(instance => {
				instance.data = data;
				document.title = data.label + " | Patrick Stillhart";
			});
		} else {
			next({ name: "404", params: [to.path], replace: true });
		}
	},
	mounted() {}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.group {
	padding-top: 10vh;
	padding-bottom: 15vh;
	width: 100%;
	overflow: hidden;
}

h1 {
	display: inline-block;
	opacity: 0;
	transform: translateY(30px);
	transition: 0.4s ease-in-out;
	margin: 0;

	&.view-in {
		opacity: 1;
		transform: translateY(0);
	}
}

#close {
	position: relative;
	float: right;
	z-index: 10;
	font-size: 3rem;
	color: $half;
	transition: color 0.3s;

	&::before {
		content: "";
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		transform: translate(-50%, -50%);
		background: $primary;
		border-radius: 50%;
		transition: all 0.3s;
	}

	&:hover {
		color: $text;

		&::before {
			width: 80px;
			height: 80px;
		}
	}
}

.project {
	h2 {
		margin-top: 0;
		transform: none !important;
	}

	.image {
		position: relative;
		opacity: 0;
		transform: translateX(-100px);
		transition: all 0.3s;
	}

	&.view-in .image {
		opacity: 1;
		transform: translateX(0);
	}

	.info {
		opacity: 0;
		transform: translateX(100px);
		transition: all 0.3s;
	}

	&.view-in .info,
	&.view-in h2 {
		opacity: 1;
		transform: translateX(0);
	}
}

.team {
	white-space: nowrap;
	display: inline-block;
	margin-right: 10px;
}
</style>
