class Beam {

	constructor() {
		this.width = 44
		this.height = 48

		this.frame = 0
		this.fps = 0.12
		this.interrupted = false

		let _self = this
		this.activeImg = loadImage('assets/beam.png', function(done) {
			_self.onX = done.width / _self.width | 0
			_self.onY = done.height / _self.height

			_self.maxFrame = _self.onX * _self.onY - 2 // 2 missing pictures

		})
		this.baseImg = loadImage('assets/beam_off.png')


	}

	draw() {

		if (this.activeImg.width == 1) return

		this.frame = this.getFrame(this.fps)

		// for all segments

		this.interrupted = false
		for (let i = 0; i < chain.length - 1; i++) {

			// on intersect
			// ingnore first and last
			for (let j = 1; j < ambient.length - 1; j++) {
				if (ambient[j] === chain[i] || ambient[j] === chain[i + 1]) continue

				if (distToSegmentSquared(ambient[j], chain[i], chain[i + 1]) < ambient[j].config.blockRadius ** 2) {
					stroke(100)
					this.interrupted = true
				}
			}

			// draw the thing
			let totalLength = (chain[i].x - chain[i + 1].x) ** 2 + (chain[i].y - chain[i + 1].y) ** 2
			let targetLength = Math.sqrt(totalLength - (chain[i + 1].config.blockRadius * 2) ** 2)
			let pices = targetLength / (this.height / 2) - 1
			let angle = Math.atan2(chain[i + 1].y - chain[i].y, chain[i + 1].x - chain[i].x)

			push()

			translate(chain[i].x, chain[i].y)
			rotate(angle - HALF_PI)

			for (let h = 0; h < pices; h++) {

				if (this.interrupted) image(
					this.baseImg,
					this.width / -4,
					h * (this.height / 2) + chain[i].config.blockRadius,

					this.width / 2,
					this.height / 2,

					0,
					0,

					this.width,
					this.height
				)
				else image(
					this.activeImg,
					this.width / -4,
					h * (this.height / 2) + chain[i].config.blockRadius,

					this.width / 2,
					this.height / 2,

					(this.getFrame(pices - h) % this.onX | 0) * this.width,
					(this.getFrame(pices - h) / this.onX | 0) * this.height,

					this.width,
					this.height
				)

			}

			pop()

		}

	}

	getFrame(i = 0) {
		i += this.frame
		if (i >= this.maxFrame) i -= this.maxFrame | 0
		return i
	}

}
