<template>
	<div class="group">
		<div class="container" v-if="data">
			<div class="row">
				<div class="col">
					<go to="/" id="close">×</go>
					<h1 v-view v-if="data.label">{{data.label.toLowerCase()}}[]</h1>
				</div>
			</div>

			<div class="projects mt-2 pt-1" v-lazy-container="{ selector: 'img', error: '/images/empty.png', loading: '/images/empty.png' }">
				<div class="project row mb-3 mb-md-5" v-for="project of data.projects" :key="project.title" v-view>
					<div class="col-md-8 pr-md-2 pb-1 pb-md-0">
						<div class="image">
							<img :data-src="project.image" />
						</div>
					</div>
					<div class="col-md-4 right info">
						<h2>{{ project.title }}</h2>
						<p v-html="project.description"></p>

						<p v-if="project.team" class="mt-2">
							<span class="float-left mr-1">Together with: </span>
							<span class="d-inline-block">
								<go v-for="(value, key) of project.team" :to="value" class="team" :class="{link: value}" :key="key">{{ key }}</go>
							</span>
						</p>

						<go v-if="project.link" :to="project.link.target" class="button" v-html="project.link.label"></go>
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
	mounted() {
		setTimeout(() => dispatchEvent(new CustomEvent('scroll')), 400);
	}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";
.group {
	padding-top: 5.5vh;
	padding-bottom: 8vh;
	width: 100%;
	overflow: hidden;
}

h1 {
	opacity: 0;
	transform: translateY(30px);
	transition: 0.4s ease-out;
	margin: 0;
	font-size: 4.5rem;

	&.view-in {
		opacity: 1;
		transform: translateY(0);
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
		transition: all 0.5s;
			
		img {
			box-shadow: 0 0 10px #a2a2a2;
		}
	}

	&.view-in--gt-half .image {
		opacity: 1;
		transform: translateX(0);
	}

	.info {
		opacity: 0;
		transform: translateX(100px);
		transition: all 0.5s;
	}

	&.view-in--gt-half .info,
	&.view-in--gt-half h2 {
		opacity: 1;
		transform: translateX(0);
	}
}

.team {
	white-space: nowrap;
	display: table;
	margin-right: 10px;
}
</style>
