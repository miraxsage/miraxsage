"use client";

import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getNodeByKey,
    $getNearestNodeFromDOMNode,
    $getRoot,
    $createRangeSelection,
    $setSelection,
    $isTextNode,
} from "lexical";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { $createImageMarkerNode, $isImageMarkerNode } from "./ImageMarkerNode";

const DRAG_DATA_FORMAT = "application/x-lexical-image-marker";

/**
 * Custom drag-and-drop plugin for ImageMarkerNodes.
 * Shows a blinking caret at the exact text position during drag.
 * On drop, moves the image marker to that position.
 */
export default function ImageDragPlugin() {
    const [editor] = useLexicalComposerContext();
    const caretRef = useRef<HTMLDivElement | null>(null);
    const dragNodeKeyRef = useRef<string | null>(null);

    useEffect(() => {
        const rootElement = editor.getRootElement();
        if (!rootElement) return;
        const container = rootElement.parentElement;
        if (!container) return;

        // Create caret element
        const caret = document.createElement("div");
        caret.style.cssText =
            "position:absolute;width:2px;height:20px;pointer-events:none;z-index:100;" +
            "display:none;animation:image-drag-caret-blink 1s step-end infinite;";
        container.appendChild(caret);
        caretRef.current = caret;

        // Add blink animation
        const style = document.createElement("style");
        style.textContent = `@keyframes image-drag-caret-blink { 0%,100%{opacity:1} 50%{opacity:0} }`;
        document.head.appendChild(style);

        function getCaretColor() {
            return getComputedStyle(rootElement!).getPropertyValue("color") || "#fff";
        }

        function positionCaret(x: number, y: number) {
            if (!caret || !container) return;

            // Use caretRangeFromPoint to find text position
            let range: Range | null = null;
            if (document.caretRangeFromPoint) {
                range = document.caretRangeFromPoint(x, y);
            } else if ((document as unknown as { caretPositionFromPoint: (x: number, y: number) => { offsetNode: Node; offset: number } | null }).caretPositionFromPoint) {
                const pos = (document as unknown as { caretPositionFromPoint: (x: number, y: number) => { offsetNode: Node; offset: number } | null }).caretPositionFromPoint(x, y);
                if (pos) {
                    range = document.createRange();
                    range.setStart(pos.offsetNode, pos.offset);
                    range.collapse(true);
                }
            }

            if (!range) {
                caret.style.display = "none";
                return;
            }

            // Check the range is inside the editor
            if (!rootElement!.contains(range.startContainer)) {
                caret.style.display = "none";
                return;
            }

            const rangeRect = range.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            if (rangeRect.width === 0 && rangeRect.height === 0) {
                // collapsed range at the end of a line — use the parent element
                const parent = range.startContainer.parentElement;
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    caret.style.left = `${rangeRect.left - containerRect.left}px`;
                    caret.style.top = `${parentRect.top - containerRect.top}px`;
                    caret.style.height = `${parentRect.height}px`;
                } else {
                    caret.style.display = "none";
                    return;
                }
            } else {
                caret.style.left = `${rangeRect.left - containerRect.left}px`;
                caret.style.top = `${rangeRect.top - containerRect.top}px`;
                caret.style.height = `${rangeRect.height}px`;
            }

            caret.style.backgroundColor = getCaretColor();
            caret.style.display = "block";
        }

        function onDragStart(e: DragEvent) {
            const target = e.target as HTMLElement;
            // Only allow drag from the handle
            if (!target.closest("[data-drag-handle]")) return;

            const markerEl = target.closest("[data-image-marker]");
            if (!markerEl) return;

            const slug = markerEl.getAttribute("data-image-marker");
            if (!slug) return;

            // Find the Lexical node key
            editor.getEditorState().read(() => {
                const root = $getRoot();
                for (const child of root.getChildren()) {
                    if ($isImageMarkerNode(child) && child.getSlug() === slug) {
                        dragNodeKeyRef.current = child.getKey();
                        break;
                    }
                }
            });

            if (!dragNodeKeyRef.current) return;

            e.dataTransfer?.setData(DRAG_DATA_FORMAT, dragNodeKeyRef.current);
            e.dataTransfer!.effectAllowed = "move";

            // Show the full marker as drag ghost
            if (e.dataTransfer) {
                e.dataTransfer.setDragImage(markerEl as HTMLElement, 0, 0);
            }
        }

        function onDragOver(e: DragEvent) {
            if (!dragNodeKeyRef.current) return;
            e.preventDefault();
            e.dataTransfer!.dropEffect = "move";
            positionCaret(e.clientX, e.clientY);
        }

        function onDragEnd() {
            dragNodeKeyRef.current = null;
            if (caret) caret.style.display = "none";
        }

        function onDrop(e: DragEvent) {
            const nodeKey = dragNodeKeyRef.current;
            if (!nodeKey) return;

            e.preventDefault();
            if (caret) caret.style.display = "none";

            // Find drop position using caretRangeFromPoint
            let range: Range | null = null;
            if (document.caretRangeFromPoint) {
                range = document.caretRangeFromPoint(e.clientX, e.clientY);
            }

            if (!range || !rootElement!.contains(range.startContainer)) {
                dragNodeKeyRef.current = null;
                return;
            }

            const dropDOMNode = range.startContainer;
            const dropOffset = range.startOffset;

            editor.update(() => {
                const draggedNode = $getNodeByKey(nodeKey);
                if (!draggedNode || !$isImageMarkerNode(draggedNode)) return;

                const slug = draggedNode.getSlug();

                // Find the nearest Lexical node at the drop point
                let domNode: Node | null = dropDOMNode;
                if (domNode.nodeType === Node.TEXT_NODE) {
                    domNode = domNode.parentElement;
                }
                if (!domNode) return;

                const nearestNode = $getNearestNodeFromDOMNode(domNode as HTMLElement);
                if (!nearestNode) return;

                // Remove old node
                draggedNode.remove();

                // Character-level insertion: set selection at drop point,
                // then $insertNodeToNearestRoot splits the paragraph automatically
                if ($isTextNode(nearestNode)) {
                    const textLen = nearestNode.getTextContentSize();
                    const safeOffset = Math.min(dropOffset, textLen);

                    const sel = $createRangeSelection();
                    sel.anchor.set(nearestNode.getKey(), safeOffset, "text");
                    sel.focus.set(nearestNode.getKey(), safeOffset, "text");
                    $setSelection(sel);

                    $insertNodeToNearestRoot($createImageMarkerNode(slug));
                } else {
                    // Block-level drop (empty paragraph, non-text element, etc.)
                    const topLevel = nearestNode.getTopLevelElement() ?? nearestNode;
                    const newMarker = $createImageMarkerNode(slug);
                    const element = editor.getElementByKey(topLevel.getKey());
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        const midY = rect.top + rect.height / 2;
                        if (e.clientY < midY) {
                            topLevel.insertBefore(newMarker);
                        } else {
                            topLevel.insertAfter(newMarker);
                        }
                    } else {
                        topLevel.insertAfter(newMarker);
                    }
                }
            });

            dragNodeKeyRef.current = null;
        }

        // Listen on the container (parent of editor root) to catch events
        // that might be on image markers (contentEditable=false)
        container.addEventListener("dragstart", onDragStart);
        container.addEventListener("dragover", onDragOver);
        container.addEventListener("dragend", onDragEnd);
        container.addEventListener("drop", onDrop);

        return () => {
            container.removeEventListener("dragstart", onDragStart);
            container.removeEventListener("dragover", onDragOver);
            container.removeEventListener("dragend", onDragEnd);
            container.removeEventListener("drop", onDrop);
            if (caret.parentElement) caret.parentElement.removeChild(caret);
            if (style.parentElement) style.parentElement.removeChild(style);
        };
    }, [editor]);

    return null;
}
