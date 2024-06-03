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
import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import TerminalIcon from "@/components/icons/TerminalIcon";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import SnippetEditor from "./SnippetEditor";
import { useLayoutEffect, useRef, useState } from "react";
import CustomScrollbar from "@/components/Scrollbar";
import { motion } from "framer-motion";
import CategoriesToolbar from "@/components/CategoriesToolbar";
import { getThemeColor } from "@/components/contexts/Theme";

export default function AboutSpecsSnippetsBlock() {
    const [lang, setLang] = useState("js");
    const theme = useTheme();
    const lessLg = useMediaQuery(theme.breakpoints.down("lg"));
    const [catsCollapsed, setCatsCollapsed] = useState(lessLg);
    const [changeExpandedNodes, setChangeExpandedNodes] = useState<string[] | undefined>();
    const lastScreenLessLgRef = useRef(lessLg);
    const catsCollapsedBeforeResizeRef = useRef(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        if (changeExpandedNodes) setChangeExpandedNodes(undefined);
        if (lessLg != lastScreenLessLgRef.current) {
            lastScreenLessLgRef.current = lessLg;
            if (lessLg) {
                catsCollapsedBeforeResizeRef.current = catsCollapsed;
                setCatsCollapsed(true);
            } else setCatsCollapsed(catsCollapsedBeforeResizeRef.current);
        }
    });

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    height: "100%",
                    width: "100%",
                    gridTemplate: "minmax(0, 1fr) / auto minmax(0, 1fr)",
                    //marginRight: "-14px",
                }}
            >
                <motion.div
                    onClick={() => setCatsCollapsed(true)}
                    animate={{
                        opacity: !catsCollapsed && lessLg ? 1 : 0,
                        visibility: !catsCollapsed && lessLg ? "visible" : "collapse",
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                            visibility: { delay: !catsCollapsed ? 0 : 0.3 },
                        },
                    }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 3,
                        background: alpha(getThemeColor("barBackground", theme), 0.8),
                        backdropFilter: "blur(3px)",
                    }}
                ></motion.div>
                <Box sx={{ position: "relative" }}>
                    {lessLg && <Box sx={{ width: "39px", height: "100%" }}></Box>}
                    <motion.div
                        initial={false}
                        animate={{
                            width: catsCollapsed ? "39px" : "200px",
                            borderRightWidth: lessLg && !catsCollapsed ? 1 : 0,
                        }}
                        style={{
                            ...(lessLg
                                ? {
                                      position: lessLg ? "absolute" : "static",
                                      top: 0,
                                      left: 0,
                                      zIndex: 3,
                                      height: "100%",
                                  }
                                : {}),
                            display: "grid",
                            gridTemplateRows: "auto minmax(0, 1fr)",
                            clipPath: "xywh(0 0 calc(100% + 1.5px) 100%)",
                            background: getThemeColor("layoutBackground", theme),
                            borderColor: theme.palette.divider,
                        }}
                    >
                        <CategoriesToolbar
                            collapsed={catsCollapsed}
                            onRevealCollapse={(collapse) => setCatsCollapsed(collapse)}
                            onFold={() => {
                                setChangeExpandedNodes([]);
                            }}
                            onUnfold={() => {
                                setChangeExpandedNodes(["frontend", "backend", "desktop"]);
                            }}
                        />
                        <CustomScrollbar right="2px" top="2px" bottom="3px">
                            <AccentedTreeView
                                intend={catsCollapsed ? "small" : "regular"}
                                expandedNodes={changeExpandedNodes}
                                initiallyExpandedNodes={["frontend", "backend"]}
                                selectionMode="single"
                                selectedItems={lang}
                                onItemsSelect={(item) => setLang(item.id)}
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
                        </CustomScrollbar>
                    </motion.div>
                </Box>
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
