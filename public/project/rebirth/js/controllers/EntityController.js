import { TILE_WIDTH, TILE_HEIGHT } from '/js/controllers/TileLoader.js'
import SoundController from '/js/controllers/SoundController.js'
import TextController from '/js/controllers/TextController.js'

const WALK_SPEED = 2.5
const WHISLE_DIST = 10

export const DIRECTION = {
	UP: 1,
	DOWN: 3,
	RIGHT: 2,
	LEFT: 4
}

const PATH = '/assets/images/animuls.png'
let TEXTURE = null, SOUNDER, TEXTER
export function init(sound,text) {
	TEXTURE = loadImage(PATH)
	SOUNDER = sound
    TEXTER = text
}


// ------------------------------------------------------------
// class functions
// ------------------------------------------------------------

function moveRandom(obj) {

	if (frameCount % 30 == 0) obj.flip = ((obj.flip + 1) % obj.spriteAnim)

	if (!obj.dead) {
		if (Math.random() < .01) {
			obj.walking = true
			setTimeout(_ => obj.walking = false, 1000)
			if (Math.random() > .5) {
				if(checkCollision(obj.x + 1, obj.y)) return
				obj.x += 1
				obj.spriteColon = obj.spriteFront
			}
			else {
				if(checkCollision(obj.x - 1, obj.y)) return
				obj.x -= 1
				obj.spriteColon = obj.spriteBack
			}

		} else if (Math.random() < .001) {
			obj.walking = true
			setTimeout(_ => obj.walking = false, 1000)
			if (Math.random() > .5) {
				if(checkCollision(obj.x, obj.y + 1)) return
				obj.y += 1
				obj.spriteColon = obj.spriteFront
			}
			else {
				if(checkCollision(obj.x, obj.y - 1)) return
				obj.y -= 1
				obj.spriteColon = obj.spriteBack
			}
		}
	}

}


function walking(obj, delta) {

	if (obj.walking) {
		obj.speed += WALK_SPEED * delta
		if (obj.speed > 2) {
			obj.speed = 0
		}
	}
}


function calcDistancePtoE(a, b) {

	let dist = 0
	if (a <= 2 || b <= 2) {
		dist = Math.max(a, b) * 2
	}
	else {
		dist = (Math.floor(Math.sqrt((a * a) + (b * b))))
	}
	return dist
}

// ------------------------------------------------------------
// DEER
// ------------------------------------------------------------


export class DeerController {

	constructor(x = 0, y = 0, d = DIRECTION.RIGHT, sound) {
		this.x = x
		this.y = y
		this.d = d
		this.sound = sound

		this.walking = false
		this.speed = 0
		this.flip = 0
		this.spriteFront = 0
		this.spriteBack = 3
		this.spriteColon = this.spriteFront
		this.spriteAnim = 4
		this.heart = -20
		this.dead = false
	}

	update(delta) {

		if (this.heart > -20) this.heart -= 6 * delta

		walking(this, delta)

        moveRandom(this)
        
	}

	draw(x, y) {

		let spriteNr = ((this.flip + 1) & 1 == 1) ? 0 : Math.ceil(this.flip / 2)
		if (this.dead) { spriteNr = 3; this.spriteColon = this.spriteFront }
		//console.log("Deer")
		image(
			TEXTURE,
			x - TILE_WIDTH,
			y - TILE_HEIGHT * 4,
			TILE_WIDTH * 2.5,
			TILE_HEIGHT * 5,
			this.spriteColon * TILE_WIDTH,
			spriteNr * 6 * TILE_HEIGHT,
			TILE_WIDTH * 2.5,
			TILE_HEIGHT * 5
		)

	}


	whisleWithPlayer(x, y, soundController) {
		// if player is nearby and is whisling then whistle back

		if (calcDistancePtoE(Math.abs(this.x - x), Math.abs(this.y - y)) <= WHISLE_DIST && !this.dead) {
			setTimeout(_ => soundController.playOnce(this.sound), Math.floor(Math.random()*100))
		}
	}

	interact(other) {

		SOUNDER.playForce(this.sound)
		this.heart = -6

	}

}

// ------------------------------------------------------------
// FROGGER
// ------------------------------------------------------------

export class FroggerController {

	constructor(x = 0, y = 0, d = DIRECTION.RIGHT, sound) {
		this.x = x
		this.y = y
		this.d = d
		this.sound = sound

		this.walking = false
		this.speed = 0
		this.flip = 0
		this.spriteFront = 6
		this.spriteBack = 9
		this.spriteColon = this.spriteFront
		this.spriteAnim = 3
		this.heart = -20
		this.dead = false
	}

