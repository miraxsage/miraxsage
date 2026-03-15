"use client";

import { useLayoutEffect, useRef } from "react";
import { Box, useTheme } from "@mui/material";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
    $getRoot,
    $createParagraphNode,
    $createTextNode,
    $isTextNode,
    $isElementNode,
    $isDecoratorNode,
    type EditorState,
    type LexicalEditor,
    type Klass,
    type LexicalNode,
} from "lexical";
import { FORMAT_TEXT_COMMAND } from "lexical";
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import { $getSelection, $isRangeSelection } from "lexical";
import { IconButton, Divider } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TitleIcon from "@mui/icons-material/Title";
import { getThemeColor } from "@/shared/lib/theme";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $createImageMarkerNode } from "./ImageMarkerNode";

function ToolbarPlugin({ toolbarExtra }: { toolbarExtra?: React.ReactNode }) {
    const [editor] = useLexicalComposerContext();
    const theme = useTheme();

    const btnSx = {
        color: getThemeColor("regularIcon", theme),
        "&:hover": { color: getThemeColor("tabActiveText", theme) },
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 0.25,
                p: 0.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
                flexWrap: "wrap",
            }}
        >
            <IconButton
                size="small"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
                sx={btnSx}
            >
                <FormatBoldIcon fontSize="small" />
            </IconButton>
            <IconButton
                size="small"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                sx={btnSx}
            >
                <FormatItalicIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton
                size="small"
                onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () => $createHeadingNode("h3"));
                        }
                    });
                }}
                sx={btnSx}
            >
                <TitleIcon fontSize="small" />
            </IconButton>
            <IconButton
                size="small"
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
                sx={btnSx}
            >
                <FormatListBulletedIcon fontSize="small" />
            </IconButton>
            <IconButton
                size="small"
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
                sx={btnSx}
            >
                <FormatListNumberedIcon fontSize="small" />
            </IconButton>
            {toolbarExtra}
        </Box>
    );
}

function HtmlInitPlugin({ html, hasImageMarkers, onReady }: { html: string; hasImageMarkers?: boolean; onReady?: () => void }) {
    const [editor] = useLexicalComposerContext();

    useLayoutEffect(() => {
        if (!html) {
            onReady?.();
            return;
        }
        try {
            editor.update(() => {
                const root = $getRoot();
                root.clear();

                // Pre-process: wrap bare text and <br> in <p> tags at DOM level
                const wrapper = document.createElement("div");
                wrapper.innerHTML = html;
                const cleaned = document.createElement("div");
                const blockTags = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "DIV", "BLOCKQUOTE", "TABLE", "HR"]);

                for (let i = 0; i < wrapper.childNodes.length; i++) {
                    const child = wrapper.childNodes[i];
                    if (child.nodeType === Node.ELEMENT_NODE) {
                        const el = child as HTMLElement;
                        if (blockTags.has(el.tagName)) {
                            cleaned.appendChild(el.cloneNode(true));
                        } else if (el.tagName === "BR") {
                            // skip bare <br>
                        } else {
                            // inline element — wrap in <p>
                            const p = document.createElement("p");
                            p.appendChild(el.cloneNode(true));
                            cleaned.appendChild(p);
                        }
                    } else if (child.nodeType === Node.TEXT_NODE) {
                        const text = child.textContent || "";
                        if (text.trim()) {
                            const p = document.createElement("p");
                            p.textContent = text;
                            cleaned.appendChild(p);
                        }
                    }
                }

                if (cleaned.childNodes.length === 0) {
                    cleaned.innerHTML = "<p></p>";
                }

                const dom = new DOMParser().parseFromString(cleaned.innerHTML, "text/html");
                const nodes = $generateNodesFromDOM(editor, dom);

                const validNodes: LexicalNode[] = [];
                for (const node of nodes) {
                    if ($isElementNode(node) || $isDecoratorNode(node)) {
                        validNodes.push(node);
                    } else if ($isTextNode(node)) {
                        const text = node.getTextContent();
                        if (text && text.trim()) {
                            const p = $createParagraphNode();
                            p.append($createTextNode(text));
                            validNodes.push(p);
                        }
                    }
                }

                if (validNodes.length > 0) {
                    root.append(...validNodes);
                } else {
                    root.append($createParagraphNode());
                }

                if (hasImageMarkers) {
                    const IMAGE_MARKER_RE = /\[Image:([a-z0-9_-]+)\]/;
                    const nodesToProcess: { node: LexicalNode; parent: LexicalNode }[] = [];
                    root.getChildren().forEach((child) => {
                        if ($isElementNode(child)) {
                            child.getChildren().forEach((node) => {
                                if ($isTextNode(node) && IMAGE_MARKER_RE.test(node.getTextContent())) {
                                    nodesToProcess.push({ node, parent: child });
                                }
                            });
                        }
                    });
                    for (const { node, parent } of nodesToProcess) {
                        const text = node.getTextContent();
                        const parts = text.split(/(\[Image:[a-z0-9_-]+\])/);
                        const newNodes: LexicalNode[] = [];
                        for (const part of parts) {
                            const match = part.match(/^\[Image:([a-z0-9_-]+)\]$/);
                            if (match) {
                                newNodes.push($createImageMarkerNode(match[1]));
                            } else if (part && part.trim()) {
                                const p = $createParagraphNode();
                                p.append($createTextNode(part));
                                newNodes.push(p);
                            }
                        }
                        for (const n of newNodes.reverse()) {
                            parent.insertAfter(n);
                        }
                        parent.remove();
                    }
                }
            }, { tag: "history-merge" });
        } catch (e) {
            console.error("HtmlInitPlugin error:", e);
        }
        onReady?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    onBlur?: () => void;
    minHeight?: number;
    extraNodes?: Klass<LexicalNode>[];
    extraPlugins?: React.ReactNode;
    toolbarExtra?: React.ReactNode;
}

