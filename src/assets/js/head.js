import Matter from 'matter-js'
import Color from './Color'

// ------------------------------------------------------------
// globals
// ------------------------------------------------------------

var PRIMARY, BLACK, HOVER, BG_HOVER, FG_HOVER, GRAY

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

var init = false, running = false, canvas, ctx, bridge, mouse = { x: -50, y: -50 }, screen = { x: window.screenX, y: window.screenY }, config = CONFIG.DESKTOP
var then = timestamp()
var wheel = null, balls = []

// ------------------------------------------------------------
// engine
// ------------------------------------------------------------

var engine = Matter.Engine.create()
Matter.World.clear(engine.world)

var mouseConstraint = Matter.Constraint.create({
	label: 'Mouse Constraint',
	pointA: mouse,
	pointB: { x: 0, y: 0 },
	length: 0.01,
	stiffness: 0.3,
	render: {
		visible: false
	}
})
Matter.World.add(engine.world, mouseConstraint)

// ------------------------------------------------------------
// handlers
// ------------------------------------------------------------

function onResize() {
	if (canvas) {

		canvas.width = document.body.offsetWidth
		canvas.height = document.body.offsetHeight

		if (canvas.width < canvas.height) config = CONFIG.MOBILE
		else config = CONFIG.DESKTOP

		canvas.height += 400

		// balls

		for(let ball of balls) {

			let targetRadius = ball.userData.big ? config.bigBallRadius : config.ballRadius
			let factor = targetRadius / ball.circleRadius

			Matter.Body.scale(ball, factor, factor)
			Matter.Body.setMass(ball, ball.userData.big ? 150 : 30)
		
			ball.circleRadius = targetRadius

		}
		
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
				// friction: 0,
				isStatic: true,
				label: 'WHEEL'
			}
			))

		}

		Matter.World.add(engine.world, parts)
		wheel = Matter.Body.create({ parts, isStatic: true })

	}
}

function onMousedown(e) {
	mouse.down = true
	mouse.x = mouse.dx = pos(e, 'pageX')
	mouse.y = mouse.dy = pos(e, 'pageY')

	if (mouseConstraint.bodyB) return

	var bodies = Matter.Composite.allBodies(engine.world)
	for (var i = 0; i < bodies.length; i++) {
		var element = Matter.Query.point([bodies[i]], mouse).find(el => el.label.includes('BALL'))
		if (element) {
			mouseConstraint.pointA = mouse
			mouseConstraint.bodyB = element
			mouseConstraint.pointB = { x: mouse.x - element.position.x, y: mouse.y - element.position.y }
			mouseConstraint.angleB = element.angle

			break
		}
	}

}

function onMouseMove(e) {
	mouse.x = pos(e, 'pageX')
	mouse.y = pos(e, 'pageY')

	if (mouseConstraint.bodyB) {
		e.preventDefault()
	}
}

function onMouseup(e) {
	if (mouse.down &&
		Math.abs(mouse.dx - pos(e, 'pageX')) < 10 &&
		Math.abs(mouse.dy - pos(e, 'pageY')) < 10) {
		let sight = Matter.Query.point(balls, mouse)
		if (sight.length > 0) {
			bridge.$emit('interact', sight[0])
		}
		e.preventDefault()
	}
	if (mouseConstraint.bodyB) {
		mouseConstraint.bodyB = null
		mouseConstraint.pointB = null
	}
	mouse.down = false
	mouse.x = -50
	mouse.y = -50
}

function onMouseLeave(e) {
	mouse.down = false
	mouse.x = -50
	mouse.y = -50
}

function onGyro(event) {

	if (event.alpha == undefined) return

	var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0
	var gravity = engine.world.gravity

	const MULTIPLAYER = 0.06

	if (orientation === 0) {
		gravity.x = Matter.Common.clamp(event.beta > 90 ? -event.gamma : event.gamma, -90, 90) * MULTIPLAYER
		gravity.y = Matter.Common.clamp(event.beta, -90, 90) * MULTIPLAYER
	} else if (orientation === 180) {
		gravity.x = Matter.Common.clamp(event.gamma, -90, 90) * MULTIPLAYER
		gravity.y = Matter.Common.clamp(-event.beta, -90, 90) * MULTIPLAYER
	} else if (orientation === 90) {
		gravity.x = Matter.Common.clamp(event.beta, -90, 90) * MULTIPLAYER
		gravity.y = Matter.Common.clamp(-event.gamma, -90, 90) * MULTIPLAYER
	} else if (orientation === -90) {
		gravity.x = Matter.Common.clamp(-event.beta, -90, 90) * MULTIPLAYER
		gravity.y = Matter.Common.clamp(event.gamma, -90, 90) * MULTIPLAYER
	}

}

function onMotion(event) {

	// will default to `accelerationIncludingGravity` but we cant use those values
	if(event.acceleration.y == event.accelerationIncludingGravity.y ||
	   event.acceleration.x == event.accelerationIncludingGravity.x) return

	var velocityX = event.acceleration.x * .3
  	var velocityY = -(event.acceleration.y * .3)

  	for(let ball of balls) {
		let factor = Math.min(ball.circleRadius, config.bigBallRadius) / config.bigBallRadius
		Matter.Body.applyForce(ball, ball.position, {
			x: velocityX * factor,
			y: velocityY * factor
		})
	}

}

