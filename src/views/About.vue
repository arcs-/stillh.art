<template>
	<div class="home">

		<Stats class="mb-2 mb-lg-4"></Stats>

		<div id="awards" class="container mb-2 mb-lg-4">

			<div class="row">
				<div class="col-lg-7">
					<h2 v-view>Articles and Awards</h2>
				</div>
			</div>

			<ul>
				<li v-view class="from-bottom">
					HSLU > Apr 2021 > <go to="https://www.hslu.ch/en/lucerne-school-of-information-technology/degree-programs/dean-list/" class="link">Dean List</go>
				</li>
				<li v-view class="from-bottom">
					PAGE > Oct 2020 > <go to="https://page-online.de/branche-karriere/bachelorarbeit-werkschau-mal-anders/" class="link">Werkschau mal anders</go>
				</li>
				<li v-view class="from-bottom">
					awwwards > Aug 2020 > <go to="https://www.awwwards.com/sites/di-museum" class="link">Honorable Mention</go>
				</li>
				<li v-view class="from-bottom">
					awwwards > Jul 2020 > <go to="https://www.awwwards.com/sites/di-museum" class="link">Mobile Excellence</go>
				</li>
				<li v-view class="from-bottom">
					ICT Berufsbildung > Aug 2017 > <go to="https://www.zli.ch/berufsverband-oda/ict-berufsabschluss/" class="link">Berufsabschluss im Rang</go>
				</li>
			</ul>

		</div>

		<div id="info" class="container mb-3 mb-lg-2 pb-lg-1">

			<div class="row">
				<div class="col-lg-7">
					<h2 v-view>Note</h2>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-7">
					<div id="story" class="mb-3">
						<p v-view class="mt-0">
							<span title="General Kenobi">Hello there!</span>
							 I’m Patrick (aka arcs) - creator of many things, one of which is this page. I love coding and do a lot of frontend and animation work. 
							 Although, I am trying to get knowledge in as many areas as I can, so I’d consider myself a full-stack dev with a passion for frontend.
						</p>
						<p v-view>
							I did get into coding when I was 11 because I was too lazy to manage permissions on my Minecraft server. It took me half a year to finally 
							get my 30 lines of code to work, but goddammit was I proud. From then on, everything I did was do push further into the world of programming.
						</p>
						<p v-view>
							Aside from coding, I found joy in photography, camping, gaming, and cooking. Also, whenever I work, I kind of need music, 
							so you rarely see me without headphones. The legend goes that sometimes I dance to it; this is a lie.  
						</p>
					</div>

					<p class="center mt-0 mb-4" v-view>
						<a href="/cv_online.pdf" class="button mt-0">Curriculum Vitae</a>
					</p>

					<p class="center mb-3" v-view>
						cheers and ♥ by yours truly,
						<go to="/" class="link">Patrick</go>
					</p>

				</div>

				<div class="col-8 offset-lg-1 col-lg-4 mb-3">
					<img v-lazy="'/images/moins.jpg'" alt="palms t-shirt" v-view/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Stats from "@/components/Stats.vue";

export default {
	name: "home",
	components: { Stats },
	mounted() {
		document.title = "Patrick Stillhart // About";
		setTimeout(() => dispatchEvent(new CustomEvent('scroll')), 400);
	},
	computed: {
		age() {
			return ((Date.now() - new Date("1997/5/7")) / 31557600000) | 0;
		}
	}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

p, .from-bottom {
	opacity: 0;
	transform: translateY(60px);
	transition: 0.4s ease-out;

	&.view-in {
		opacity: 1;
		transform: translateY(0);
	}
}

img {
	opacity: 0;
	transform: translateX(-60px);
	transition: .4s ease-out;

	&.view-in--gt-half {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

