export function twoDToIso(x, y) {
	return {
		x: x - y,
		y: (y + x) / 2
	}
}