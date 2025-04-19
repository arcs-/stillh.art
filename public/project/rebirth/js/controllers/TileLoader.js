const PATH = '/assets/images/texture.png'

export const TILE_WIDTH = 64
export const TILE_HEIGHT = 32

const MAPPING = {

	// pseudo blocks

	0: { level: 1 },
	1: { level: 2 },
	2: { level: 3 },
	3: { level: 4 },
	4: { level: 5 },

	250:{
		name: "ship1",
		x: 21,
		y: 15,
		w: 11,
		h: 16,
		level: 5
	},
	251:{
		name: "ship2",
		x: 21,
		y: 31,
		w: 11,
		h: 16,
		level: 5
	}

}

// ------------------------------------------------------------
// utils
// ------------------------------------------------------------

function generateBiom(id, name, offsetX, offsetY, level = 0) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {

			MAPPING[id++] = {
				name: "generated_" + name,
				x: offsetX + x,
				y: offsetY + y,
				w: 1,
				h: 1,
				level
			}

		}
	}
}

function generateSeries(id, name, amount, offsetX, offsetY, height, width, level = 0) {
	for (let x = 0; x < amount; x++) {

		MAPPING[id++] = {
			name: "generated_" + name,
			x: offsetX + x * width,
			y: offsetY,
			w: width,
			h: height,
			level
		}
	}
}

generateSeries(200, 'ruin', 10, 7, 18, 3, 1, 4)
generateSeries(220, 'plants', 3, 7, 20, 2, 1, 0)

generateSeries(230, 'earth_trees', 3, 0, 21, 6, 2, 4)

generateSeries(240, 'complete_ruins', 3, 0, 15, 9, 5, 4)

// ------------------------------------------------------------
// mapping info
// ------------------------------------------------------------

generateBiom(10, 'stone->grass', 0, 0)
generateBiom(20, 'grass->stone', 0, 3)

generateBiom(30, 'dirt->grass', 3, 0)
generateBiom(40, 'grass->dirt', 3, 3)

generateBiom(50, 'stone->dirt', 6, 0)
generateBiom(60, 'dirt->stone', 6, 3)

generateBiom(70, 'water->stone', 9, 0, 2)
generateBiom(80, 'stone->water', 9, 3, 2)

generateBiom(90, 'water->dirt', 12, 0, 2)
generateBiom(100, 'dirt->water', 12, 3, 2)

generateBiom(110, 'water->grass', 15, 0, 2)
generateBiom(120, 'grass->water', 15, 3, 2)

generateBiom(130, 'water->grass', 18, 0)
generateBiom(140, 'grass->water', 18, 3)


// ------------------------------------------------------------
// load texture pack
// ------------------------------------------------------------

let texture
export function init() {
	texture = loadImage(PATH)
}

// ------------------------------------------------------------
// export
// ------------------------------------------------------------

export function drawTile(code, x, y) {

	if (code < 10) return

	let tile = MAPPING[code]

	if (!tile || !tile.x === undefined) return

	image(
		texture,
		x - (tile.w * TILE_WIDTH / 2),
		y - ((tile.h - 1) * TILE_HEIGHT) + (tile.w&1==1 ? 0 : TILE_HEIGHT/2),
		tile.w * TILE_WIDTH + 1,
		tile.h * TILE_HEIGHT + 1,
		tile.x * TILE_WIDTH,
		(tile.y - tile.h + 1) * TILE_HEIGHT,
		tile.w * TILE_WIDTH,
		tile.h * TILE_HEIGHT
	)

}

export function isCollide(code, level) {
	return MAPPING[code] ? MAPPING[code].level > level : true
}