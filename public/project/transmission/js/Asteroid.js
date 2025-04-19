class Asteroid {

	constructor(config) {
		this.config = Object.assign({
			x: 0,
			y: 0,
			xOff: 1,
			yOff: 1,
			movementX: 0,
			movementY: 0,
			blockRadius: 0,
			connectable: false,
			width: 0,
			height: 0,
			path: null,
			fps: 0,
			missing: 0,
			dWidth: 0,
			dHeight: 0,

		}, config)

		if (config.path) this.image = new Animation(config.width, config.height, config.path, this.config.missing, config.fps, config.dWidth, config.dHeight)

	}

	draw() {

		this.image.draw(this.x - this.image.width / this.config.xOff, this.y - this.image.height / this.config.yOff)
		this.x += this.config.movementX
		this.y += this.config.movementY

		if (DEBUG) {
			stroke(255, 0, 0)
			ellipse(this.x, this.y, this.config.blockRadius * 2, this.config.blockRadius * 2)
		}
	}
}