"use client";
import { ReactNode, Fragment } from "react";
import { Box } from "@mui/material";
import LandingLink from "../LandingLink";
import Emoji from "../Emoji";

/**
 * Parses simple markup in info-block content stored in DB:
 *   _text_        → strikethrough
 *   [text](url)   → LandingLink
 *   emoji chars   → <Emoji> (escapes gradient clip)
 *   \n            → <br />
 */
export default function renderContent(raw: string, textColor: string): ReactNode {
    const lines = raw.split("\n");
    return lines.map((line, li) => (
        <Fragment key={li}>
            {li > 0 && <br />}
            {parseLine(line, textColor)}
        </Fragment>
    ));
}

// Regex: match _strike_ or [label](url) tokens
const TOKEN_RE = /_([^_]+)_|\[([^\]]+)\]\(([^)]+)\)/g;

// Emoji regex — matches characters with emoji presentation (not text-style symbols like ©, ™)
const EMOJI_RE = /([\p{Emoji_Presentation}](?:\ufe0f|\u200d[\p{Emoji_Presentation}])*)/gu;

function wrapEmojis(text: string, keyBase: number): ReactNode[] {
    const parts: ReactNode[] = [];
    let last = 0;
    EMOJI_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = EMOJI_RE.exec(text)) !== null) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        parts.push(<Emoji key={`e${keyBase}_${m.index}`} e={m[0]} />);
        last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
}

function parseLine(line: string, textColor: string): ReactNode[] {
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    TOKEN_RE.lastIndex = 0;
    while ((match = TOKEN_RE.exec(line)) !== null) {
        if (match.index > lastIndex) {
            parts.push(...wrapEmojis(line.slice(lastIndex, match.index), lastIndex));
        }
        if (match[1] !== undefined) {
            // _strikethrough_
            parts.push(
                <Box
                    key={match.index}
                    component="span"
                    sx={{ textDecoration: "line-through", textDecorationColor: textColor }}
                >
                    {match[1]}
                </Box>,
            );
        } else if (match[2] !== undefined) {
            // [label](url)
            parts.push(
                <LandingLink key={match.index} href={match[3]}>
                    {match[2]}
                </LandingLink>,
            );
        }
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
        parts.push(...wrapEmojis(line.slice(lastIndex), lastIndex));
    }
    return parts;
}