	update(delta) {

		if (this.heart > -20) this.heart -= 6 * delta

		walking(this, delta)

		moveRandom(this)

	}

	draw(x, y) {

		//console.log("Froggo",x,"/",y)
		let spriteNr = ((this.flip + 1) & 1 == 1) ? 0 : Math.ceil(this.flip / 2)
		if (this.dead) { spriteNr = 3; this.spriteColon = this.spriteFront }
		image(
			TEXTURE,
			x - TILE_WIDTH,
			y - TILE_HEIGHT * 3,
			TILE_WIDTH * 2.5,
			TILE_HEIGHT * 5,
			this.spriteColon * TILE_WIDTH, // y auf image
			spriteNr * 6 * TILE_HEIGHT,
			TILE_WIDTH * 2.5,
			TILE_HEIGHT * 5
		)

	}

	whisleWithPlayer(x, y, soundController) {
		// if player is nearby and is whisling then whistle back
		console.log("Froggo",this.x,"/",this.y, "Player",x,"/",y)
		if (calcDistancePtoE(Math.abs(this.x - x), Math.abs(this.y - y)) <= WHISLE_DIST && !this.dead) {
			setTimeout(_ => soundController.playOnce(this.sound), Math.floor(Math.random()*200) / 2)
		}
	}

	interact(other) {

		SOUNDER.playForce(this.sound)
		this.heart = -8

	}

}

// ------------------------------------------------------------
// RABBIT
// ------------------------------------------------------------

export class RabbitController {

	constructor(x = 0, y = 0, d = DIRECTION.RIGHT, sound) {
		this.x = x
		this.y = y
		this.d = d
		this.sound = sound

		this.walking = false
		this.speed = 0
		this.flip = 0
		this.spriteFront = 12
		this.spriteBack = 15
		this.spriteColon = this.spriteFront
		this.spriteAnim = 3
		this.heart = -20
		this.dead = false
	}

	update(delta) {

		if (this.heart > -20) this.heart -= 6 * delta

		walking(this)

		moveRandom(this)

	}

	draw(x, y) {

		let spriteNr = ((this.flip + 1) & 1 == 1) ? 0 : Math.ceil(this.flip / 2)
		if (this.dead) { spriteNr = 3; this.spriteColon = this.spriteFront }
		//console.log("Rabbit",)
		image(
			TEXTURE,
			x - TILE_WIDTH,
			y - TILE_HEIGHT * 3,
			TILE_WIDTH * 2.5,
			TILE_HEIGHT * 5,
			this.spriteColon * TILE_WIDTH, // y auf image 
			spriteNr * 6 * TILE_HEIGHT,
			TILE_WIDTH * 2.5,
			TILE_HEIGHT * 5
		)

		if (this.heart > -20) {
			image(
				TEXTURE,
				x,
				y - TILE_HEIGHT * 1.6 + this.heart,
				TILE_WIDTH,
				TILE_HEIGHT,
				19 * TILE_WIDTH,
				5.5 * TILE_HEIGHT,
				TILE_WIDTH,
				TILE_HEIGHT
			)
		}

	}

	interact(other) {

		SOUNDER.playForce(this.sound)
		this.heart = -8

	}

	whisleWithPlayer(x, y, soundController) {
		// if player is nearby and is whisling then whistle back
		if (calcDistancePtoE(Math.abs(this.x - x), Math.abs(this.y - y)) <= WHISLE_DIST && !this.dead) {
			setTimeout(_ => soundController.playOnce(this.sound), Math.floor(Math.random()*100) / 2)
		}
	}
    
    interact(other) {

		SOUNDER.playForce(this.sound)
		this.heart = -8

	}

}

// ------------------------------------------------------------
// Speichermedium
// ------------------------------------------------------------

export class SpeichermediumController {

	constructor(x = 0, y = 0, d = DIRECTION.RIGHT, textId, ability) {
		this.x = x
		this.y = y
		this.d = d
        this.textId = textId
        this.ability = ability

        this.hasInteracted = false;
        
		console.log

	}

	update(delta) {

        

	}

	draw(x, y) {

		y += window.hum

		image(
			TEXTURE,
			x,
			y,
			TILE_WIDTH,
			TILE_HEIGHT,
			19 * TILE_WIDTH,
			2.5 * TILE_HEIGHT,
			TILE_WIDTH,
			TILE_HEIGHT
		)
        
        if (this.hasInteracted)
            TEXTER.displayText(this.textId)

	}

	interact(heroController) {
        
		SOUNDER.playForce(SOUNDER.ding)
        this.hasInteracted = true;
        setTimeout(_ => this.hasInteracted = false, 4000)
        if (this.ability != 0) {
            heroController.attachments.push(this.ability)
        }
        
	}

}