/**************************
 * UTILS
 */

const DEGREES_PER_HOUR = 360 / 24;

const sinDeg = deg => Math.sin(deg * 2.0 * Math.PI / 360.0);
const acosDeg = x => Math.acos(x) * 360.0 / (2 * Math.PI);
const asinDeg = x => Math.asin(x) * 360.0 / (2 * Math.PI);
const tanDeg = deg => Math.tan(deg * 2.0 * Math.PI / 360.0);
const cosDeg = deg => Math.cos(deg * 2.0 * Math.PI / 360.0);

const getDayOfYear = function (date) {
    var onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((date - onejan) / 86400000);
}

const mod = function (a, b) {
    var result = a % b;
    if (result < 0) {
        result += b;
    }
    return result;
}

/**************************
 * CORE
 */

function sunLevel(latitude, longitude, date, sunrise, zenith = 90.8333) {

    if (!date) date = new Date();

    let hoursFromMeridian = longitude / DEGREES_PER_HOUR;
    let dayOfYear = getDayOfYear(date);

    if (sunrise) {
        var approxTimeOfEventInDays = dayOfYear + ((6 - hoursFromMeridian) / 24);
    } else {
        var approxTimeOfEventInDays = dayOfYear + ((18.0 - hoursFromMeridian) / 24);
    }

    let sunMeanAnomaly = (0.9856 * approxTimeOfEventInDays) - 3.289;

    let sunTrueLongitude = sunMeanAnomaly + (1.916 * sinDeg(sunMeanAnomaly)) + (0.020 * sinDeg(2 * sunMeanAnomaly)) + 282.634;
    sunTrueLongitude = mod(sunTrueLongitude, 360);

    let ascension = 0.91764 * tanDeg(sunTrueLongitude);
    let rightAscension = 360 / (2 * Math.PI) * Math.atan(ascension);
    rightAscension = mod(rightAscension, 360);

    let lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
    let raQuadrant = Math.floor(rightAscension / 90) * 90;
    rightAscension = rightAscension + (lQuadrant - raQuadrant);
    rightAscension /= DEGREES_PER_HOUR;

    let sinDec = 0.39782 * sinDeg(sunTrueLongitude);
    let cosDec = cosDeg(asinDeg(sinDec));
    let cosLocalHourAngle = ((cosDeg(zenith)) - (sinDec * (sinDeg(latitude)))) / (cosDec * (cosDeg(latitude)));

    let localHourAngle = acosDeg(cosLocalHourAngle);

    if (sunrise) {
        localHourAngle = 360 - localHourAngle;
    }

    let localHour = localHourAngle / DEGREES_PER_HOUR;

    let localMeanTime = localHour + rightAscension - (0.06571 * approxTimeOfEventInDays) - 6.622;

    let time = localMeanTime - (longitude / DEGREES_PER_HOUR);
    time = mod(time, 24);

    let midnight = new Date(0);
    midnight.setUTCFullYear(date.getUTCFullYear());
    midnight.setUTCMonth(date.getUTCMonth());
    midnight.setUTCDate(date.getUTCDate());

    let milli = midnight.getTime() + (time * 60 * 60 * 1000);

    return new Date(milli);
}


/**************************
 * EXPORT
 */

export function calcSunrise(latitude, longitude, date, zenith) {
    return sunLevel(latitude, longitude, date, true, zenith);
}

export function calcSunset(latitude, longitude, date, zenith) {
    return sunLevel(latitude, longitude, date, false, zenith);
}

export function isDay(latitude, longitude, date, zenith) {

    if(!date) date = new Date();

    let now = date.getHours();
    let sunrise = calcSunrise(latitude, longitude, date, zenith).getHours();
    let sunset = calcSunset(latitude, longitude, date, zenith).getHours();

   return now > sunrise && now < sunset;
}

export default {
    sunrise: calcSunrise,
    sunset: calcSunset
}