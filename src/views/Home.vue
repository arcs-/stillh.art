<template>
	<div class="home">
		<Head></Head>
		<Stats class="mb-2 mb-lg-4"></Stats>
		<div id="info" class="container mb-3 mb-lg-2 pb-lg-1">
			<div class="row">
				<div class="col-lg-7">
					<h2 v-view>Message</h2>

					<div id="story" class="mb-3">
						<p v-view>
							<span title="General Kenobi">Hello there!</span>
							 I’m Patrick (or arcs) - creator of many things, one of which is this page. I love coding and do a lot of frontend and animation work. 
							 Although, I am trying to get knowledge in as many areas as I can, so I’d consider myself a full-stack dev with a passion for frontend.
						</p>
						<p v-view>
							I did get into coding when I was 11 because I was too lazy to manage permissions on my Minecraft server. It took me half a year to finally 
							get my 30 lines of code to work, but goddammit was I proud. From then on, everything I did was do push further into the programming world.
						</p>
						<p v-view>
							Next to coding, I don’t do much, but I found joy in photography, camping, gaming, and cooking. Whenever I work, I kind of need music, 
							so you rarely see me without headphones. The legend goes that sometimes I dance to it; this is a lie.  
						</p>
					</div>

					<p class="center mt-0 mb-4" v-view>
						<a href="/cv_online.pdf" class="button mt-0">Curriculum Vitae</a>
					</p>

					<p class="center mb-2" v-view>
						cheers and ♥ by yours truly,
						<go to="/" class="link">Patrick</go>
					</p>

				</div>

				<div class="col-8 offset-lg-2 col-lg-3 mt-2 mt-md-4 pt-md-1">
					<img v-lazy="'/images/wut.jpg'" alt="palms t-shirt" v-view/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Head from "@/components/Head.vue";
import Stats from "@/components/Stats.vue";

export default {
	name: "home",
	components: { Head, Stats },
	mounted() {
		document.title = "Patrick Stillhart | Developer";
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

p {
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

