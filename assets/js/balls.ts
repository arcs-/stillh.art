import Matter from 'matter-js'
import type { Body as BodyType, Constraint as ConstraintType } from 'matter-js'
import { gsap } from 'gsap'

const { Bodies, Engine, World, Constraint, Body, Composite, Query, Common } = Matter

// ------------------------------------------------------------
// globals
// ------------------------------------------------------------

let Colors: {
  primary: string
  hover: string
  text: string
  frame: string
}

const TAU = Math.PI * 2

const MAX_SCREEN_VELOCITY = 20

const CONFIG = {
  DESKTOP: {
    sections: 65,
    wheelRadius: 2000,
    wheelFactorX: 0.4,
    wheelFactorY: -0.11,
    bigBallRadius: 98,
    ballRadius: 33,
  },
  MOBILE: {
    sections: 65,
    wheelRadius: 950,
    wheelFactorX: 0.5,
    wheelFactorY: 0.25,
    bigBallRadius: 75,
    ballRadius: 30,
  },
}

// ------------------------------------------------------------
// utils
// ------------------------------------------------------------

const timestamp = () => new Date().getTime()
const pos = (e: any, what: string) => (e.touches ? e.changedTouches[0][what] : e[what])

// ------------------------------------------------------------
// working
// ------------------------------------------------------------

let init = false
let lastPages: BallEntry[] | null = null
let running = false
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
const mouse = {
  x: -50,
  y: -50,
  dx: 0,
  dy: 0,
  down: false,
}
const screen = {
  x: 0,
  y: 0,
}
let lastAccelerationY: number
let config = CONFIG.DESKTOP
let then = timestamp()

export type BallEntry = {
  label?: string
  icon?: string
  link?: string
  big?: boolean
  mini?: boolean
  color?: string
  pin?: {
    x: number
    y: number
  }
}

export type BallObject = BodyType & {
  userData: BallEntry
  color: string
  tween?: gsap.core.Tween
  pinned?: ConstraintType
}
type Obj = BallObject

export type BallSelectHandler = (event: MouseEvent | TouchEvent, object: BallObject) => void
let wheel: Obj | null = null
const balls: Obj[] = []

const MINI_RADIUS_FACTOR = 0.4
const MAX_MINIS = 60
const minis: Obj[] = []

const radiusFor = (entry: BallEntry) =>
  entry.big ? config.bigBallRadius : entry.mini ? config.ballRadius * MINI_RADIUS_FACTOR : config.ballRadius
const massFor = (entry: BallEntry) => (entry.big ? 150 : entry.mini ? 8 : 30)

let clickCallback: BallSelectHandler | null = null

// ------------------------------------------------------------
// engine
// ------------------------------------------------------------

const engine = Engine.create()
World.clear(engine.world, false)

const mouseConstraint = Constraint.create({
  label: 'Mouse Constraint',
  pointA: mouse,
  pointB: {
    x: 0,
    y: 0,
  },
  length: 0.01,
  stiffness: 0.9,
  render: {
    visible: false,
  },
})
World.add(engine.world, mouseConstraint)

// ------------------------------------------------------------
// handlers
// ------------------------------------------------------------

