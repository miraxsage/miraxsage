/**
 * Server-only utility: resolves an icon name to a clean SVG string.
 *
 * Resolution order:
 * 1. Custom icon .tsx files in src/shared/icons/ (tries ${name}.tsx then ${name}Icon.tsx)
 * 2. MUI icon CJS module files in node_modules/@mui/icons-material/
 *
 * Reads files as plain text — no module loading, no "use client" issues.
 */
import fs from "fs";
import path from "path";
import { getDb } from "@/db";

const cache = new Map<string, string | null>();

export function invalidateIconCache(name: string) {
    cache.delete(name);
}

function resolveUserIconSvg(name: string): string | null {
    try {
        const db = getDb();
        const row = db.prepare("SELECT svg FROM user_icons WHERE name = ?").get(name) as { svg: string } | undefined;
        if (!row?.svg) return null;
        // Add 1em dimensions so DynamicIcon renders at the right size (same as resolveCustomIconSvg)
        return row.svg.replace(/^<svg\b/, '<svg width="1em" height="1em"');
    } catch {
        return null;
    }
}

// JSX camelCase SVG attrs that need conversion to HTML kebab-case
const CAMEL_TO_KEBAB: Record<string, string> = {
    strokeWidth: "stroke-width",
    strokeLinecap: "stroke-linecap",
    strokeLinejoin: "stroke-linejoin",
    strokeDasharray: "stroke-dasharray",
    fillOpacity: "fill-opacity",
    strokeOpacity: "stroke-opacity",
};

// Attrs to skip (not needed in standalone SVG output)
const SKIP_ATTRS = new Set(["xmlns", "width", "height", "xmlSpace"]);

function resolveCustomIconSvg(name: string): string | null {
    const srcDir = path.join(process.cwd(), "src/shared/icons");
    let content: string | null = null;

    for (const filename of [`${name}.tsx`, `${name}Icon.tsx`]) {
        try {
            content = fs.readFileSync(path.join(srcDir, filename), "utf8");
            break;
        } catch {
            // try next
        }
    }

    if (!content) return null;

    // Match the <svg ...> ... </svg> block
    const svgBlockMatch = content.match(/<svg\b([\s\S]*?)>([\s\S]*?)<\/svg>/);
    if (!svgBlockMatch) return null;

    const svgOpenAttrsStr = svgBlockMatch[1];
    const innerContent = svgBlockMatch[2].trim();

    // Remove JSX spread expressions like {...props}
    const cleanAttrsStr = svgOpenAttrsStr.replace(/\{[^}]*\}/g, "");

    // Build output attrs, always include xmlns
    const htmlAttrs: string[] = ['xmlns="http://www.w3.org/2000/svg"'];

    for (const m of cleanAttrsStr.matchAll(/(\w+)=(?:"([^"]*)"|\{([^}]*)\})/g)) {
        const [, attrName, strVal, jsxVal] = m;
        if (SKIP_ATTRS.has(attrName)) continue;
        const val = strVal ?? jsxVal.trim();
        const htmlAttrName = CAMEL_TO_KEBAB[attrName] ?? attrName;
        htmlAttrs.push(`${htmlAttrName}="${val}"`);
    }

    return `<svg ${htmlAttrs.join(" ")} width="1em" height="1em">${innerContent}</svg>`;
}

function resolveMuiIconSvg(name: string): string | null {
    const iconFile = path.join(process.cwd(), "node_modules/@mui/icons-material", `${name}.js`);
    let content: string;
    try {
        content = fs.readFileSync(iconFile, "utf8");
    } catch {
        return null;
    }

    // Extract <path> elements — CJS format: jsx("path", { d: "...", opacity: "..." })
    const elements: string[] = [];
    for (const match of content.matchAll(/"path",\s*\{([^}]+)\}/g)) {
        const props = match[1];
        const d = props.match(/\bd:\s*"([^"]+)"/)?.[1];
        if (!d) continue;
        const opacity = props.match(/\bopacity:\s*"?([0-9.]+)"?/)?.[1];
        elements.push(`<path d="${d}"${opacity ? ` opacity="${opacity}"` : ""}/>`)
    }

    if (elements.length === 0) return null;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">${elements.join("")}</svg>`;
}

export function resolveIconSvg(name: string | null | undefined): string | undefined {
    if (!name) return undefined;
    if (cache.has(name)) return cache.get(name) ?? undefined;

    const svg = resolveUserIconSvg(name) ?? resolveCustomIconSvg(name) ?? resolveMuiIconSvg(name);
    cache.set(name, svg);
    return svg ?? undefined;
}
