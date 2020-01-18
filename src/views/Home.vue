<template>
	<div class="home">
		<Head></Head>
		<Stats class="mb-2 mb-lg-5"></Stats>
		<div id="info" class="container mb-3 mb-lg-4">
			<div class="row">
				<div class="col-md-8">
					<h2 v-view>Who am I</h2>

					<div id="story" class="mb-4">
						<p v-view>
							<span title="General Kenobi">Hello there!</span>
							I am Patrick, the dev you were looking for. Creator of many things, including this page.
							Currently {{age}} years old and living in Switzerland.
						</p>
						<p v-view>
							All began when I was 11; something took me about a minute every week. Way to much! Therefore, I spent half a year on teaching myself some
							coding, so that I could do more sensible things with my life... like spending the next 10 years on learning some more coding. I'm sure I saved
							a lot of time already.
						</p>
						<p
							v-view
						>Not to sure what else to say... but I have to fill this third section somehow. So, ehm, how did your day go? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor, dui vitae pretium auctor.</p>
					</div>

					<p class="center mb-4" v-view>
						<a href="/cv_online.pdf" class="button peek appear">Curriculum Vitae</a>
					</p>

					<p class="center" v-view>
						cheers and
						<i class="ion-heart"></i> by yours truly,
						<go to="/" class="link">Patrick</go>
					</p>
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
	transition: 0.4s ease-in-out;

	&.view-in {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

