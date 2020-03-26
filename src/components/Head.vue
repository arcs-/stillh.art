<template>
	<div class="head">
		<div id="cog"></div>		

		<div id="grower" ref="grower"></div>

		<div class="container">
			<div class="row">

				<div class="col col-lg-11 intro">

					<input class="darkmode-checkbox" id="darkMode" type="checkbox" v-model="$root.darkmode" @change="$root.$emit('darkmode', $root.darkmode)">
					<label for="darkMode" title="switch theme">
						<svg class="darkmode-icon" viewBox="0 0 64 64">
							<clipPath id="sun"><circle cx="33" cy="32" r="12"/></clipPath>
							<circle class="sun" cx="32" cy="32" r="12" />
							<circle class="moon-shadow" cx="60" cy="32" r="12" clip-path="url(#sun)" />
							<g class="rays">
								<path d="M 32,4 l0,10" />
								<path d="M 32,4 l0,10" transform="rotate(45)" transform-origin="50% 50%" />
								<path d="M 32,4 l0,10" transform="rotate(135)" transform-origin="50% 50%"/>
								<path d="M 32,4 l0,10" transform="rotate(180)" transform-origin="50% 50%"/>
								<path d="M 32,4 l0,10" transform="rotate(90)" transform-origin="50% 50%"/>
								<path d="M 32,4 l0,10" transform="rotate(225)" transform-origin="50% 50%"/>
								<path d="M 32,4 l0,10" transform="rotate(270)" transform-origin="50% 50%"/>
								<path d="M 32,4 l0,10" transform="rotate(315)" transform-origin="50% 50%"/>
							</g>
						</svg>
					</label>

					<div>
						<h1>
							<sub v-view>Patrick</sub>
							<span v-view>Stillhart</span>
						</h1>
					
					</div>

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


		/*
		const rays = $$('.rays path');
		rays.map((ray, i) => {
			const p0 = translate(rotate({x: 0, y: -28}, i * 45 * (Math.PI / 180) ), 32, 32);
			const p1 = translate(rotate({x: 0, y: -16}, i * 45 * (Math.PI / 180) ), 32, 32);
			ray.removeAttribute('transform-origin');
			ray.removeAttribute('transform');
			ray.setAttribute('d', `M${p0.x} ${p0.y} L${p1.x} ${p1.y}`);
		});		
		*/

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

.darkmode-icon {
	position: absolute;
	top: 0;
	right: 11px;
	z-index: 1;
	width: 60px;
	cursor: pointer;
	user-select: none;
  
  .moon-shadow {
    transition: cx .6s ease-out;
  }
  
  .rays {
    transition: stroke-dashoffset 400ms ease;   
    stroke-dashoffset: 24;
    stroke-dasharray: 12;
  }
  
  .sun {
      fill: $primary;
  }
  
  .moon-shadow {
    fill: $text;
  }

	&:hover .moon-shadow {
    cx: 52;
  }
  
  .rays, .sun-stroke {
    stroke: $primary;
	stroke-width: 2px;
    fill: none;
  }
}

/** dark mode */

.darkmode-checkbox:checked ~ label {
  
  .darkmode-icon {
    .moon-shadow {
      cx: 39;
    }
    
    .rays {
      stroke-dashoffset: 12;
      stroke-dasharray: 12;
    }
  }  
}

.darkmode-checkbox {
  display: none;
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
	top: 13vh;
}


h1 {
	margin: 0;

	font-size: 7rem;
	font-weight: 800;
	line-height: 0.85;

	-webkit-text-stroke: 1px transparent;
  -webkit-text-fill-color: currentColor;

	@include media-breakpoint-down(md) {
		font-size: 4.8rem;
	}

	sub {
		display: block;
		font-size: 1.13em;

		-webkit-text-stroke: 1px currentColor;
    -webkit-text-fill-color: transparent;

		opacity: 0;
	  transform: translateY(-40px);
  	transition: all .5s ease-in-out;

		&.view-in--gt-half {
			opacity: 1;
			transform: translateY(0);
		}
		
	}

	span {
		display: block;
		opacity: 0;
  	transition: opacity 1s ease-out, color .5s ease-in-out;

		&.view-in--gt-half {
			opacity: 1;
		}
	}

}
</style>
