export function getTransitionSteps(colorFrom, colorTo, steps) {

    let stepList = []
    let from = parseColor(colorFrom)
    let to = parseColor(colorTo)

    let stepAmountR = Math.floor((to.R - from.R) / steps)
    let stepAmountG = Math.floor((to.G - from.G) / steps)
    let stepAmountB = Math.floor((to.B - from.B) / steps)

    stepList.push(colorFrom)
    for (let i = 0, minMax; i <= steps; i++) {

        // Red
        minMax = stepAmountR > 0 ? Math.min : Math.max
        from.R = minMax(from.R + stepAmountR, to.R)

        // Green
        minMax = stepAmountG > 0 ? Math.min : Math.max
        from.G = minMax(from.G + stepAmountG, to.G)

        // Blue
        minMax = stepAmountB > 0 ? Math.min : Math.max
        from.B = minMax(from.B + stepAmountB, to.B)
        
        stepList.push(from.isHex 
            ? rgbToHex(from.R, from.G, from.B)
            : rgbToString(from.R, from.G, from.B)
        )

    }
    stepList.push(colorTo)
    
    return stepList
}

const cutHex = h => (h.charAt(0) == "#") ? h.substring(1, 7) : h
const hexToR = h => parseInt(h.substring(0, 2), 16) 
const hexToG = h => parseInt(h.substring(2, 4), 16)
const hexToB = h => parseInt(h.substring(4, 6), 16)

export function parseColor(color) {
    if (color.indexOf("#") != -1) {
        color = cutHex(color)
        if(color.length == 3) color = color + color
        return { isHex: true, R: hexToR(color), G: hexToG(color), B: hexToB(color) }
    } else {
        let parsed = color
            .substring(4, color.length - 1)
            .replace(/ /g, '')
            .split(',')
        return {
            R: parseInt(parsed[0]),
            G: parseInt(parsed[1]),
            B: parseInt(parsed[2])
        }
    }
}

export function componentToHex(c) {
    let hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export function rgbToString(r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")"
}

export default {
    getTransitionSteps,
    componentToHex,
    rgbToHex,
    rgbToString
}
