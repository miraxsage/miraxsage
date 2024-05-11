import { langs } from "@uiw/codemirror-extensions-langs";
import * as codeSnippets from "./codeSnippets.tsx";
import CustomCodeEditor from "@/components/CodeEditor.tsx";

const langAssociations = {
    js: "jsx",
    ts: "tsx",
    react: "tsx",
    php: "php",
    wp: "php",
    mysql: "mysql",
    cs: "csharp",
    wpf: "csharp",
    onec: "c",
} as const;

export default function SnippetEditor({ lang }: { lang: string }) {
    return (
        <CustomCodeEditor
            value={codeSnippets[lang as keyof typeof langAssociations]}
            extensions={[langs[langAssociations[lang as keyof typeof langAssociations]]()]}
        />
    );
}
