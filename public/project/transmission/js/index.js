const DEBUG = false
const isMobile = typeof window.orientation !== 'undefined'

const ambient = []
const chain = []
const stars = []
const mouse = {
	x: 0,
	y: 0,
	active: false
}

var hud = new HUD
var firstConnect = false

var height, width, halfHeight, halfWidth
var beam, audio
var gameoverTimer, gameover

var fontVisitor, shadow

function preload() {
	fontVisitor = loadFont('font/visitor1.ttf')
	shadow = loadImage('assets/shadow.png')
}

function setup() {

	width = windowHeight / 16 * 9 | 0
	halfWidth = width / 2 | 0
	height = windowHeight
	halfHeight = height / 2 | 0

	audio = document.getElementById('ambient')
	audio.volume = 1
	//audio.play()

	createCanvas(width, height)

	beam = new Beam

	reset()

}

function reset() {

	ambient.length = 0
	chain.length = 0
	stars.length = 0
	mouse.active = false
	gameover = false

	hud.noise = false
	hud.score = 0
	firstConnect = false


	for (let i = 0; i < 35; i++) stars.push({ x: random(0, width), y: random(0, height), time: random(0, TAU) })

	ambient.push(

		new Planet({
			orbit: -350,
			yOff: 1.5,
			xOff: 2.5,
			connectable: true,
			path: 'assets/spaceship2.png',
			width: 68,
			height: 76,
			fps: .2,
			dWidth: 55,
			dHeight: 55,
			shadow: true
		}),

		new Planet({
			orbit: 0,
			speed: 0,
			path: 'assets/sun.png',
			width: 256,
			height: 256,
			fps: .05,
			missing: 2,
			blockRadius: 53
		}),

		new Planet({
			orbit: -100,
			verticalPush: 0.8,
			speed: 0.01,
			path: 'assets/planet1.png',
			progress: random(0, TAU),
			width: 256,
			height: 256,
			fps: .1,
			blockRadius: 20,
			connectable: true,
			shadow: true
		}),

		new Planet({
			orbit: -140,
			speed: -0.005,
			path: 'assets/planet2.png',
			progress: random(0, TAU),
			width: 256,
			height: 256,
			fps: .1,
			blockRadius: 20,
			connectable: true,
			shadow: true
		}),

		new Planet({
			orbit: -170,
			speed: -0.001,
			path: 'assets/planet3.png',
			progress: random(0, TAU),
			width: 256,
			height: 256,
			fps: .01,
			blockRadius: 20,
			connectable: true,
			shadow: true
		}),

		new Planet({
			orbit: -200,
			speed: 0.0015,
			path: 'assets/planet4.png',
			progress: random(0, TAU),
			width: 256,
			height: 256,
			fps: .01,
			blockRadius: 20,
			connectable: true,
			shadow: true
		}),

		new Planet({
			orbit: -290,
			yOff: 8,
			xOff: 2.5,
			connectable: true,
			path: 'assets/spaceship.png',
			progress: PI,
			width: 68,
			height: 76,
			fps: .2,
			dWidth: 55,
			dHeight: 55,
			shadow: true
		})

	)

	if (isMobile) ambient[0].config.orbit = -270

	chain.push(ambient[0])

	const rocket = new Asteroid({
		xOff: 4,
		yOff: 4,
		path: 'assets/rocket.png',
		width: 256,
		height: 256,
		fps: .01,
		movementX: .01,
		movementY: -0.1,
		dWidth: 128,
		dHeight: 128,
		blockRadius: 30
	})

	var resetRocket = function() {
		rocket.x = random(-halfWidth, halfWidth)
		rocket.y = halfHeight + 40
		setTimeout(resetRocket, random(90, 130) * 1000)
	}
	setTimeout(resetRocket, random(10, 20) * 1000)
	ambient.splice(ambient.length - 1, 0, rocket)

	const asteroid = new Asteroid({
		x: -halfWidth - 200,
		y: -300,
		xOff: 2.2,
		yOff: 2.9,
		path: 'assets/asteroid.png',
		width: 256,
		height: 256,
		fps: .03,
		movementX: .07,
		movementY: .07,
		blockRadius: 50
	})

	var resetAsteroid = function() {
		asteroid.x = -halfWidth - 200
		asteroid.y = random(0, -halfHeight)
		setTimeout(resetAsteroid, random(90, 130) * 1000)
	}
	setTimeout(resetAsteroid, 40 * 1000)
	ambient.splice(ambient.length - 1, 0, asteroid)

}