function onDarkmode(val) {

	if (val) {
		PRIMARY = 'rgb(231, 201, 33)'
		BLACK = '#000000'
		GRAY = '#999999'
		HOVER = '#1e1e29'
	} else {
		PRIMARY = 'rgb(231, 201, 33)'
		BLACK = '#0f0f13'
		GRAY = '#999999'
		HOVER = '#0f0f13'
	}

	BG_HOVER = Color.getTransitionSteps(PRIMARY, HOVER, 20)
	FG_HOVER = Color.getTransitionSteps(PRIMARY, BLACK, 20)

}

// ------------------------------------------------------------
// functions
// ------------------------------------------------------------

function listeners(on) {

	var usage = on ? 'addEventListener' : 'removeEventListener'

	canvas[usage]("mousedown", onMousedown)
	window[usage]("mousemove", onMouseMove)
	window[usage]("mouseup", onMouseup)
	canvas[usage]("touchstart", onMousedown)
	window[usage]("touchmove", onMouseMove, { passive: false })
	window[usage]("touchend", onMouseup)

	window[usage]("mouseout", onMouseLeave)

	window[usage]("resize", onResize)
	window[usage]("deviceorientation", onGyro)
	window[usage]("devicemotion", onMotion)

	if(on) bridge.$on('darkmode', onDarkmode)
	else bridge.$off('darkmode', onDarkmode)

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

	let engineDelta = delta * 1000
	// limit (e.g. open on closed screen)
	if(engineDelta > 33) engineDelta = 33
	Matter.Engine.update(engine, engineDelta)

	if (wheel) Matter.Body.rotate(wheel, .08 * delta)

	// data

	var bodies = Matter.Composite.allBodies(engine.world)
	var addHover = false

	// velocity screen

	var screenVelocityX = Matter.Common.clamp((screen.x - window.screenX) * delta * 4 / window.devicePixelRatio, -10, 10)
	var screenVelocityY = Matter.Common.clamp((screen.y - window.screenY) * delta * 7 / window.devicePixelRatio, -10, 10)

	for(let ball of balls) {
		let factor = Math.min(ball.circleRadius, config.bigBallRadius) / config.bigBallRadius
		Matter.Body.applyForce(ball, ball.position, {
			x: screenVelocityX * factor, 
			y: screenVelocityY * factor
		})
	}

	screen.x = window.screenX
	screen.y = window.screenY

	// reset

	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// draw

	ctx.lineWidth = 1

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

			if (bodies[i].position.y > canvas.height + 50) {
				Matter.Body.setPosition(bodies[i], { x: window.innerWidth / 2, y: -100 })
				Matter.Body.setVelocity(bodies[i], { x: 0, y: 0 })
			}

			let hover = mouseConstraint.bodyB == bodies[i] || Matter.Query.point([bodies[i]], mouse).length > 0
			if (hover) {
				bodies[i].fade = Math.min(bodies[i].fade + 180 * delta, BG_HOVER.length - 1)
				addHover = true
			} else {
				bodies[i].fade = Math.max(bodies[i].fade - 180 * delta, 0)
			}

			// circle
			ctx.beginPath()
			ctx.arc(bodies[i].position.x, bodies[i].position.y, bodies[i].circleRadius, 0, TAU)
			ctx.fillStyle = BG_HOVER[bodies[i].fade | 0]
			ctx.fill()

			// content
			ctx.save()
			ctx.translate(bodies[i].position.x, bodies[i].position.y)
			ctx.rotate(bodies[i].angle)
			ctx.fillStyle = FG_HOVER[FG_HOVER.length - (bodies[i].fade | 0) - 1]
			ctx.strokeStyle = FG_HOVER[FG_HOVER.length - (bodies[i].fade | 0) - 1]

			if (bodies[i].userData.icon) {

				var path = new Path2D(bodies[i].userData.icon)
				//ctx.translate(-bodies[i].circleRadius/2 + 1, -bodies[i].circleRadius/2 + 1)
				ctx.fill(path)

			} else {

				ctx.textAlign = "center"
				ctx.font = '22px "3270"'
				ctx.fillText(bodies[i].userData.label, 0, lineHeight / 2)

			}
			
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

		onDarkmode(bridge.darkmode)

		if (init) {
			onResize()
			loop()
			return
		}
		init = true

		// pages

		if (document.body.clientWidth < document.body.clientHeight) config = CONFIG.MOBILE
		else config = CONFIG.DESKTOP

		for (let page of pages.reverse()) {

			var ball = Bodies.circle(
				page.big ? 460 : 1200, // x
				380, 				   // y
				page.big ? config.bigBallRadius : config.ballRadius,
				{
					label: 'BALL',
					mass: page.big ? 150 : 30,
					frictionAir: page.big ? .02 : .03
				}
			)

			ball.userData = page
			ball.fade = 0

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