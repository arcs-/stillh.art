class Animation {

	constructor(width, height, path, missing, fps, dWidth, dHeight) {
		this.width = width
		this.height = height
		this.dWidth = dWidth || width
		this.dHeight = dHeight || height
		this.fps = fps || 1

		this.frame = 0

		let _self = this
		this.img = loadImage(path, function(done) {
			_self.onX = done.width / _self.width | 0
			_self.onY = done.height / _self.height

			_self.maxFrame = _self.onX * _self.onY - missing

		})

	}

	draw(x, y) {
		if (this.img.width == 1) return

		this.frame += this.fps
		if (this.frame >= this.maxFrame) this.frame = 0

		image(this.img,
			x,
			y,

			this.dWidth,
			this.dHeight,

			(this.frame % this.onX | 0) * this.width,
			(this.frame / this.onX | 0) * this.height,

			this.width,
			this.height

		)
	}

}
