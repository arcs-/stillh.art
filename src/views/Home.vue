<template>
	<div class="home">
		<Head></Head>
		<Stats class="mb-2 mb-lg-4"></Stats>
		<div id="info" class="container mb-3 mb-lg-2 pb-lg-1">
			<div class="row">
				<div class="col-lg-6">
					<h2 v-view>Message</h2>

					<div id="story" class="mb-3">
						<p v-view>
							<span title="General Kenobi">Hello there!</span>
							I am Patrick, the dev you were looking for... or looking at. Creator of many things, including this page.
							Currently {{age}} years old and living in Switzerland.
						</p>
						<p v-view>
							All began when I was 11 - something took me about a minute every week. Way to much! So I spent half a year on learning some
							coding, so that I could do more sensible things with my life... like spending the next 10 years on learning some more coding. I'm sure I saved
							a lot of time already.
						</p>
						<p v-view>
							Not to sure what else to say... but I have to fill this third section somehow. So, ehm, how did your day go? Lorem ipsum dolor sit amet, 
							consectetur adipiscing elit. Aenean tempor, dui vitae pretium auctor.
						</p>
					</div>

					<p class="center mt-0 mb-4" v-view>
						<a href="/cv_online.pdf" class="button mt-0">Curriculum Vitae</a>
					</p>

					<p class="center mb-2" v-view>
						cheers and
						<i class="ion-heart"></i> by yours truly,
						<go to="/" class="link">Patrick</go>
					</p>

				</div>

				<div class="col-8 offset-lg-2 col-lg-3 mt-2 mt-md-4">
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
	transition: 1.4s ease-out;

	&.view-in--gt-half {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

