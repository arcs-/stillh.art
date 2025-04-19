import { getAt } from '/assets/models/world.js'

import {
	drawTile,
	TILE_WIDTH,
	TILE_HEIGHT
} from '/js/controllers/TileLoader.js'

// ------------------------------------------------------------
// DEV
// ------------------------------------------------------------

const DEV = true
var pick = false
import { setAt, WORLD } from '/assets/models/world.js'
window.keyPressed = function () {
	if (keyCode === ALT) {
		pick = true
	} 
}
window.mouseReleased = function () {
	if (keyCode === ALT) {
		pick = false
	} 
}

// ------------------------------------------------------------
// MAP AND ENTITY DRAWING
// ------------------------------------------------------------


export function drawMap(x, y, entities) {

	let tilesX = width / TILE_WIDTH
	let tilesY = height / TILE_HEIGHT

	let startX = (x - (tilesX / 2) | 0) - 5
	let startY = (y - (tilesY) | 0) - 1

	for (var worldY = startY; worldY < y + tilesY + 10; worldY++) {

		if ((worldY & 1) == 1) var offset_x = TILE_WIDTH / 2
		else var offset_x = 0

		for (var worldX = startX; worldX < x + tilesX; worldX++) {

			var mapInfo = getAt(worldX, worldY)
			if (!mapInfo) continue

			var isoX = (worldX - x) * TILE_WIDTH + offset_x + width / 2
			var isoY = (worldY - y) * TILE_HEIGHT / 2 + height / 2


			if (false) {
				if (Math.abs(mouseX - isoX - TILE_WIDTH / 2) < 16
					&& Math.abs(mouseY - isoY - TILE_HEIGHT / 2) < 16) {
					if (mouseIsPressed) {
						setAt(worldX, worldY, document.getElementById('dev').value || '1')
						console.clear()
						console.log(WORLD.join(','))
					} else drawTile(document.getElementById('dev').value, isoX, isoY)
					if (pick) document.getElementById('dev').value = mapInfo
				} else drawTile(mapInfo, isoX, isoY)
			} else drawTile(mapInfo, isoX, isoY)

		}

		for (let entity of entities) {

			if (entity.x < startX || entity.x > tilesX + x) continue
			if (entity.y == worldY) continue
	
			var isoX = (entity.x - x) * TILE_WIDTH + width / 2
			var isoY = (entity.y - y) * TILE_HEIGHT / 2 + height / 2
	
			entity.draw(isoX, isoY)
	
		}

	}

}
