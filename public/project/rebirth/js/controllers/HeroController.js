
import { TILE_WIDTH, TILE_HEIGHT } from '/js/controllers/TileLoader.js'

const WALK_SPEED = 2
const JETPACK_SPEED = 5

const PATH = '/assets/images/hero.png'
var TEXTURE

export const ATTACHMENTS = {
	ARM: "ARM",
	LASER: "LASER",
	FLAMETHROWER: "FLAMETHROWER",
	JETPACK: "JETPACK",
}

export const DIRECTION = {
	UP: 1,
	DOWN: 3,
	RIGHT: 2,
	LEFT: 4
}

export function init() {
	TEXTURE = loadImage(PATH)
}

export class HeroController {

	constructor(x = 0, y = 0, direction = 1) {
		this.x = x
		this.y = y
		this.vy = 0
		this.direction = direction
		this.level = 1

		this.attachments = []
	//	this.attachments.push(ATTACHMENTS.ARM)
		//	this.attachments.push(ATTACHMENTS.JETPACK)
		//	this.attachments.push(ATTACHMENTS.LASER)
		//this.attachments.push(ATTACHMENTS.FLAMETHROWER)

		this.offsetX = 0
		this.offsetY = 0
        this.whistle = -20

        this.hasWhistled = false
        
		this.speedboost = false
		this.fire = false
		this.touching = false

	}

	update(delta) {

		// jumping
		this.vy = Math.min(0, this.vy - this.vy * 1.2 * delta)
        if (this.whistle > -20) this.whistle -= 6 * delta

	}