function onResize() {
  if (!canvas) return

  const scale = window.devicePixelRatio
  const { height, width } = canvas.getBoundingClientRect()

  canvas.width = (width * scale) | 0
  canvas.height = (height * scale) | 0

  ctx.scale(scale, scale)

  if (width < height) config = CONFIG.MOBILE
  else config = CONFIG.DESKTOP

  // balls
  for (const ball of balls) {
    const targetRadius = radiusFor(ball.userData)
    const factor = targetRadius / ball.circleRadius!

    Body.scale(ball, factor, factor)
    Body.setMass(ball, massFor(ball.userData))

    ball.circleRadius = targetRadius

    if (ball.userData.pin) {
      const pinAt = {
        x: window.innerWidth * ball.userData.pin.x,
        y: window.innerHeight * ball.userData.pin.y,
      }
      if (!ball.pinned) {
        Body.setPosition(ball, pinAt)
        ball.pinned = Constraint.create({
          label: 'Pinned Constraint',
          bodyA: ball,
          pointB: pinAt,
          length: 0.001,
          stiffness: 1,
        })
        World.add(engine.world, ball.pinned)
      } else {
        ball.pinned.pointB = pinAt
      }
    }
  }

  // wheel
  for (const body of Composite.allBodies(engine.world)) {
    if (body.label === 'WHEEL') World.remove(engine.world, body)
  }

  const parts = []
  const babies = config.sections
  const r = config.wheelRadius * ((1 / 5) * 2)
  for (let i = 0; i < babies; i++) {
    const segment = TAU / babies
    const angle = (i / babies) * TAU + segment / 2

    const x = Math.cos(angle)
    const y = Math.sin(angle)

    const cx = x * r + width * config.wheelFactorX
    const cy = y * r + height * config.wheelFactorY

    parts.push(
      Bodies.rectangle(cx, cy, 20, (150 / 933) * config.wheelRadius, {
        angle: angle,
        isStatic: true,
        label: 'WHEEL',
      }),
    )
  }

  World.add(engine.world, parts)
  wheel = Body.create({
    parts,
    isStatic: true,
  }) as Obj
}

function onMousedown(e: MouseEvent) {
  if (e.button === 1) {
    e.preventDefault()
  }

  mouse.down = true
  mouse.x = mouse.dx = pos(e, 'pageX')
  mouse.y = mouse.dy = pos(e, 'pageY')

  if (mouseConstraint.bodyB) return

  for (const body of Composite.allBodies(engine.world)) {
    const element = Query.point([body], mouse).find(el => el.label.includes('BALL'))
    if (element) {
      mouseConstraint.pointA = mouse
      mouseConstraint.bodyB = element
      mouseConstraint.pointB = {
        x: mouse.x - element.position.x,
        y: mouse.y - element.position.y,
      }
      // @ts-expect-error wrong interface for angle
      mouseConstraint.angleB = element.angle
      break
    }
  }
}

function onMouseMove(e: MouseEvent) {
  mouse.x = pos(e, 'pageX')
  mouse.y = pos(e, 'pageY')

  if (mouseConstraint.bodyB) {
    e.preventDefault()
  }
}

function onMouseup(e: MouseEvent) {
  if (mouse.down && Math.abs(mouse.dx - pos(e, 'pageX')) < 10 && Math.abs(mouse.dy - pos(e, 'pageY')) < 10) {
    const sight = Query.point(balls, mouse)
    if (sight.length > 0) {
      clickCallback?.(e, sight[0] as any)
    } else if (!('button' in e) || e.button === 0) {
      addMini(mouse.x, mouse.y)
    }
  }
  if (mouseConstraint.bodyB) {
    mouseConstraint.bodyB = null
  }
  mouse.down = false
  mouse.x = -50
  mouse.y = -50
}

function addMini(x: number, y: number) {
  const entry: BallEntry = { mini: true }
  const ball = Bodies.circle(x, y, radiusFor(entry), {
    label: 'BALL',
    mass: massFor(entry),
    frictionAir: 0.03,
    restitution: 0.4,
  }) as Obj
  ball.userData = entry
  ball.color = Colors.primary

  balls.push(ball)
  minis.push(ball)
  World.add(engine.world, ball)

  if (minis.length > MAX_MINIS) {
    const oldest = minis.shift()
    if (oldest) {
      World.remove(engine.world, oldest)
      balls.splice(balls.indexOf(oldest), 1)
    }
  }
}

function onMouseLeave() {
  mouse.down = false
  mouse.x = -50
  mouse.y = -50
}

