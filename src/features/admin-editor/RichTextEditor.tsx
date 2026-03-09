"use client";

import { useEffect } from "react";
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
    type EditorState,
    type LexicalEditor,
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

function ToolbarPlugin() {
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
        </Box>
    );
}

function HtmlInitPlugin({ html }: { html: string }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!html) return;
        editor.update(() => {
            const root = $getRoot();
            root.clear();
            if (html.trim().startsWith("<")) {
                const parser = new DOMParser();
                const dom = parser.parseFromString(html, "text/html");
                const nodes = $generateNodesFromDOM(editor, dom);
                if (nodes.length > 0) {
                    root.append(...nodes);
                } else {
                    const p = $createParagraphNode();
                    p.append($createTextNode(html));
                    root.append(p);
                }
            } else {
                const p = $createParagraphNode();
                p.append($createTextNode(html));
                root.append(p);
            }
        });
        // Only run on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    onBlur?: () => void;
    minHeight?: number;
}

export default function RichTextEditor({
    value,
    onChange,
    onBlur,
    minHeight = 120,
}: RichTextEditorProps) {
    const theme = useTheme();

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
        nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
        onError: (error: Error) => console.error("Lexical error:", error),
    };

    const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
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
                <ToolbarPlugin />
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
                <HtmlInitPlugin html={value} />
            </LexicalComposer>
        </Box>
    );
}
