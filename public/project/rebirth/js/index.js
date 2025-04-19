import { init as initHero, HeroController, ATTACHMENTS, DIRECTION } from '/js/controllers/HeroController.js'
import { init as initEntities, DeerController, FroggerController, RabbitController, SpeichermediumController } from '/js/controllers/EntityController.js'
import { drawMap } from '/js/controllers/MapController.js'
import { init as initTileLoader, isCollide } from '/js/controllers/TileLoader.js'
import { getAt } from '/assets/models/world.js'
import TextController from '/js/controllers/TextController.js'
import SoundController from '/js/controllers/SoundController.js'

// ------------------------------------------------------------
// global stuff
// ------------------------------------------------------------

let heroController
let entities
let textController
let soundController
let pixelFont


const KEYS = {}
var direction = null
const keyUpdate = e => {
	KEYS[e.code] = e.type === `keydown`
	actions(e)
}
addEventListener(`keydown`, keyUpdate)
addEventListener(`keyup`, keyUpdate)
setTimeout(updateControlls, 100)
function updateControlls(e) {
	setTimeout(updateControlls, heroController.speedboost ? 30 : 100)

	if (KEYS.KeyR && heroController.attachments.includes(ATTACHMENTS.JETPACK)) {
		heroController.speedboost = true
		heroController.level = 3

		if (heroController.direction == DIRECTION.UP) direction = 'KeyW'
		if (heroController.direction == DIRECTION.DOWN) direction = 'KeyS'
		if (heroController.direction == DIRECTION.RIGHT) direction = 'KeyD'
		if (heroController.direction == DIRECTION.LEFT) direction = 'KeyA'


	} else if (heroController) {
		heroController.speedboost = false
		heroController.level = 1
	}

	if (direction == "KeyD" || (!direction && KEYS.KeyD)) {
		var x = heroController.x + .5
		var y = heroController.y + 1
		heroController.direction = DIRECTION.RIGHT
		heroController.offsetX -= 1
		heroController.offsetY = 0
	} else if (direction == "KeyA" || (!direction && KEYS.KeyA)) {
		var x = heroController.x - .5
		var y = heroController.y - 1
		heroController.direction = DIRECTION.LEFT
		heroController.offsetX += 1
		heroController.offsetY = 0
	} else if (direction == "KeyW" || (!direction && KEYS.KeyW)) {
		var x = heroController.x + .5
		var y = heroController.y - 1
		heroController.direction = DIRECTION.UP
		heroController.offsetX -= 1
		heroController.offsetY = 1
	} else if (direction == "KeyS" || (!direction && KEYS.KeyS)) {
		var x = heroController.x - .5
		var y = heroController.y + 1
		heroController.direction = DIRECTION.DOWN
		heroController.offsetX += 1
		heroController.offsetY = 1
	}

	if (!x) return

	let collision = checkCollision(x, y, heroController.level)
	if (!collision) {
		heroController.x = x
		heroController.y = y
	}



	soundController.togglePlay(soundController.mainTheme)
}