function onGyro(event: DeviceOrientationEvent) {
  if (!event.alpha || !event.beta || !event.gamma) return

  const orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0
  const { gravity } = engine

  const MULTIPLAYER = 0.06

  if (orientation === 0) {
    gravity.x = Common.clamp(event.beta > 90 ? -event.gamma : event.gamma, -90, 90) * MULTIPLAYER
    gravity.y = Common.clamp(event.beta, -90, 90) * MULTIPLAYER
  } else if (orientation === 180) {
    gravity.x = Common.clamp(event.gamma, -90, 90) * MULTIPLAYER
    gravity.y = Common.clamp(-event.beta, -90, 90) * MULTIPLAYER
  } else if (orientation === 90) {
    gravity.x = Common.clamp(event.beta, -90, 90) * MULTIPLAYER
    gravity.y = Common.clamp(-event.gamma, -90, 90) * MULTIPLAYER
  } else if (orientation === -90) {
    gravity.x = Common.clamp(-event.beta, -90, 90) * MULTIPLAYER
    gravity.y = Common.clamp(event.gamma, -90, 90) * MULTIPLAYER
  }
}

function onMotion(event: DeviceMotionEvent) {
  if (!event.acceleration) return
  // will default to `accelerationIncludingGravity` but we cant use those values
  // will also reuse values
  if (
    event.acceleration.y === lastAccelerationY ||
    event.acceleration.y === event.accelerationIncludingGravity!.y ||
    event.acceleration.x === event.accelerationIncludingGravity!.x
  )
    return

  lastAccelerationY = event.acceleration.y!

  const velocityX = event.acceleration.x! * 0.3
  const velocityY = -(event.acceleration.y! * 0.3)

  for (const ball of balls) {
    const factor = Math.min(ball.circleRadius!, config.bigBallRadius) / config.bigBallRadius
    Body.applyForce(ball, ball.position, {
      x: velocityX * factor,
      y: velocityY * factor,
    })
  }
}

function setTheme(dark: boolean, immediate?: boolean) {
  const colors = {
    primary: dark ? '#FFD168' : '#FFD168',
    hover: dark ? '#FFE3A5' : '#B59346',
    text: dark ? '#0f0f13' : '#0f0f13',
    frame: dark ? '#ffffff' : '#0f0f13',
  }
  if (immediate) Colors = colors
  else
    gsap.to(Colors, {
      ...colors,
      duration: 0.7,
      ease: 'linear',
    })
}

// ------------------------------------------------------------
// functions
// ------------------------------------------------------------

function listeners(on: boolean) {
  const usage = on ? 'addEventListener' : 'removeEventListener'

  canvas[usage]('mousedown', onMousedown as (e: Event) => void)
  window[usage]('mousemove', onMouseMove as (e: Event) => void)
  window[usage]('mouseup', onMouseup as (e: Event) => void)
  canvas[usage]('touchstart', onMousedown as (e: Event) => void)
  window[usage]('touchmove', onMouseMove as (e: Event) => void, { passive: false })
  window[usage]('touchend', onMouseup as (e: Event) => void)

  window[usage]('mouseout', onMouseLeave)

  window[usage]('resize', onResize)
  window[usage]('deviceorientation', onGyro as (e: Event) => void)
  window[usage]('devicemotion', onMotion as (e: Event) => void)
}

function loop() {
  requestAnimationFrame(loop)

  const now = timestamp()
  const delta = now - then
  then = now

  if (!running) return

  update(delta / 1000)
}

