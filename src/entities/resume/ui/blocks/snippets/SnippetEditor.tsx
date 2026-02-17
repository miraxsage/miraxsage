"use client";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as codeSnippets from "./codeSnippets";
import CustomCodeEditor from "@/shared/ui/CodeEditor";

const langAssociations: Record<string, string> = {
    js: "jsx",
    ts: "tsx",
    react: "tsx",
    php: "php",
    wp: "php",
    mysql: "sql",
    cs: "csharp",
    wpf: "csharp",
    onec: "c",
};

export default function SnippetEditor({ lang }: { lang: string }) {
    const langKey = langAssociations[lang] as keyof typeof langs | undefined;
    return (
        <CustomCodeEditor
            value={(codeSnippets as Record<string, string>)[lang]}
            extensions={langKey && langKey in langs ? [(langs as Record<string, () => any>)[langKey]()] : []}
        />
    );
}
