<template>
	<div class="constrain stats mt-2 mt-lg-3">
		<div class="row">
			<div class="col">
			    <go to="/" id="close">×</go>
				<h2 id="overview" v-view>Summary</h2>
			</div>
		</div>

		<div class="row">

			<div class="col-lg-8 mb-1">
				<p class="abstract" v-view>
					If you'd compare me to a cook, I'd be able to cook in two cuisines: web development and game development. With that combination, I'm able to develop some pretty spicy stuff. My specialty are over engineered 404 pages.
				</p>
			</div>

			<!-- TIMELINE -->
			<div class="col-lg-6">
				

				<ul class="timeline mt-2 pt-1">
					<li v-view class="pt-1">
						<div>
							<h3 class="mt-0">2019 - present<small>CH</small></h3>
							Coding Websites and Apps at
							<go to="https://jkweb.ch/" class="link">
								JKweb
							</go>
						</div>
					</li>

					<li v-view>
						<div>
							<h3>2017 - 3 Years<small>CH</small></h3>
							B.Sc. in Informatics in Digital Ideation at
							<go
								to="https://www.hslu.ch/en/lucerne-school-of-information-technology/degree-programs/bachelor/digital-ideation/"
								class="link">
								Hochschule Luzern
							</go>
						</div>
					</li>

					<li v-view>
						<div>
							<h3>2016 - 2 Months<small>USA</small></h3>
							Establishing a new IT environment & forged a new website for
							<go to="https://florentinoicecream.com/" class="link">
								Florentino Ice Cream
							</go>
						</div>
					</li>

					<li v-view class="pb-1">
						<div>
							<h3>2013 - 4 Years<small>CH</small></h3>
							Automated testing and upgrading legacy databases at
							<go to="https://www.credit-suisse.com/" class="link">
								Credit Suisse
							</go>
						</div>
					</li>
				</ul>

				<h4 class="mt-3">Also seen here</h4>
				<go to="https://soi.ch/" class="link">SOI</go> • 
				<go to="https://globalgamejam.org/" class="link">GGJ</go>

			</div>

			<!-- SHIELDS -->
			<div class="col-lg-4 offset-lg-2 shields">
				<div class="shield-wrapper">
					<div class="shield" v-view>
						<h3 class="marginBottomSmall">Weapons</h3>
						<p>
							JavaScript&nbsp;<span>♥</span> / WebGL&nbsp;<span>♥</span>
						</p>
						<p>PHP / SCSS / HTML</p>
						<p>Java / C# / Brainfuck</p>
					</div>
				</div>

				<div class="shield-wrapper">
					<div class="shield" v-view>
						<h3 class="marginBottomSmall">Battlegrounds</h3>
						<p>
							node.js / Vue.js&nbsp;<span>♥</span> / three.js&nbsp;<span>♥</span>
						</p>
						<p>Docker / UnrealEngine / Unity</p>
						<p>Git / webpack / Ionic</p>
						<p>MongoDB / MySQL / ElasticSearch</p>
					</div>
				</div>

				<div class="shield-wrapper">
					<div class="shield" v-view>
						<h3 class="marginBottomSmall">Worlds</h3>
						<p>
							VSCode
							<span>♥</span> / nano / Intellij
						</p>
						<p>Windows / Linux / Android</p>
						
						
						<p>Gimp / Illustrator / Cinema 4D</p>
						<p></p>
					
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Stats"
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.abstract {
	opacity: 0;
	transform: translateY(60px);
	transition: 0.4s ease-out;

	&.view-in {
		opacity: 1;
		transform: translateY(0);
	}
}

/* pinpoints
/* –––––––––––––––––––––––––––––––––––––––––––––––––– */

.shields {
	padding-top: 1.7rem;
}

.shield-wrapper {
	margin: 80px 0;
}

.shield {
	width: 270px;
	
	opacity: 0;
	
	&.view-out--above {
		transform: translateY(-60px);
	}

	&.view-out--below {
		transform: translateY(60px);
	}

	&.view-in {
		opacity: 1;
		transform: translateY(0);
		transition: 0.4s ease-out;
	}

	p {
		white-space: nowrap;
		margin: 0;
	}

	span {
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
			top: 4.8rem;
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
			color: currentColor;
			margin-left: 45px;

			h4 {
				margin: 0;
			}
		}
	}

	small {
		color: $half;
		padding-left: 10px;
	}

	h3::before {
		display: none;
	}
}

/* EFFECTS */
.timeline li {
	&::before {
		transition: all 0.5s ease-out;
	}
	&.view-in--gt-half::before {
		background: currentColor;
		left: -2px;
	}
	div {
		visibility: hidden;
		opacity: 0;
		transition: all 0.5s ease-out;
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
