class Planet {

	constructor(config) {

		this.config = Object.assign({
			orbit: 0,
			speed: 0,
			xOff: 2,
			yOff: 2,
			path: null,
			width: 0,
			height: 0,
			fps: 1,
			missing: 0,
			blockRadius: 0,
			connectable: false,
			dWidth: 0,
			dHeight: 0,
			shadow: false,
			verticalPush: 1,
			horizontalPush: 1,
			progress: 0,
		}, config)

		if (config.path) this.image = new Animation(this.config.width, this.config.height, this.config.path, this.config.missing, this.config.fps, this.config.dWidth, this.config.dHeight)

		this.progress = this.config.progress
		this.x = 0
		this.y = 0

	}

	draw(shadowRun) {

		if (!shadowRun) {

			noFill()
			noStroke()

			this.progress += this.config.speed

			this.x = -sin(this.progress) * this.config.orbit * this.config.verticalPush
			this.y = cos(this.progress) * this.config.orbit * this.config.horizontalPush

			if (this.image) this.image.draw(this.x - this.image.width / this.config.xOff | 0, this.y - this.image.height / this.config.yOff | 0)
			else {
				fill(155, 135, 95)
				ellipse(this.x, this.y, 30, 30)
			}

		} else {

			push()
			rotate(this.progress)

			if (this.config.shadow) image(
				shadow,

				-shadow.width / 4,
				shadow.height / -2 + this.config.orbit + 20,

				shadow.width / 2,
				shadow.height / 2)

			pop()

		}

		if (DEBUG) {
			stroke(255, 0, 0)
			ellipse(this.x, this.y, this.config.blockRadius * 2, this.config.blockRadius * 2)
		}






	}

}
