<template>
	<div class="group">
		<div class="container" v-if="data">
			<div class="row">
				<div class="col">
					<go to="/" id="close">
						×
					</go>
					<h1 v-view># {{data.label}}</h1>
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
@import "@/assets/scss/_mixins.scss";
.group {
	padding-top: 5.5vh;
	padding-bottom: 8vh;
	width: 100%;
	overflow: hidden;
}

h1 {
	display: inline-block;
	opacity: 0;
	transform: translateY(30px);
	transition: 0.4s ease-out;
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
	font-size: 5rem;
	line-height: 80px;
	transition: color 0.3s;

	// ignore kerning
	margin-right: -7px;

	@include media-breakpoint-down(md) {
		line-height: .55em;

		&:before {
			top: 31px!important;
		}
	}    

	&::before {
		content: "";
		position: absolute;
		z-index: -1;
		top: 45px;
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
			animation: wobble 3s ease infinite alternate;
			width: 80px;
			height: 80px;
		}

	}
}

@keyframes wobble {
  10%, 100% {
    transform: translate(-50%, -50%) translate3d(-1px, 1px, 0); 
  }
  
  20%, 80% {
    transform: translate(-50%, -50%) translate3d(2px, -1px, 0);
  }

  30%, 70% {
    transform: translate(-50%, -50%) translate3d(-2px, -1px, 0);
  }

  40%, 60% {
    transform: translate(-50%, -50%) translate3d(3px, 2px, 0);
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
