<template>
	<div class="head">
		<div id="cog"></div>		

		<div id="grower" ref="grower"></div>

		<div class="container">
			<div class="row">

				<div class="col col-lg-11 intro">

					<input class="darkmode-checkbox" id="darkMode" type="checkbox" v-model="$root.darkmode" @change="$root.$emit('darkmode', $root.darkmode)">
					<label for="darkMode" :title="$root.darkmode ? 'Is there no sun in this cursed country?!' : 'Join the dark side'">
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
				icon: "M8-4v1H7v1H6V-3H5V-4H3V-6H1V-8H0V-9H1v-1H2v1H3v1H4v1H5v1H6v1H7v1ZM6,8H-6V3H-8v7H8V3H6ZM5,4H-5V6H5ZM-3,2V3H5V1H0V0H-4V1H-5V2h2Zm1-4h1v1H2V0H6V-1H5V-2H3V-3H1V-4H-2V-5H-3v2h1Z",
				link: "https://stackoverflow.com/users/3137109"
			},
			{
				icon: "M7.24-5.56V-6.3H6.48V-7h.76v-3h-3v1.5H3.43v.75H2.67V-8.5H-1.9v.75h-.77V-8.5h-.76V-10H-6.48v3H-5v1.28l-1.48.16h-.76V.37h.76v.74h.77v.74h.76v.74h3.81V4.07H-1.9v.74h-.77v.75H-4.95V4.81h-.76V4.07h-.77V2.59H-8V4.07h.76v.74h.76v.75h.77V6.3H-1.9V10H3.43V4.81H1.9V2.59H5.71V1.85h.77V1.11h.76V.37H8V-5.56ZM5-6.87V-7H6.15Z",
				link: "https://github.com/arcs-"
			},
			{
				icon: "M-9.6,3.45,0,9.85a.91.91,0,0,0,1,0l9.6-6.4A.91.91,0,0,0,11,2.7V-3.71a.9.9,0,0,0-.4-.74L1-10.85a.91.91,0,0,0-1,0l-9.6,6.4a.9.9,0,0,0-.4.74V2.7a.92.92,0,0,0,.4.75Zm8.6,4L-8.07,2.7-4.91.59-1,3.2Zm2,0V3.2L4.91.59,8.07,2.7ZM9,1,6.74-.5,9-2ZM1-8.41,8.07-3.7,4.91-1.59,1-4.2ZM.26-2.63,3.45-.5.26,1.63-2.93-.5ZM-1-8.41V-4.2L-4.91-1.59-8.07-3.7ZM-8-2h0L-5.74-.5-8,1Z",
				link: "https://codepen.io/arcs/"
			},
			{
				icon: "M9-6h1v1H9v4H8V2H7V3H6V5H5V6H4V7H2V8H-1V9H-7V8h-3V7h3V6h2V5H-6V4H-8V1H-9V0h-1V-2h1V-4h-1V-8h1v1h1v1h1v1h2v1h4v1H0V-7H1V-8H2V-9H6v1h4v1H9Zm1-1v1h1V-7Z",
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
		transition: transform .5s ease-in;
		transform: translate(-50%, -50%) scale(20);
	}

	&.mega-expand {
		transition: transform .5s ease-in;
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
		font-size: 1.28em;

		-webkit-text-stroke: 1px currentColor;
    -webkit-text-fill-color: transparent;

		opacity: 0;
	  transform: translateY(-40px);
  	transition: all .5s ease-in-out;

		&.view-in--gt-half {
			opacity: 1;
			transform: translateY(0);
		}

		@include media-breakpoint-down(md) {
				font-size: inherit;
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
