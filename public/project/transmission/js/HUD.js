class HUD {

	constructor() {
		this.score = 0
		this.factor = 0
		this.noise = false

		this.canvas = document.querySelector("#tv")
		this.context = this.canvas.getContext("gl") || this.canvas.getContext("2d")
		this.scaleFactor = 2.5 // Noise size
		this.samples = []
		this.sampleIndex = 0
		this.FPS = 50
		this.SAMPLE_COUNT = 10


		this.canvas.width = this.canvas.offsetWidth / this.scaleFactor
		this.canvas.height = this.canvas.width / (this.canvas.offsetWidth / this.canvas.offsetHeight)
		this.scanSize = (this.canvas.offsetHeight / this.scaleFactor) / 3

		this.samples = []
		for (var i = 0; i < this.SAMPLE_COUNT; i++)
			this.samples.push(generateRandomSample(this.context, this.canvas.width, this.canvas.height))


	}

	draw(hide) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.drawNoise()

		textFont(fontVisitor, 30)
		textAlign(CENTER)
		stroke(0)
		fill(255)
		if (!hide) {
			if (!this.score) text('awaiting transmission', 0, halfHeight - 70)
			else {
				text((this.score | 0), 0, halfHeight - 70)
				textAlign(RIGHT)
				text('x' + (chain.length - 2), halfWidth - 20, halfHeight - 70)
			}
		}

	}

	drawNoise() {

		this.context.putImageData(this.samples[Math.floor(this.sampleIndex)], 0, 0)
		this.factor = min(1, max(this.factor + ((this.noise) ? 0.03 : -0.03), 0))
		this.canvas.style.opacity = this.factor

		this.sampleIndex += 30 / this.FPS
		if (this.sampleIndex >= this.samples.length) this.sampleIndex = 0

	}

}




function interpolate(x, x0, y0, x1, y1) {
	return y0 + (y1 - y0) * ((x - x0) / (x1 - x0))
}


function generateRandomSample(context, w, h) {
	var intensity = []
	var random = 0
	var factor = h / 50

	var intensityCurve = []
	for (var i = 0; i < Math.floor(h / factor) + factor; i++)
		intensityCurve.push(Math.floor(Math.random() * 15))

	for (var i = 0; i < h; i++) {
		var value = interpolate((i / factor), Math.floor(i / factor), intensityCurve[Math.floor(i / factor)], Math.floor(i / factor) + 1, intensityCurve[Math.floor(i / factor) + 1])
		intensity.push(value)
	}

	var imageData = context.createImageData(w, h)
	for (var i = 0; i < (w * h); i++) {
		var k = i * 4
		var color = Math.floor(36 * Math.random())
		// Optional: add an intensity curve to try to simulate scan lines
		color += intensity[Math.floor(i / w)]
		imageData.data[k] = imageData.data[k + 1] = imageData.data[k + 2] = color
		imageData.data[k + 3] = 70
	}
	return imageData;
}