function actions(e) {

	if (e.type === 'keydown' && !heroController.speedboost) {
		if (e.code == 'KeyW' || e.code == 'KeyA' || e.code == 'KeyS' || e.code == 'KeyD') {
			direction = e.code
		} else direction = null
	}

	if (e.type === 'keyup' && !heroController.speedboost) {
		if (e.code == 'KeyW' || e.code == 'KeyA' || e.code == 'KeyS' || e.code == 'KeyD') {
			direction = null
		}
	}

	if (e.code == 'Space' && heroController.vy > -20) {
		heroController.vy = -30
		soundController.playOnce(soundController.roboJump)
	}

	if (e.code == 'KeyQ') {
		soundController.playOnce(soundController.roboboSound)
		if (!heroController.hasWhistled) {

			for (let i = 7; i<entities.length;i++) {

				entities[i].whisleWithPlayer(heroController.x, heroController.y, soundController)
				//ele.dead = true;
			}
		}
		heroController.hasWhistled = true
		setTimeout(_ => heroController.hasWhistled = false, 500)
	}

	if (e.code == 'KeyE' && !heroController.touching) {
		heroController.touching = true
		setTimeout(() => heroController.touching = false, 500)

		let lookAt = { x: 0, y: 0 }
		if (heroController.direction == DIRECTION.UP) {
			lookAt.x = heroController.x + .5
			lookAt.y = heroController.y - 1
		} else if (heroController.direction == DIRECTION.RIGHT) {
			lookAt.x = heroController.x + .5
			lookAt.y = heroController.y + 1
		} else if (heroController.direction == DIRECTION.DOWN) {
			lookAt.x = heroController.x - .5
			lookAt.y = heroController.y + 1
		} else if (heroController.direction == DIRECTION.LEFT) {
			lookAt.x = heroController.x - .5
			lookAt.y = heroController.y - 1
		}

	//	console.log(lookAt)

		let target = entities.find(e => e.x == lookAt.x && e.y == lookAt.y)

		if (target && target.interact) target.interact(heroController)

	}

	if (e.code == 'KeyF' && heroController.attachments.includes(ATTACHMENTS.FLAMETHROWER)) {
		heroController.fire = true
		setTimeout(() => heroController.fire = false, 500)
	}


}

// ------------------------------------------------------------
// setup globals
// ------------------------------------------------------------

function reset() {

	//heroController = new HeroController(14, 88)
	heroController = new HeroController(14, 88)
	soundController = new SoundController()
	textController = new TextController()
	entities = [
		new SpeichermediumController(50, 86,2,0, "ARM"), //Greifer
		new SpeichermediumController(76,24,2,1, "JETPACK"), //Jetpack
		new SpeichermediumController(68,24,2,3, "FLAMETHROWER"), //Flamethrower
		new SpeichermediumController(25,66,2,2, "LASER"), //Laser
		new SpeichermediumController(12, 38,2,4, 0),
		new SpeichermediumController(85,80,2,5, 0),
		new SpeichermediumController(52,26,2,6, 0),
		new SpeichermediumController(58,74,2,7, 0),
		heroController,
		new DeerController(53, 40, 1, soundController.beerSound),
		new DeerController(62, 41, 1, soundController.beerSound),
		new DeerController(56, 48, 1, soundController.beerSound),
		new FroggerController(82, 38, 1, soundController.froggoSound),
		new FroggerController(74, 85, 1, soundController.froggoSound),
		new FroggerController(12, 32, 1, soundController.froggoSound),
		new RabbitController(22, 78, 1, soundController.rabbitSound),
		new RabbitController(20, 68, 1, soundController.rabbitSound),
		new RabbitController(46, 86, 1, soundController.rabbitSound),
		new RabbitController(50, 76, 1, soundController.rabbitSound),
		new RabbitController(54, 80, 1, soundController.rabbitSound),
	]

//	dev()

}

window.checkCollision = function(x, y, level = 1) {

	let newTile = getAt(x, y)
	let possibleEntity = entities.find(e => e.x == x && e.y == y)

	if (newTile && !isCollide(newTile, level) && !possibleEntity) {
		return false
	}

	return true
}

function dev() {
	window.dev.heroController = heroController
}

// ------------------------------------------------------------
// handlers
// ------------------------------------------------------------


window.preload = function () {

	reset()

	initTileLoader()
	initEntities(soundController, textController)
	initHero()

	pixelFont = loadFont('/assets/fonts/RetroGaming.ttf')

}

window.setup = function () {
	createCanvas(640, 480)
	textFont(pixelFont)

}

window.draw = function () {

	let delta = window.deltaTime / 1000

	const HUM_SPEED = .03
	const HUM_STRENGH = 3
	window.hum = -Math.sin(frameCount * HUM_SPEED) * HUM_STRENGH

	/* update game state */

	entities.forEach(e => e.update(delta))

	/* draw */

	clear()

	drawMap(heroController.x, heroController.y, entities)

    //textController.displayText(0)

}
