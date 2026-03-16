"use client";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import { Box, alpha, keyframes, useMediaQuery, useTheme } from "@mui/material";
import LogoIcon from "@/shared/icons/Logo";
import SnippetEditor from "./SnippetEditor";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import CustomScrollbar from "@/shared/ui/Scrollbar";
import { motion } from "framer-motion";
import CategoriesToolbar from "@/shared/ui/CategoriesToolbar";
import { getThemeColor } from "@/shared/lib/theme";
import { getIconComponent } from "@/shared/lib/iconMap";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";

const loaderBars1 = keyframes({
    "0%, 100%": { backgroundSize: "20% 100%" },
    "33%, 66%": { backgroundSize: "20% 40%" },
});
const loaderBars2 = keyframes({
    "0%, 33%": { backgroundPosition: "0 0, 50% 100%, 100% 0" },
    "66%, 100%": { backgroundPosition: "0 100%, 50% 0, 100% 100%" },
});

interface SnippetData {
    id: number;
    technology_id: number;
    tech_name_en: string;
    tech_name_ru: string;
    tech_icon: string;
    language: string;
    sort_order: number;
    code: string;
}

interface CategoryData {
    id: number;
    slug: string;
    icon: string;
    label_en: string;
    label_ru: string;
    sort_order: number;
    snippets: SnippetData[];
}

export default function AboutSpecsSnippetsBlock() {
    const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const { lang } = useLanguage();
    const lessLg = useMediaQuery(theme.breakpoints.down("lg"));
    const [catsCollapsed, setCatsCollapsed] = useState(lessLg);
    const [changeExpandedNodes, setChangeExpandedNodes] = useState<string[] | undefined>();
    const lastScreenLessLgRef = useRef(lessLg);
    const catsCollapsedBeforeResizeRef = useRef(false);

    useEffect(() => {
        fetch("/api/snippets")
            .then((r) => r.json())
            .then((data: CategoryData[]) => {
                setCategories(data);
                // Select first snippet by default
                for (const cat of data) {
                    if (cat.snippets.length > 0) {
                        setSelectedSnippetId(String(cat.snippets[0].id));
                        break;
                    }
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const allSnippetsMap = useMemo(() => {
        const map = new Map<string, SnippetData>();
        for (const cat of categories) {
            for (const s of cat.snippets) {
                map.set(String(s.id), s);
            }
        }
        return map;
    }, [categories]);

    const selectedSnippet = selectedSnippetId ? allSnippetsMap.get(selectedSnippetId) : null;

    const treeItems = useMemo(() => {
        return categories.map((cat) => {
            const CatIcon = getIconComponent(cat.icon);
            return {
                id: `cat_${cat.id}`,
                title: lang === "ru" ? cat.label_ru : cat.label_en,
                icon: <CatIcon />,
                notSelectable: true,
                children: cat.snippets.map((s) => {
                    const TechIcon = getIconComponent(s.tech_icon);
                    return {
                        id: String(s.id),
                        title: lang === "ru" ? (s.tech_name_ru || s.tech_name_en) : s.tech_name_en,
                        icon: <TechIcon />,
                    };
                }),
            };
        });
    }, [categories, lang]);

    const categoryIds = useMemo(() => categories.map((c) => `cat_${c.id}`), [categories]);

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

    if (loading) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    alignItems: "center",
                    color: theme.palette.mode === "dark" ? "#2c2f3e" : "#d1d1d1",
                }}>
                    <Box sx={{ "& svg": { width: 45, height: 45 } }}>
                        <LogoIcon />
                    </Box>
                    <Box sx={{
                        width: "25px",
                        aspectRatio: "5/4",
                        background: "no-repeat linear-gradient(currentColor 0 0), no-repeat linear-gradient(currentColor 0 0), no-repeat linear-gradient(currentColor 0 0)",
                        animation: `${loaderBars1} 1s infinite, ${loaderBars2} 1s infinite`,
                    }} />
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    height: "100%",
                    width: "100%",
                    gridTemplate: "minmax(0, 1fr) / auto minmax(0, 1fr)",
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
                                setChangeExpandedNodes(categoryIds);
                            }}
                        />
                        <CustomScrollbar right="2px" top="2px" bottom="3px">
                            <AccentedTreeView
                                intend={catsCollapsed ? "small" : "regular"}
                                expandedNodes={changeExpandedNodes}
                                initiallyExpandedNodes={categoryIds.slice(0, 2)}
                                selectionMode="single"
                                selectedItems={selectedSnippetId ?? ""}
                                onItemsSelect={(item) => setSelectedSnippetId(item.id)}
                            >
                                {treeItems}
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
                    sx={{
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        "& .cm-scroller": { overflow: "visible" },
                        fontSize: "1.07rem",
                        [theme.breakpoints.down("sm")]: {
                            fontSize: "1rem",
                        },
                    }}
                >
                    {selectedSnippet ? (
                        <SnippetEditor code={selectedSnippet.code} language={selectedSnippet.language} />
                    ) : null}
                </CustomScrollbar>
            </Box>
        </>
    );
}
