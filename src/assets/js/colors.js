export function getTransitionSteps(colorFrom, colorTo, steps) {
    var stepList = [],
        from = parseColor(colorFrom),
        to = parseColor(colorTo);

    var stepAmountR = Math.floor((to.R - from.R) / steps);
    var stepAmountG = Math.floor((to.G - from.G) / steps);
    var stepAmountB = Math.floor((to.B - from.B) / steps);

    stepList.push(colorFrom);
    for (var i = 0; i <= steps; i++) {
        var minMax;
        // Red
        minMax = stepAmountR > 0 ? Math.min : Math.max;
        from.R = minMax(from.R + stepAmountR, to.R);

        // Green
        minMax = stepAmountG > 0 ? Math.min : Math.max;
        from.G = minMax(from.G + stepAmountG, to.G);

        // Blue
        minMax = stepAmountB > 0 ? Math.min : Math.max;
        from.B = minMax(from.B + stepAmountB, to.B);
        stepList.push(from.isHex ? rgbToHex(from.R, from.G, from.B) : "rgb(" + from.R + ", " + from.G + ", " + from.B + ")");
    }
    stepList.push(colorTo);
    return stepList;
};

const cutHex = function(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h; };
const hexToR = function(h) { return parseInt((cutHex(h)).substring(0, 2), 16); };
const hexToG = function(h) { return parseInt((cutHex(h)).substring(2, 4), 16); };
const hexToB = function(h) { return parseInt((cutHex(h)).substring(4, 6), 16); };

export function parseColor(color) {
    var isHex = color.indexOf("#") != -1;
    if (isHex) {
        return { isHex: true, R: hexToR(color), G: hexToG(color), B: hexToB(color) };
    } else {
        var parsed = color
            .substring(4, color.length - 1)
            .replace(/ /g, '')
            .split(',');
        return {
            R: parseInt(parsed[0]),
            G: parseInt(parsed[1]),
            B: parseInt(parsed[2])
        };
    }
};


export function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}