function update(delta: number) {
  let engineDelta = delta * 1000
  // limit (e.g. open on closed screen)
  if (engineDelta > 33) engineDelta = 33
  Engine.update(engine, engineDelta)

  if (wheel) Body.rotate(wheel, 0.08 * delta)

  // data

  const bodies = Composite.allBodies(engine.world) as Obj[]
  let isHovering = false

  // velocity screen

  const screenVelocityX = Common.clamp(
    ((screen.x - window.screenX) * delta * 7) / window.devicePixelRatio,
    -MAX_SCREEN_VELOCITY,
    MAX_SCREEN_VELOCITY,
  )
  const screenVelocityY = Common.clamp(
    ((screen.y - window.screenY) * delta * 6) / window.devicePixelRatio,
    -MAX_SCREEN_VELOCITY,
    MAX_SCREEN_VELOCITY,
  )

  if (screenVelocityX !== 0 || screenVelocityY !== 0) {
    screen.x = window.screenX
    screen.y = window.screenY

    for (const ball of balls) {
      const factor = Math.min(ball.circleRadius!, config.bigBallRadius) / config.bigBallRadius
      Body.applyForce(ball, ball.position, {
        x: screenVelocityX * factor,
        y: screenVelocityY * factor,
      })
    }
  }

  // reset
  ctx.lineWidth = 1
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw
  bodies.forEach(body => {
    // frame
    if (body.label.includes('WHEEL')) {
      ctx.beginPath()
      ctx.lineWidth = 1.4

      const [first, ...rest] = body.vertices
      if (!first) return
      ctx.moveTo(first.x, first.y)
      for (const vertex of rest) ctx.lineTo(vertex.x, vertex.y)
      ctx.lineTo(first.x, first.y)

      ctx.strokeStyle = Colors.frame
      ctx.stroke()

      // balls
    } else if (body.label.includes('BALL')) {
      if (body.position.y > canvas.height + body.circleRadius!) {
        Body.setPosition(body, {
          x: window.innerWidth / 2,
          y: -body.circleRadius! - 10,
        })
        Body.setVelocity(body, {
          x: 0,
          y: 0,
        })
      }

      const hover = mouseConstraint.bodyB === body || Query.point([body], mouse).length > 0
      if (hover && body.userData.link) {
        isHovering = true

        if (!body.tween) {
          body.tween = gsap.to(body, {
            color: body.userData.color || Colors.hover,
            overwrite: true,
            duration: 0.3,
          })
        }
      } else {
        if (body.tween) {
          body.tween = undefined
          gsap.to(body, {
            color: body.userData.color || Colors.primary,
            overwrite: true,
            duration: 0.3,
          })
        }
      }

      // disc
      ctx.beginPath()
      ctx.arc(body.position.x, body.position.y, body.circleRadius!, 0, TAU)
      ctx.fillStyle = body.userData.color || body.color
      ctx.fill()

      // content
      ctx.save()
      ctx.translate(body.position.x, body.position.y)
      ctx.rotate(body.angle)
      ctx.fillStyle = Colors.text

      if (body.userData.icon) {
        ctx.fill(new Path2D(body.userData.icon))
      } else if (body.userData.label) {
        ctx.textAlign = 'center'
        ctx.font = '2rem "3270"'
        ctx.fillText(body.userData.label, 0, 11)
      }

      ctx.restore()
    }
  })

  const pointerClass = 'cursor-pointer'
  if (isHovering) {
    if (!document.body.classList.contains(pointerClass)) document.body.classList.add(pointerClass)
  } else {
    document.body.classList.remove(pointerClass)
  }
}

export default {
  init(root: HTMLElement, _cb: BallSelectHandler | null, pages: BallEntry[]) {
    clickCallback = _cb

    canvas = document.createElement('CANVAS') as HTMLCanvasElement
    root.appendChild(canvas)

    ctx = canvas.getContext('2d')!

    running = true
    listeners(true)

    // same entries as last time: keep the balls where they are
    if (init && pages === lastPages) {
      onResize()
      return
    }
    const firstRun = !init
    init = true
    lastPages = pages

    for (const ball of balls) World.remove(engine.world, ball)
    balls.length = 0
    minis.length = 0

    if (window.innerWidth < window.innerHeight) config = CONFIG.MOBILE
    else config = CONFIG.DESKTOP

    for (const page of pages.toReversed()) {
      const ball = Bodies.circle(
        page.big ? 450 : 600, // x
        280, // y
        page.big ? config.bigBallRadius : config.ballRadius,
        {
          label: 'BALL',
          mass: page.big ? 170 : 40,
          frictionAir: page.big ? 0.02 : 0.03,
        },
      ) as Obj

      ball.userData = page
      ball.color = Colors.primary

      balls.push(ball)
      World.add(engine.world, ball)
    }

    // start
    onResize()
    if (firstRun) loop()
  },

  setTheme,

  stop() {
    listeners(false)
    running = false
  },
}
