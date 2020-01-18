<template>
	<div class="container stats mt-3">
		<div class="row">
			<div class="col">
				<h2 id="overview" v-view>Overview</h2>
			</div>
		</div>

		<div class="row">
			<!-- TIMELINE -->
			<div class="col-lg-6">
				<ul class="timeline">
					<li v-view>
						<div>
							<h3>
								2019 - present
								<small>CH</small>
							</h3>Coding Websites and Apps at
							<go to="https://jkweb.ch/" class="link" target="_blank">
								JKweb
								<i class="ion-android-open"></i>
							</go>
						</div>
					</li>

					<li v-view>
						<div>
							<h3>
								2017 - present
								<small>CH</small>
							</h3>B.Sc. in Informatics in Digital Ideation at
							<go
								to="https://www.hslu.ch/en/lucerne-school-of-information-technology/degree-programs/bachelor/digital-ideation/"
								class="link"
								target="_blank"
							>
								Hochschule Luzern
								<i class="ion-android-open"></i>
							</go>
						</div>
					</li>

					<li v-view>
						<div>
							<h3>
								2016 - 2016
								<small>USA</small>
							</h3>Establishing a new IT environment & forged a new website for
							<go to="https://florentinoicecream.com/" class="link" target="_blank">
								Florentino Ice Cream
								<i class="ion-android-open"></i>
							</go>
						</div>
					</li>

					<li v-view>
						<div>
							<h3>
								2013 - 2017
								<small>CH</small>
							</h3>Automated testing and upgrading legacy databases at
							<go to="https://www.credit-suisse.com/" class="link" target="_blank">
								Credit Suisse
								<i class="ion-android-open"></i>
							</go>
						</div>
					</li>
				</ul>
			</div>

			<!-- SHIELDS -->
			<div class="col-lg-4 offset-lg-2">
				<div class="shield" v-view>
					<h3 class="marginBottomSmall">Primary Weapons</h3>
					<p>
						JavaScript
						<small>
							<i class="ion-heart"></i>
						</small> / WebGL
						<small>
							<i class="ion-heart"></i>
						</small>
					</p>
					<p>PHP / SCSS / Java</p>
					<p>TypeScript / C# / Brainfuck</p>
				</div>

				<div class="shield" v-view>
					<h3 class="marginBottomSmall">Support Heros</h3>
					<p>
						Node.js
						<small>
							<i class="ion-heart"></i>
						</small> / Vue.js
						<small>
							<i class="ion-heart"></i>
						</small> / three.js
					</p>
					<p>Docker / UnrealEngine / Unity</p>
					<p>Debain / Android / iOS</p>
					<p>MongoDB / ElasticSearch</p>
				</div>

				<div class="shield" v-view>
					<h3 class="marginBottomSmall">Worlds</h3>
					<p>
						VSCode
						<small>
							<i class="ion-heart"></i>
						</small> / nano / Intellij
					</p>
					<p>Git / webpack / Yarn</p>
					<br />
					<p>Gimp 2 / Illustrator / Lightroom</p>
					<p>Cinema 4D</p>
					<br />
				</div>
			</div>
		</div>

		<!--

		<div class="pinpoints-container">
			

			<div class="pinpoints">
				

				<div class="shield" v-view>
					
				</div>
			</div>
		</div>
		-->
	</div>
</template>

<script>
export default {
	name: "Stats"
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.stats {
	overflow: hidden;
	width: 100vw;
}

/* pinpoints
/* –––––––––––––––––––––––––––––––––––––––––––––––––– */

.shield {
	width: 250px;

	margin-top: 80px;
	opacity: 0;
	transform: translateY(60px);

	&.view-in--gt-half {
		opacity: 1;
		transform: translateY(0);
		transition: 0.4s ease-in-out;
	}

	small {
		color: $primary;
	}
}

.timeline {
	display: inline-block;
	max-width: 100%;

	li {
		list-style-type: none;
		position: relative;
		padding-top: 50px;
		border-left: 4px solid $primary;

		&::before {
			content: "";
			position: absolute;
			left: -20px;
			top: 5.4rem;
			transform: translateX(-50%);
			width: 15px;
			height: 15px;
			background: transparent;
			border-radius: 50%;
		}

		div {
			position: relative;
			bottom: 0;
			width: 340px;
			max-width: calc(100% - 45px);
			padding: 15px;
			color: #222;
			margin-left: 45px;

			h4 {
				margin: 0;
			}
		}
	}
}

/* EFFECTS */
.timeline li {
	&::before {
		transition: all 0.5s ease-in-out;
	}
	&.view-in--gt-half::before {
		background: $text;
		left: -2px;
	}
	div {
		visibility: hidden;
		opacity: 0;
		transition: all 0.5s ease-in-out;
		transform: translate3d(200px, 0, 0);
	}
	&.view-in--gt-half div {
		transform: none;
		visibility: visible;
		opacity: 1;
	}
}
@media screen and (max-width: 600px) {
	.timeline li {
		margin-left: 0;
	}
}
</style>