function windowResized() {

	width = windowHeight / 16 * 9 | 0
	halfWidth = width / 2 | 0
	height = windowHeight
	halfHeight = height / 2 | 0


	resizeCanvas(width, height)
}

function draw() {
	// base
	clear()
	noStroke()

	// stars
	fill(138, 139, 148)
	for (let i = 0, star; star = stars[i]; i++) {
		ellipse(star.x, star.y, 6 * sin(frameCount / 100 + star.time), 6 * sin(frameCount / 100 + star.time))
	}

	translate(halfWidth, halfHeight)

	hud.draw(gameover)

	if (gameover) {

		textFont(fontVisitor, 60)
		textAlign(CENTER)
		stroke(0)
		fill(255)
		text('Game Over', 0, -150)

		textFont(fontVisitor, 30)
		text((hud.score | 0) + ' points', 0, -100)

		return
	}

	// draw line
	beam.draw()

	// draw planets
	for (let planet of ambient) planet.draw(false)
	for (let planet of ambient) planet.draw(true)

	// mouse indicator
	stroke(200)
	if (mouse.active) line(chain[chain.length - 1].x, chain[chain.length - 1].y, mouse.x, mouse.y)

	// score
	if (!beam.interrupted && ambient[ambient.length - 1] === chain[chain.length - 1]) {
		hud.noise = false
		hud.score += 0.1 * max(0, chain.length - 2)
		firstConnect = true
		if (gameoverTimer) {
			clearTimeout(gameoverTimer)
			gameoverTimer = null
		}
	} else {
		if (firstConnect) {
			hud.noise = true
			if (!gameoverTimer) gameoverTimer = setTimeout(function() {
				gameover = true
				redOverlay.style.display = 'block'
				end.style.display = 'block'
			}, 4 * 1000)
		}
	}

}

function dist2(v, w) { return (v.x - w.x) ** 2 + (v.y - w.y) ** 2 }

function distToSegmentSquared(p, v, w) {
	var l2 = dist2(v, w)
	if (l2 == 0) return dist2(p, v)
	var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
	t = Math.max(0, Math.min(1, t))
	return dist2(p, {
		x: v.x + t * (w.x - v.x),
		y: v.y + t * (w.y - v.y)
	})
}

function startGame() {
	reset()
	home.style.display = 'none'
	redOverlay.style.display = 'none'
	end.style.display = 'none'
}

function goHome() {
	home.style.display = 'block'
	end.style.display = 'none'
	hud.noise = false
}

function upMouse() {
	mouse.x = mouseX - halfWidth
	mouse.y = mouseY - halfHeight
	mouse.active = true
}

function nearPlanet(obj) {
	return ((obj.x - mouse.x) ** 2 + (obj.y - mouse.y) ** 2) < 700
}

function touchStarted() {
	audio.play()
	if (isMobile) {
		if (!fullscreen()) fullscreen(true)
	}


	upMouse()

	for (let planet of ambient) {
		if (planet.config.connectable &&
			nearPlanet(planet) &&
			chain.includes(planet)) chain.length = Math.max(chain.indexOf(planet), 1)
	}

	return true
}


function touchMoved() {
	upMouse()

	for (let planet of ambient) {
		if (planet.config.connectable &&
			nearPlanet(planet) &&
			!chain.includes(planet) &&
			chain[chain.length - 1] != ambient[ambient.length - 1]) chain.push(planet)
	}

	return true
}

function touchEnded() {
	mouse.active = false

	return true
}