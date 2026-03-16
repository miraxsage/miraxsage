"use client";
import { langs } from "@uiw/codemirror-extensions-langs";
import CustomCodeEditor from "@/shared/ui/CodeEditor";

export default function SnippetEditor({ code, language }: { code: string; language: string }) {
    const langKey = language as keyof typeof langs | undefined;
    return (
        <CustomCodeEditor
            value={code}
            extensions={langKey && langKey in langs ? [(langs as Record<string, () => any>)[langKey]()] : []}
        />
    );
}
