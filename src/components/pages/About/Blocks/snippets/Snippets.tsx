import AccentedTreeView from "@/components/AccentedTreeView";
import CSharpIcon from "@/components/icons/CSharpIcon";
import JSIcon from "@/components/icons/JSIcon";
import MarkupIcon from "@/components/icons/MarkupIcon";
import MySqlIcon from "@/components/icons/MySqlIcon";
import OneCIcon from "@/components/icons/OneCIcon";
import PHPIcon from "@/components/icons/PHPIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import TSIcon from "@/components/icons/TSIcon";
import WindowsIcon from "@/components/icons/WindowsIcon";
import WordpressIcon from "@/components/icons/WordpressIcon";
import { Box, useTheme } from "@mui/material";
import TerminalIcon from "@/components/icons/TerminalIcon";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import SnippetEditor from "./SnippetEditor";
import { useState } from "react";
import CustomScrollbar from "@/components/Scrollbar";

export default function AboutSpecsSnippetsBlock() {
    const [lang, setLang] = useState("js");
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    height: "100%",
                    width: "100%",
                    gridTemplate: "minmax(0, 1fr) / minmax(250px, auto) minmax(0, 1fr)",
                    marginRight: "-14px",
                }}
            >
                <AccentedTreeView
                    expandedNodes={["frontend", "backend"]}
                    selectedItem={lang}
                    onItemSelect={(item) => setLang(item.id)}
                >
                    {[
                        {
                            id: "frontend",
                            title: "Frontend",
                            icon: <MarkupIcon />,
                            notSelectable: true,
                            children: [
                                {
                                    id: "js",
                                    title: "JavaScript",
                                    icon: <JSIcon />,
                                },
                                {
                                    id: "ts",
                                    title: "TypeScript",
                                    icon: <TSIcon />,
                                },
                                {
                                    id: "react",
                                    title: "React",
                                    icon: <ReactIcon />,
                                },
                            ],
                        },
                        {
                            id: "backend",
                            title: "Backend",
                            icon: <TerminalIcon />,
                            notSelectable: true,
                            children: [
                                {
                                    id: "php",
                                    title: "PHP",
                                    icon: <PHPIcon />,
                                },
                                {
                                    id: "wp",
                                    title: "Wordpress",
                                    icon: <WordpressIcon />,
                                },
                                {
                                    id: "mysql",
                                    title: "MySQL",
                                    icon: <MySqlIcon />,
                                },
                            ],
                        },
                        {
                            id: "desktop",
                            title: "Desktop",
                            icon: <PersonalVideoIcon />,
                            notSelectable: true,
                            children: [
                                {
                                    id: "cs",
                                    title: "Visual C#",
                                    icon: <CSharpIcon />,
                                },
                                {
                                    id: "wpf",
                                    title: "WPF",
                                    icon: <WindowsIcon />,
                                },
                                {
                                    id: "onec",
                                    title: "1C",
                                    icon: <OneCIcon />,
                                },
                            ],
                        },
                    ]}
                </AccentedTreeView>
                <CustomScrollbar
                    top="5px"
                    bottom="5px"
                    right="4.5px"
                    horizontal={{
                        left: "5px",
                        right: "5px",
                        bottom: "5px",
                    }}
                    sx={{ borderLeft: `1px solid ${theme.palette.divider}`, "& .cm-scroller": { overflow: "visible" } }}
                >
                    <SnippetEditor lang={lang} />
                </CustomScrollbar>
            </Box>
        </>
    );
}
