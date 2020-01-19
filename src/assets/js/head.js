import Matter from 'matter-js'

// ------------------------------------------------------------
// constants
// ------------------------------------------------------------

const PRIMARY = 'rgb(231, 201, 33)'
const BLACK = '#0f0f13'
const GRAY = '#999'

const TAU = Math.PI * 2
const Bodies = Matter.Bodies

const CONFIG = {
	DESKTOP: {
		sections: 65,
		wheelRadius: 3000,
		wheelOffset: 3,
		bigBallRadius: 90,
		ballRadius: 20
	},
	MOBILE: {
		sections: 65,
		wheelRadius: 2500,
		wheelOffset: 2,
		bigBallRadius: 50,
		ballRadius: 20
	}
}

// ------------------------------------------------------------
// utils
// ------------------------------------------------------------

const timestamp = () => new Date().getTime()
const pos = (e, what) => e.touches ? e.changedTouches[0][what] : e[what]

// ------------------------------------------------------------
// working
// ------------------------------------------------------------

var init = false, running = false, canvas, ctx, bridge, mouse = null, config = CONFIG.DESKTOP
var then = timestamp()

var wheel = null, balls = []

// ------------------------------------------------------------
// engine
// ------------------------------------------------------------

// create an engine
var engine = Matter.Engine.create()
Matter.World.clear(engine.world)

// ------------------------------------------------------------
// handlers
// ------------------------------------------------------------

function onResize() {
	if (canvas) {

		canvas.width = document.body.offsetWidth
		canvas.height = document.body.offsetHeight

		if (canvas.width < canvas.height) config = CONFIG.MOBILE
		else config = CONFIG.DESKTOP

		// wheel

		var bodies = Matter.Composite.allBodies(engine.world)
		for (var i = bodies.length - 1; i >= 0; i -= 1) {
			if (bodies[i].label == "WHEEL") Matter.World.remove(engine.world, bodies[i])
		}

		var parts = []
		var babies = config.sections
		var m = config.wheelRadius
		var r = m * (1 / 5 * 2)
		for (let i = 0; i < babies; i++) {

			let segment = TAU / babies
			let angle = i / babies * TAU + segment / 2

			let x = Math.cos(angle)
			let y = Math.sin(angle)

			let cx = x * r + (window.innerWidth / config.wheelOffset)
			let cy = y * r - 500

			parts.push(Bodies.rectangle(
				cx,
				cy,
				20,
				150 / 933 * m, {
				angle: angle,
				isStatic: true,
				label: 'WHEEL'
			}
			))

		}

		Matter.World.add(engine.world, parts)
		wheel = Matter.Body.create({ parts, isStatic: true })

	}
}

// mouse
{
	var mouseHandler = Matter.Mouse.create(document.body)
	var mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse: mouseHandler,
		constraint: {
			stiffness: 0.3,
			render: {
				visible: false
			}
		}
	})

	Matter.World.add(engine.world, mouseConstraint)
}


function onMousedown(e) {
	mouse = e
}

function onMouseup(e) {
	if (Math.abs(pos(mouse, 'screenX') - pos(e, 'screenX')) < 10 &&
		Math.abs(pos(mouse, 'screenY') - pos(e, 'screenY')) < 10) {
		let sight = Matter.Query.point(balls, mouseHandler.position)
		if (sight.length > 0) {
			bridge.$emit('interact', sight[0])
		}
	}
}

// ------------------------------------------------------------
// functions
// ------------------------------------------------------------


function listeners(on) {

	var usage = on ? 'addEventListener' : 'removeEventListener'

	canvas[usage]("mousedown", onMousedown)
	window[usage]("mouseup", onMouseup)
	canvas[usage]("touchstart", onMousedown)
	window[usage]("touchend", onMouseup)

	window[usage]("resize", onResize)

}

function loop() {

	requestAnimationFrame(loop)


	let now = timestamp()
	let delta = now - then
	then = now

	if (!running) return

	update(delta / 1000)

}

function update(delta) {

	if (wheel) Matter.Body.rotate(wheel, .08 * delta)


	var bodies = Matter.Composite.allBodies(engine.world)
	var addHover = false

	// reset

	ctx.fillStyle = '#fff'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// draw

	ctx.lineWidth = 1

	var font = 20
	var lineHeight = 15

	for (var i = 0; i < bodies.length; i += 1) {

		// lines

		if (bodies[i].label.includes('WHEEL')) {

			ctx.beginPath()

			var vertices = bodies[i].vertices
			ctx.moveTo(vertices[0].x, vertices[0].y)
			for (var j = 1; j < vertices.length; j += 1) {
				ctx.lineTo(vertices[j].x, vertices[j].y)
			}
			ctx.lineTo(vertices[0].x, vertices[0].y)

			ctx.strokeStyle = GRAY
			ctx.stroke()

		}

		// text

		else if (bodies[i].label.includes('BALL')) {

			if (bodies[i].position.y > canvas.height * 2) {
				Matter.Body.setPosition(bodies[i], { x: window.innerWidth / 2, y: -100 })
				Matter.Body.setVelocity(bodies[i], { x: 0, y: 0 })
			}

			var hover = Matter.Query.point([bodies[i]], mouseHandler.position).length > 0

			ctx.beginPath()
			ctx.arc(bodies[i].position.x, bodies[i].position.y, bodies[i].circleRadius, 0, TAU)
			ctx.fillStyle = PRIMARY
			if (hover) {
				ctx.fillStyle = BLACK
				addHover = true
			}
			ctx.fill()

			ctx.save()
			ctx.translate(bodies[i].position.x, bodies[i].position.y)
			ctx.rotate(bodies[i].angle)
			ctx.textAlign = "center"
			ctx.fillStyle = BLACK

			if (bodies[i].userData.icon) ctx.font = font + 'px Ionicons'
			else ctx.font = font + 'px Inter'

			if (hover) ctx.fillStyle = 'rgb(231, 201, 33)'
			ctx.fillText(bodies[i].userData.icon ? bodies[i].userData.icon : bodies[i].userData.label, 0, lineHeight / 2)
			ctx.restore()

		}

		// change cursor 

		if (addHover) {
			if (!document.body.classList.contains('hover')) {
				document.body.classList.add('hover')
			}
		} else document.body.classList.remove('hover')

	}



}

export default {

	init(_bridge, pages) {

		bridge = _bridge

		var wrapper = document.getElementById('cog')
		canvas = document.createElement('CANVAS')
		wrapper.appendChild(canvas)

		ctx = canvas.getContext('2d')

		running = true
		listeners(true)

		if (init) {
			onResize()
			loop()
			return
		}
		init = true

		// engine 

		Matter.Engine.run(engine)

		// pages

		if (document.body.clientWidth < document.body.clientHeight) config = CONFIG.MOBILE
		else config = CONFIG.DESKTOP


		for (let page of pages.reverse()) {

			var ball = Bodies.circle(
				page.big ? 400 : 1300,
				200,
				page.big ? config.bigBallRadius : config.ballRadius, {
				label: 'BALL',
				density: .5
			}
			)
			ball.userData = page

			balls.push(ball)
			Matter.World.add(engine.world, ball)

		}

		// start
		onResize()
		loop()

	},

	stop() {

		listeners(false)
		running = false

	}

}