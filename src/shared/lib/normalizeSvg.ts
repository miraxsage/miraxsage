/**
 * Normalizes an SVG string to be monochrome (currentColor).
 * - Replaces fill/stroke color values with currentColor (keeps "none")
 * - Removes width/height from root <svg>
 * - Adds fill="currentColor" to root <svg> if no fill present
 * - Strips inline style color declarations
 */

/** Replace fill="<color>" but not fill="none" */
function replaceColors(svg: string): string {
    // Replace fill="<anything except none/transparent/currentColor>" → fill="currentColor"
    svg = svg.replace(/\bfill="(?!none|transparent|currentColor)([^"]*)"/g, 'fill="currentColor"');
    // Replace stroke="<anything except none/transparent/currentColor>" → stroke="currentColor"
    svg = svg.replace(/\bstroke="(?!none|transparent|currentColor)([^"]*)"/g, 'stroke="currentColor"');
    // Replace fill:<color> in style attributes
    svg = svg.replace(/\bfill\s*:\s*(?!none|transparent)[^;")]+/g, 'fill:currentColor');
    // Replace stroke:<color> in style attributes
    svg = svg.replace(/\bstroke\s*:\s*(?!none|transparent)[^;")]+/g, 'stroke:currentColor');
    return svg;
}

/** Remove width/height from root <svg> tag and set to 1em so parent font-size controls size */
function stripRootDimensions(svg: string): string {
    return svg.replace(/^(<svg\b[^>]*)>/, (_, attrs) =>
        attrs.replace(/\s+(?:width|height)="[^"]*"/g, '') + ' width="1em" height="1em">'
    );
}

/** Add fill="currentColor" to root <svg> if no fill attr present */
function ensureRootFill(svg: string): string {
    const rootTagMatch = svg.match(/^<svg\b([^>]*)>/);
    if (!rootTagMatch) return svg;
    const attrs = rootTagMatch[1];
    if (/\bfill=/.test(attrs)) return svg;
    return svg.replace(/^<svg\b/, '<svg fill="currentColor"');
}

/** Strip dangerous content: <script>, on* handlers, javascript: URIs, foreignObject, external hrefs */
function stripDangerous(svg: string): string {
    // Remove <script>...</script> blocks (case-insensitive)
    svg = svg.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    // Remove <foreignObject>...</foreignObject> (enables arbitrary HTML injection)
    svg = svg.replace(/<foreignObject\b[^>]*>[\s\S]*?<\/foreignObject>/gi, '');
    // Also strip unclosed/self-closing <foreignObject> tags
    svg = svg.replace(/<foreignObject\b[^>]*\/?>/gi, '');
    // Remove on* event handler attributes (e.g. onload, onclick)
    svg = svg.replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|\S+)/gi, '');
    // Remove href/xlink:href that are not fragment-only references (strip external URLs + javascript:)
    svg = svg.replace(/\b(?:href|xlink:href)\s*=\s*"(?!#)[^"]*"/gi, '');
    svg = svg.replace(/\b(?:href|xlink:href)\s*=\s*'(?!#)[^']*'/gi, '');
    return svg;
}

export function normalizeSvg(raw: string): string {
    let svg = raw.trim();
    // Strip leading XML declaration and comments before <svg
    svg = svg.replace(/^(<\?xml[^?]*\?>)?\s*(<!--[\s\S]*?-->\s*)*/i, '').trim();
    // Must start with <svg
    if (!svg.startsWith('<svg')) throw new Error('Not a valid SVG: must start with <svg>');
    svg = stripDangerous(svg);
    svg = stripRootDimensions(svg);
    svg = replaceColors(svg);
    svg = ensureRootFill(svg);
    // Add xmlns if missing
    if (!svg.includes('xmlns=')) {
        svg = svg.replace(/^<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    return svg;
}
