"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";
import {
    COMMAND_PRIORITY_EDITOR,
    $getSelection,
    $isRangeSelection,
    $createParagraphNode,
    $getRoot,
    type RangeSelection,
} from "lexical";
import { INSERT_IMAGE_MARKER_COMMAND, $createImageMarkerNode } from "./ImageMarkerNode";

export const IMAGE_INSERT_EVENT = "lexical-insert-image-marker";
export const IMAGE_SAVE_SELECTION_EVENT = "lexical-save-selection";

export function dispatchImageInsert(slug: string) {
    document.dispatchEvent(new CustomEvent(IMAGE_INSERT_EVENT, { detail: slug }));
}

export function dispatchSaveSelection() {
    document.dispatchEvent(new CustomEvent(IMAGE_SAVE_SELECTION_EVENT));
}

export default function ImageMarkerPlugin() {
    const [editor] = useLexicalComposerContext();
    const savedSelectionRef = useRef<RangeSelection | null>(null);

    useEffect(() => {
        return editor.registerCommand(
            INSERT_IMAGE_MARKER_COMMAND,
            (slug: string) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const markerNode = $createImageMarkerNode(slug);
                        selection.insertNodes([markerNode, $createParagraphNode()]);
                    }
                });
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    // Save selection when image picker opens
    useEffect(() => {
        const handler = () => {
            editor.getEditorState().read(() => {
                const sel = $getSelection();
                savedSelectionRef.current = $isRangeSelection(sel) ? sel.clone() : null;
            });
        };
        document.addEventListener(IMAGE_SAVE_SELECTION_EVENT, handler);
        return () => document.removeEventListener(IMAGE_SAVE_SELECTION_EVENT, handler);
    }, [editor]);

    // Insert at saved selection position
    useEffect(() => {
        const handler = (e: Event) => {
            const slug = (e as CustomEvent<string>).detail;
            if (!slug) return;
            editor.update(() => {
                const saved = savedSelectionRef.current;
                if (saved) {
                    const markerNode = $createImageMarkerNode(slug);
                    saved.insertNodes([markerNode, $createParagraphNode()]);
                    savedSelectionRef.current = null;
                } else {
                    const root = $getRoot();
                    root.append($createImageMarkerNode(slug), $createParagraphNode());
                }
            });
        };
        document.addEventListener(IMAGE_INSERT_EVENT, handler);
        return () => document.removeEventListener(IMAGE_INSERT_EVENT, handler);
    }, [editor]);

    return null;
}
