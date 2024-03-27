import CodeEditor from "@uiw/react-codemirror";
import { getThemeColor } from "@/components/contexts/Theme";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { useColorMode } from "@/store/appearanceSlice";
import { Box, alpha, useTheme } from "@mui/material";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as codeSnippets from "./codeSnippets.tsx";

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
    const theme = useTheme();
    const isDark = useColorMode().dark;
    const regularClr = getThemeColor("regularText", theme);
    const keyClr = isDark ? theme.palette.secondary.light : "#158a7b";
    const codeEditorTheme = createTheme({
        theme: "light",
        settings: {
            background: "transparent",
            backgroundImage: "",
            foreground: regularClr,
            caret: getThemeColor("tabHoverText", theme),
            selection: alpha(getThemeColor("accentedBg", theme), 0.06),
            selectionMatch: "#036dd626",
            lineHighlight: alpha(getThemeColor("regularHoverBg", theme), 0.17),
            gutterBackground: alpha(getThemeColor("layoutBackground", theme), 0.8),
            gutterBorder: theme.palette.divider,
            gutterForeground: "#8a919966",
        },
        styles: [
            { tag: t.comment, color: "#52577299" },
            { tag: t.variableName, color: isDark ? "#7b7cc3" : "#6667d0" },
            { tag: [t.string, t.special(t.brace)], color: isDark ? "#a997af" : "#9860aa" },
            { tag: t.number, color: "#6b97aa" },
            { tag: t.bool, color: keyClr },
            { tag: t.null, color: keyClr },
            { tag: t.keyword, color: keyClr },
            { tag: t.operator, color: regularClr },
            { tag: t.className, color: regularClr },
            { tag: t.definition(t.typeName), color: regularClr },
            { tag: t.typeName, color: regularClr },
            { tag: t.angleBracket, color: regularClr },
            { tag: t.tagName, color: regularClr },
            { tag: t.attributeName, color: regularClr },
        ],
    });
    return (
        <Box
            sx={{
                "& .cm-gutters": {
                    backdropFilter: "blur(3px)",
                },
            }}
        >
            <CodeEditor
                value={codeSnippets[lang as keyof typeof langAssociations]}
                extensions={[langs[langAssociations[lang as keyof typeof langAssociations]]()]}
                basicSetup={{ foldGutter: false }}
                readOnly={true}
                editable={false}
                theme={codeEditorTheme}
            />
        </Box>
    );
}