export default function RichTextEditor({
    value,
    onChange,
    onBlur,
    minHeight = 120,
    extraNodes,
    extraPlugins,
    toolbarExtra,
}: RichTextEditorProps) {
    const theme = useTheme();
    const hasMarkers = !!extraNodes?.length;
    const readyRef = useRef(!hasMarkers);

    const initialConfig = {
        namespace: "AdminEditor",
        theme: {
            paragraph: "editor-paragraph",
            heading: {
                h1: "editor-h1",
                h2: "editor-h2",
                h3: "editor-h3",
            },
            text: {
                bold: "editor-bold",
                italic: "editor-italic",
            },
            list: {
                ul: "editor-ul",
                ol: "editor-ol",
                listitem: "editor-li",
            },
        },
        nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, ...(extraNodes ?? [])],
        onError: (error: Error) => console.error("Lexical error:", error),
    };

    const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
        if (!readyRef.current) return;
        editorState.read(() => {
            const html = $generateHtmlFromNodes(editor);
            onChange(html);
        });
    };

    return (
        <Box
            sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                overflow: "hidden",
                "& .editor-paragraph": { margin: "4px 0" },
                "& .editor-bold": { fontWeight: 700 },
                "& .editor-italic": { fontStyle: "italic" },
                "& .editor-h1, & .editor-h2, & .editor-h3": { fontWeight: 600, my: 1 },
                "& .editor-ul, & .editor-ol": { pl: 3 },
            }}
        >
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin toolbarExtra={toolbarExtra} />
                <Box sx={{ position: "relative" }}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                style={{
                                    minHeight,
                                    padding: "8px 12px",
                                    outline: "none",
                                    color: getThemeColor("regularText", theme),
                                }}
                                onBlur={onBlur}
                            />
                        }
                        placeholder={
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "8px",
                                    left: "12px",
                                    color: theme.palette.text.disabled,
                                    pointerEvents: "none",
                                }}
                            >
                                Enter content...
                            </Box>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                </Box>
                <OnChangePlugin onChange={handleChange} />
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <HtmlInitPlugin html={value} hasImageMarkers={hasMarkers} onReady={() => { readyRef.current = true; }} />
                {extraPlugins}
            </LexicalComposer>
        </Box>
    );
}
