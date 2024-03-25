export function mix(color1: string, color2: string, weight: number) {
    function d2h(d: number) {
        return d.toString(16);
    } // convert a decimal value to hex
    function h2d(h: string) {
        return parseInt(h, 16);
    } // convert a hex value to decimal

    if (color1.startsWith("#")) color1 = color1.slice(1);
    if (color2.startsWith("#")) color2 = color2.slice(1);

    weight = typeof weight !== "undefined" ? weight : 50; // set the weight to 50%, if that argument is omitted

    let color = "#";

    for (let i = 0; i <= 5; i += 2) {
        // loop through each of the 3 hex pairs—red, green, and blue
        const v1 = h2d(color1.slice(i, i + 2)), // extract the current pairs
            v2 = h2d(color2.slice(i, i + 2));
        // combine the current pairs from each source color, according to the specified weight
        let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
        while (val.length < 2) val = "0" + val;
        // prepend a '0' if val results in a single digit
        color += val; // concatenate val to our new color string
    }
    return color;
}

const chartGradientPoints = [
    { color: "53c6b7", point: 0 },
    { color: "33c4f4", point: 20 },
    { color: "5353ce", point: 40 },
    { color: "6953af", point: 60 },
    { color: "9001cb", point: 80 },
    { color: "da00ff", point: 100 },
];
function extractGradientColor(position: number) {
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    for (let i = 0; i < chartGradientPoints.length - 1; i++) {
        const from = chartGradientPoints[i];
        const to = chartGradientPoints[i + 1];
        if (position >= from.point && position <= to.point)
            return mix(from.color, to.color, (100 * (to.point - position)) / (to.point - from.point));
    }
    return "#000000";
}
export function chartColors(count: number) {
    if (count <= 0) return [];
    if (count == 1) return [extractGradientColor(25)];
    const result = [];
    const inc = 100 / (count - 1);
    for (let i = 0; Math.floor(i) <= 100; i += inc) result.push(extractGradientColor(i));
    return result;
}
