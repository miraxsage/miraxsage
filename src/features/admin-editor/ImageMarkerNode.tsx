"use client";

import { useCallback } from "react";
import {
    DecoratorNode,
    createCommand,
    $getNodeByKey,
    type LexicalCommand,
    type LexicalNode,
    type NodeKey,
    type SerializedLexicalNode,
    type Spread,
    $applyNodeReplacement,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useImageMarkerContext } from "./ImageMarkerContext";
import useLocalizedField from "./useLocalizedField";

export const INSERT_IMAGE_MARKER_COMMAND: LexicalCommand<string> = createCommand("INSERT_IMAGE_MARKER");

export type SerializedImageMarkerNode = Spread<
    { slug: string; type: "image-marker"; version: 1 },
    SerializedLexicalNode
>;

function applyFloat(el: HTMLElement, side?: "left" | "right") {
    const wrapper = el.closest("[data-image-marker]") as HTMLElement | null;
    if (!wrapper) return;
    if (!side) {
        const editor = wrapper.closest('[contenteditable="true"]');
        if (!editor) return;
        const all = Array.from(editor.querySelectorAll("[data-image-marker]"));
        const idx = all.indexOf(wrapper);
        side = idx % 2 === 0 ? "left" : "right";
    }
    wrapper.style.float = side;
    wrapper.style.margin = side === "left" ? "15px 25px 15px 0px" : "15px 0px 15px 25px";
    wrapper.style.clear = "none";
    wrapper.setAttribute("data-float", side);
}

function ImageMarkerComponent({ slug, nodeKey }: { slug: string; nodeKey: NodeKey }) {
    const [editor] = useLexicalComposerContext();
    const ctx = useImageMarkerContext();
    const theme = useTheme();
    const { lang } = useLocalizedField();
    const innerRef = useCallback((el: HTMLElement | null) => {
        if (el) applyFloat(el);
    }, []);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node) node.remove();
        });
    };

    const handleAlign = (e: React.MouseEvent, side: "left" | "right") => {
        e.stopPropagation();
        const el = (e.currentTarget as HTMLElement).closest("[data-image-marker]") as HTMLElement | null;
        if (!el) return;
        const inner = el.querySelector("[data-inner]") as HTMLElement | null;
        if (inner) applyFloat(inner, side);
        else {
            el.style.float = side;
            el.style.margin = side === "left" ? "15px 25px 15px 0px" : "15px 0px 15px 25px";
            el.setAttribute("data-float", side);
        }
    };

    if (!ctx) {
        return (
            <Box
                ref={innerRef}
                data-inner
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    my: 0.5,
                    border: "1px dashed",
                    borderColor: "divider",
                    borderRadius: 1,
                    bgcolor: "action.hover",
                    userSelect: "none",
                }}
                contentEditable={false}
            >
                <ImageIcon fontSize="small" color="primary" />
                <span style={{ fontSize: 13, fontFamily: "monospace" }}>[Image:{slug}]</span>
            </Box>
        );
    }

    const { images, mediaId, onImageClick } = ctx;
    const image = images.find((img) => img.slug === slug);
    const imgSrc = image ? `/img/projects/${mediaId}/${image.slug}${image.original_ext}` : null;
    const title = image ? (lang === "ru" ? image.title_ru : image.title_en) || slug : slug;

    const headerBtnSx = {
        width: 20,
        height: 20,
        color: "text.secondary",
        p: 0,
    };

    return (
        <Box
            ref={innerRef}
            data-inner
            onClick={() => onImageClick(slug)}
            sx={{
                display: "inline-flex",
                flexDirection: "column",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 1,
                userSelect: "none",
                cursor: "pointer",
                transition: "border-color 0.15s",
                "&:hover": { borderColor: "primary.main" },
                overflow: "hidden",
            }}
            contentEditable={false}
        >
            {/* Header with title + controls */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1,
                    py: 0.5,
                    bgcolor: "action.hover",
                    borderBottom: `1px dashed ${theme.palette.divider}`,
                }}
            >
                <Box
                    draggable
                    data-drag-handle
                    sx={{
                        cursor: "grab",
                        display: "flex",
                        alignItems: "center",
                        ml: -0.5,
                        "&:active": { cursor: "grabbing" },
                    }}
                >
                    <DragIndicatorIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                </Box>
                <ImageIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography sx={{ fontSize: 12, color: "text.secondary", fontWeight: 500, flex: 1 }}>
                    {title}
                </Typography>
                <IconButton size="small" onClick={(e) => handleAlign(e, "left")} sx={headerBtnSx}>
                    <FormatAlignLeftIcon sx={{ fontSize: 15 }} />
                </IconButton>
                <IconButton size="small" onClick={(e) => handleAlign(e, "right")} sx={headerBtnSx}>
                    <FormatAlignRightIcon sx={{ fontSize: 15 }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={handleDelete}
                    sx={{ ...headerBtnSx, "&:hover": { color: "error.main" } }}
                >
                    <DeleteIcon sx={{ fontSize: 15 }} />
                </IconButton>
            </Box>
            {/* Image matching client dimensions */}
            {imgSrc ? (
                <Box
                    component="img"
                    src={imgSrc}
                    alt={slug}
                    sx={{
                        width: 380,
                        height: 200,
                        objectFit: "cover",
                        display: "block",
                    }}
                />
            ) : (
                <Box sx={{ width: 380, height: 200, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "action.hover" }}>
                    <Typography sx={{ fontSize: 13, fontFamily: "monospace", color: "text.disabled" }}>
                        {slug}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export class ImageMarkerNode extends DecoratorNode<JSX.Element> {
    __slug: string;

    static getType(): string {
        return "image-marker";
    }

    static clone(node: ImageMarkerNode): ImageMarkerNode {
        return new ImageMarkerNode(node.__slug, node.__key);
    }

    constructor(slug: string, key?: NodeKey) {
        super(key);
        this.__slug = slug;
    }

    getSlug(): string {
        return this.__slug;
    }

    createDOM(): HTMLElement {
        const div = document.createElement("div");
        div.style.display = "block";
        div.style.userSelect = "none";
        div.contentEditable = "false";
        div.setAttribute("data-image-marker", this.__slug);
        return div;
    }

    updateDOM(): false {
        return false;
    }

    exportDOM(): { element: HTMLElement } {
        const span = document.createElement("span");
        span.textContent = `[Image:${this.__slug}]`;
        return { element: span };
    }

    static importDOM() {
        return null;
    }

    exportJSON(): SerializedImageMarkerNode {
        return { slug: this.__slug, type: "image-marker", version: 1 };
    }

    static importJSON(json: SerializedImageMarkerNode): ImageMarkerNode {
        return $createImageMarkerNode(json.slug);
    }

    isInline(): boolean {
        return false;
    }

    decorate(): JSX.Element {
        return <ImageMarkerComponent slug={this.__slug} nodeKey={this.__key} />;
    }
}

export function $createImageMarkerNode(slug: string): ImageMarkerNode {
    return $applyNodeReplacement(new ImageMarkerNode(slug));
}

export function $isImageMarkerNode(node: LexicalNode | null | undefined): node is ImageMarkerNode {
    return node instanceof ImageMarkerNode;
}