	draw(x, y) {

		y += window.hum
		y += this.vy

		// jetpack in front
		if (this.attachments.includes(ATTACHMENTS.JETPACK) && this.speedboost) {
			if (this.direction == DIRECTION.RIGHT) image(
				TEXTURE,
				x - TILE_WIDTH / 2,
				y - TILE_WIDTH / 1.4,
				TILE_WIDTH,
				TILE_WIDTH,
				5 * TILE_WIDTH,
				3 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == DIRECTION.DOWN) image(
				TEXTURE,
				x + TILE_WIDTH / 2,
				y - TILE_WIDTH / 1.4,
				TILE_WIDTH,
				TILE_WIDTH,
				4 * TILE_WIDTH,
				3 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
		}

		// arm behind
		if (this.attachments.includes(ATTACHMENTS.ARM)) {
			if (this.direction == DIRECTION.LEFT) image(
				TEXTURE,
				x + (!this.touching ? TILE_WIDTH / 2 : TILE_WIDTH * -0.001),
				y + (!this.touching ? TILE_WIDTH / -1.5 : -TILE_WIDTH / 1.1),
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH,
				(!this.touching ? 0 : 0) * TILE_WIDTH,
				(!this.touching ? 2 : 7) * TILE_WIDTH,
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == DIRECTION.DOWN) image(
				TEXTURE,
				x - TILE_WIDTH / 2,
				y - TILE_WIDTH / (!this.touching ? 1.5 : 5),
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH,
				(!this.touching ? 3 : 6) * TILE_WIDTH,
				(!this.touching ? 2 : 7) * TILE_WIDTH,
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH
			)
		}

		// flamer behind
		if (this.attachments.includes(ATTACHMENTS.FLAMETHROWER)) {
			if (this.direction == DIRECTION.UP) image(
				TEXTURE,
				x - TILE_WIDTH / 2,
				y - TILE_WIDTH / 1.3,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH,
				(this.fire ? 4 : 1) * TILE_WIDTH,
				(this.fire ? 6 : 5) * TILE_WIDTH,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == DIRECTION.RIGHT) image(
				TEXTURE,
				x + TILE_WIDTH / 2,
				y - TILE_WIDTH / 1.5,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH,
				(this.fire ? 2 : 2) * TILE_WIDTH,
				(this.fire ? 6 : 5) * TILE_WIDTH,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH
			)
		}

		// the core
		image(
			TEXTURE,
			x,
			y - TILE_WIDTH / 2,
			TILE_WIDTH,
			TILE_WIDTH,
			(Math.abs(this.offsetX) % 8) * TILE_WIDTH,
			this.offsetY * TILE_WIDTH,
			TILE_WIDTH,
			TILE_WIDTH
		)

		// laser
		if (this.attachments.includes(ATTACHMENTS.LASER)) {
			if (this.direction == 4) image(
				TEXTURE,
				x - TILE_WIDTH / 4 + 4,
				y - TILE_WIDTH + 3,
				TILE_WIDTH,
				TILE_WIDTH,
				0 * TILE_WIDTH,
				4 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == 1) image(
				TEXTURE,
				x - TILE_WIDTH / 4 + 12,
				y - TILE_WIDTH - 8,
				TILE_WIDTH,
				TILE_WIDTH,
				1 * TILE_WIDTH,
				4 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == 2) image(
				TEXTURE,
				x + TILE_WIDTH / 4,
				y - TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH,
				3 * TILE_WIDTH,
				4 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == 3) image(
				TEXTURE,
				x - TILE_WIDTH / 4 + 9,
				y - TILE_WIDTH + 13,
				TILE_WIDTH,
				TILE_WIDTH,
				2 * TILE_WIDTH,
				4 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
		}


		// arm in front
		if (this.attachments.includes(ATTACHMENTS.ARM)) {
			//this.touching = true
			if (this.direction == DIRECTION.RIGHT) image(
				TEXTURE,
				x + (!this.touching ? TILE_WIDTH / 9 : TILE_WIDTH * -0.004),
				y - (!this.touching ? TILE_WIDTH / 6 : TILE_WIDTH * 0.17),
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH,
				(!this.touching ? 1 : 4) * TILE_WIDTH,
				(!this.touching ? 2 : 7) * TILE_WIDTH,
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == DIRECTION.UP) image(
				TEXTURE,
				x + (!this.touching ? TILE_WIDTH / 2 : TILE_WIDTH * 0.51),
				y - (!this.touching ? TILE_WIDTH / 4 : TILE_WIDTH * 0.5),
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH,
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				(!this.touching ? 2 : 7) * TILE_WIDTH,
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH
			)
		}
		/*
		x + (!this.touching ? TILE_WIDTH / 2 : TILE_WIDTH * -0.001),
				y + (!this.touching ? TILE_WIDTH / -1.5 : -TILE_WIDTH / 1.1),
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				TILE_WIDTH,
				(!this.touching ? 0 : 0) * TILE_WIDTH,
				(!this.touching ? 2 : 7) * TILE_WIDTH,
				(!this.touching ? 1 : 2) * TILE_WIDTH,
				*/


		// flamer in front
		if (this.attachments.includes(ATTACHMENTS.FLAMETHROWER)) {
			//this.fire = false
			if (this.direction == DIRECTION.DOWN) image(
				TEXTURE,
				x -(this.fire ? TILE_WIDTH / 1 : TILE_WIDTH * -0.001),
				y - TILE_WIDTH / 2.2,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH,
				(this.fire ? 0 : 3) * TILE_WIDTH,
				(this.fire ? 6 : 5) * TILE_WIDTH,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == DIRECTION.LEFT) image(
				TEXTURE,
				x - TILE_WIDTH / 1.8,
				y - TILE_WIDTH / 3,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH,
				(this.fire ? 7 : 0) * TILE_WIDTH,
				(this.fire ? 6 : 5) * TILE_WIDTH,
				(this.fire ? 2 : 1) * TILE_WIDTH,
				TILE_WIDTH
			)
		}


		// jetpack in front
		if (this.attachments.includes(ATTACHMENTS.JETPACK)) {
			if (this.direction == 4) image(
				TEXTURE,
				x + TILE_WIDTH / 2,
				y - TILE_WIDTH / 4,
				TILE_WIDTH,
				TILE_WIDTH,
				!this.speedboost ? 0 * TILE_WIDTH : 2 * TILE_WIDTH,
				3 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
			else if (this.direction == 1) image(
				TEXTURE,
				x - TILE_WIDTH / 1.9,
				y - TILE_WIDTH / 3.5,
				TILE_WIDTH,
				TILE_WIDTH,
				!this.speedboost ? 1 * TILE_WIDTH : 3 * TILE_WIDTH,
				3 * TILE_WIDTH,
				TILE_WIDTH,
				TILE_WIDTH
			)
		}

        if (this.hasWhistled) {

			image(
				TEXTURE,
                x - TILE_WIDTH / 25,
                y - TILE_HEIGHT * 3 + this.whistle,
                TILE_WIDTH * 1.8,
                TILE_HEIGHT * 1.8,
                0 * TILE_WIDTH,
                7 * TILE_HEIGHT,
                TILE_WIDTH * 1.2,
                TILE_HEIGHT * 1.2
			)
		}

	}

}