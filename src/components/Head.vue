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
								<path d="M 32,4 l0,10" style="transform:rotate(45deg);transform-origin:50% 50%;" />
								<path d="M 32,4 l0,10" style="transform:rotate(90deg);transform-origin:50% 50%;"/>
								<path d="M 32,4 l0,10" style="transform:rotate(135deg);transform-origin:50% 50%;"/>
								<path d="M 32,4 l0,10" style="transform:rotate(180deg);transform-origin:50% 50%;"/>
								<path d="M 32,4 l0,10" style="transform:rotate(225deg);transform-origin:50% 50%;"/>
								<path d="M 32,4 l0,10" style="transform:rotate(270deg);transform-origin:50% 50%;"/>
								<path d="M 32,4 l0,10" style="transform:rotate(315deg);transform-origin:50% 50%;"/>
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
import Balls from "@/assets/js/balls";
import Projects from "@/assets/data/projects";

export default {
	name: "Head",
	mounted() {
		this.$root.$on("interact", this.onInteract);

		Balls.init(this.$root, [
			...Projects.reduce((acc, cur) => {
				acc.push({
					label: cur.label,
					link: "/" + cur.label.toLowerCase(),
					big: true
				});
				return acc;
			}, []),

			{
				icon: "M5.31,10.33H-9.09c-.24,0-.24,0-.24-.25v-9h1.51V8.82H3.8V1.11H5.31ZM-6.56,5.44V7.32H2.29V5.44ZM-3.42-6.12l-1,1.63L3.25,0l1-1.63Zm6,8.49L3.09.54l-8.55-2.3L-5.95.07ZM6.77-12.11l-1.87.32L6.42-3.06l1.86-.33ZM4.52-1.88,6.08-2.95l-5-7.32L-.48-9.2ZM2.34,4.89,2.51,3l-8.82-.82-.17,1.89Z",
				link: "https://stackoverflow.com/users/3137109"
			},
			{
				icon: "M-7.07-5.12H7.32L7.4-5a3,3,0,0,0-.26.16L.38.76C.25.88.15,1,0,.8-2.32-1.13-4.63-3-6.93-5A.84.84,0,0,0-7.07-5.12Zm9,6.42L.16,2.74-1.58,1.3-7.21,6H7.52ZM-2.65.4-8.21-4.23V5ZM8.51-4.22,3,.4,8.51,5Z",
				link: "mailto:patrick@stillh.art"
			},
			{
				icon: "M8.32-5A5.24,5.24,0,0,0,7.15-7.55a.25.25,0,0,1-.06-.26,4.8,4.8,0,0,0-.16-3c0-.08-.08-.08-.14-.08a3.79,3.79,0,0,0-1.56.28,7.14,7.14,0,0,0-1.6.88.17.17,0,0,1-.17,0,12.7,12.7,0,0,0-3.58-.35,11.77,11.77,0,0,0-2.5.35.23.23,0,0,1-.15,0,6.47,6.47,0,0,0-2.17-1.07A3.65,3.65,0,0,0-6-11a.13.13,0,0,0-.14.1,4.8,4.8,0,0,0-.13,3.13.17.17,0,0,1,0,.14A5.51,5.51,0,0,0-7.55-3.8,5.7,5.7,0,0,0-6.61-.75,5.43,5.43,0,0,0-4.77.91a8.62,8.62,0,0,0,2.61.91l.1,0-.06.06A2.61,2.61,0,0,0-3,3.37c0,.1-.06.14-.16.16-.28.07-.56.18-.85.24a2,2,0,0,1-1.92-.56c-.29-.29-.55-.61-.83-.91a4.34,4.34,0,0,0-.52-.53,1.78,1.78,0,0,0-1.63-.39H-9v.05a1.41,1.41,0,0,0,.65.69,2.1,2.1,0,0,1,.92,1.19,3.78,3.78,0,0,0,.5,1,2.75,2.75,0,0,0,1.7,1,5,5,0,0,0,2,0l.14,0a.15.15,0,0,0,0,.07c0,.5,0,1,0,1.49A3.55,3.55,0,0,1-3.15,8a1.07,1.07,0,0,1-.51.71,2.61,2.61,0,0,0-.28.17.6.6,0,0,0-.26.43c.15,0,.3.08.45.1A2.07,2.07,0,0,0-2.3,9.06,1.56,1.56,0,0,0-1.67,7.9a9,9,0,0,0,0-1.72,7,7,0,0,1,0-1.51,1.61,1.61,0,0,1,.13-.49,2,2,0,0,1,.23-.36l0,0a1.49,1.49,0,0,0,0,.21,13.49,13.49,0,0,0,0,2A11.2,11.2,0,0,1-1.29,8a4,4,0,0,1-.17.83,2.68,2.68,0,0,1-.31.54.93.93,0,0,0-.2.48c0,.11,0,.17.13.15l.06,0h.3l.37-.07a1.43,1.43,0,0,0,.89-.76A3.65,3.65,0,0,0,.11,8,17.36,17.36,0,0,0,.16,5.72c0-.21,0-.43,0-.65s0-.57,0-.86a2.23,2.23,0,0,1,0-.37c0-.14.11-.2.28-.22,0,.24.07.47.08.71,0,.61,0,1.23,0,1.84s0,1.13,0,1.69A3.44,3.44,0,0,0,.86,9.08a1.42,1.42,0,0,0,1.26.9l.09,0h.3l.12,0a.39.39,0,0,0,0-.35,1,1,0,0,0-.16-.28A2.28,2.28,0,0,1,2,8.14,11.66,11.66,0,0,1,2,6C2,5.3,2,4.6,2.06,3.9v0h0a2.93,2.93,0,0,1,.21.39,3,3,0,0,1,.16,1.35c0,.59-.08,1.18-.09,1.77a6.51,6.51,0,0,0,.06.88.74.74,0,0,0,.12.29,2,2,0,0,0,1.72.92.75.75,0,0,0,.59-.29A1.71,1.71,0,0,0,4.76,9a.88.88,0,0,0-.21-.18,1.6,1.6,0,0,1-.78-1.44,15.19,15.19,0,0,1,0-1.91,10.94,10.94,0,0,0,0-1.81,2.22,2.22,0,0,0-.42-1.1L3,2.09l-.15-.24.47-.09A7.58,7.58,0,0,0,6.15.57,5.16,5.16,0,0,0,8.29-2.85c.05-.23.06-.47.09-.71,0,0,0-.06,0-.1v-.71C8.37-4.58,8.35-4.79,8.32-5Z",
				link: "https://github.com/arcs-"
			},
			{
				icon: "M-9.6,3.45,0,9.85a.91.91,0,0,0,1,0l9.6-6.4A.91.91,0,0,0,11,2.7V-3.71a.9.9,0,0,0-.4-.74L1-10.85a.91.91,0,0,0-1,0l-9.6,6.4a.9.9,0,0,0-.4.74V2.7a.92.92,0,0,0,.4.75Zm8.6,4L-8.07,2.7-4.91.59-1,3.2Zm2,0V3.2L4.91.59,8.07,2.7ZM9,1,6.74-.5,9-2ZM1-8.41,8.07-3.7,4.91-1.59,1-4.2ZM.26-2.63,3.45-.5.26,1.63-2.93-.5ZM-1-8.41V-4.2L-4.91-1.59-8.07-3.7ZM-8-2h0L-5.74-.5-8,1Z",
				link: "https://codepen.io/arcs/"
			},
			{
				icon: "M10.94-6.76S11-8,11-6.71c-.35.42-.69.85-1.07,1.24a9.39,9.39,0,0,1-1,.88.38.38,0,0,0-.15.32A13.06,13.06,0,0,1,4.68,5.56,11.77,11.77,0,0,1-1.61,8.72a13.09,13.09,0,0,1-6.93-.58A11.19,11.19,0,0,1-10.91,7,9.28,9.28,0,0,0-4.34,5.07,4.64,4.64,0,0,1-8.55,1.93a4.88,4.88,0,0,0,2-.07,10.4,10.4,0,0,1-1.09-.45,4.7,4.7,0,0,1-1-.71,4.5,4.5,0,0,1-.78-1,4.55,4.55,0,0,1-.48-1.11,6.08,6.08,0,0,1-.18-1.22,5.24,5.24,0,0,0,2,.51,4.49,4.49,0,0,1-2-3.23,4.37,4.37,0,0,1,.58-2.75A12.91,12.91,0,0,0-.18-3.37c0-.26-.07-.51-.08-.75A4.39,4.39,0,0,1,2-8.28,4.5,4.5,0,0,1,7.3-7.7a.46.46,0,0,0,.54.15C8.26-7.7,8.7-7.8,9.12-8S10.6-7.81,11-8",
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
		Balls.stop();
	},
	methods: {
		onInteract(event, object) {

			if(event.which == 3) return

			this.$refs.grower.style.top = object.position.y + "px";
			this.$refs.grower.style.left = object.position.x + "px";
			this.$refs.grower.style.width = this.$refs.grower.style.height = object.circleRadius * 2 + "px";

			event.preventDefault()

			let newTab = event instanceof MouseEvent && (event.ctrlKey || event.which == 2)

			if(newTab ||
			  object.userData.link.startsWith("http") ||
				object.userData.link.startsWith("mailto") ) {

				if(!newTab) this.$nextTick(() => this.$refs.grower.classList.add("mega-expand"));
				
				window.open(object.userData.link, newTab ? "_blank" : "_self");
				setTimeout(() => {
					document.body.classList.remove("hover");
					this.$refs.grower.classList.remove("mega-expand");
				}, 700);

				return
			}

			this.$nextTick(() => this.$refs.grower.classList.add("expand"));
			Balls.stop();
			setTimeout(() => {
				document.body.classList.remove("hover");
				this.$router.push(object.userData.link);
			}, 300);

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
		transition: transform .3s ease-in;
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
