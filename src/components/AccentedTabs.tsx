import { Box, Tab, Tabs, lighten, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import classes from "classnames";
import { areEqualShallow } from "@/utilities/Common";

export interface AccentedTabsProps {
    mode?: "full" | "squeezed";
    children: AccentedTabProp[];
    underline?: boolean;
}
export interface AccentedTabProp {
    title: string;
    icon?: ReactNode;
}

export default function AccentedTabs({
    mode = "full",
    underline = true,
    children,
}: AccentedTabsProps) {
    const theme = useTheme();

    const [tab, setTab] = useState(1);
    const tabsRef = useRef<HTMLDivElement | null>(null);

    const [hoverIndicator, setHoverIndicator] = useState({
        left: 0,
        width: 0,
        hovered: false,
        initial: true,
    });
    const updateHoverIndicator = (tabElement?: Element) => {
        if (!tabElement) return;
        const menu = tabElement.closest(".anim-tabs_container");
        if (!menu) throw new Error("Anchored menu is not found");
        const tabBox = tabElement.getBoundingClientRect();
        const menuBox = menu?.getBoundingClientRect();
        const newHoverIndicatorState = {
            left: tabBox.left - menuBox.left,
            width: tabBox.width,
            hovered: true,
            initial: hoverIndicator.initial
                ? hoverIndicator.hovered
                    ? false
                    : true
                : false,
        };
        if (!areEqualShallow(hoverIndicator, newHoverIndicatorState))
            setHoverIndicator(newHoverIndicatorState);
    };
    const onTabMouseOut = () => {
        setHoverIndicator({ ...hoverIndicator, hovered: false, initial: true });
    };
    useEffect(() => {
        requestAnimationFrame(() => {
            const hoveredTab =
                tabsRef.current?.querySelector(".MuiTab-root:hover") ??
                undefined;
            updateHoverIndicator(hoveredTab);
        });
    });
    const [tabIndicatorHidden, setTabIndicatorHidden] = useState(false);
    useEffect(() => {
        let defrozeTimeoutId: NodeJS.Timeout | null = null;
        const onResize = () => {
            if (defrozeTimeoutId) clearTimeout(defrozeTimeoutId);
            setTabIndicatorHidden(true);
            defrozeTimeoutId = setTimeout(
                () => setTabIndicatorHidden(false),
                500
            );
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    const generateTab = (label: string, icon: ReactNode, id: number) => {
        const active = id == tab;
        const fullMode = mode == "full";
        const iconMaxSize = active || !fullMode ? "30px" : "0";
        const iconMRight = active || fullMode ? "8px" : "0";
        const labelMaxSize = fullMode ? "100%" : active ? "100%" : "0";
        return (
            <Tab
                sx={{
                    color: !active && !fullMode ? "#aeadb2" : null,
                    minHeight: "48px",
                    maxWidth: active || fullMode ? "360px" : "65px",
                    minWidth: active || fullMode ? "90px" : "65px",
                }}
                label={
                    <motion.div
                        className="overflow-hidden whitespace-nowrap"
                        initial={{ maxWidth: "100%" }}
                        animate={{ maxWidth: labelMaxSize }}
                        transition={{ duration: 0.2 }}
                    >
                        {label}
                    </motion.div>
                }
                icon={
                    icon ? (
                        <motion.div
                            className={classes("overflow-hidden", { active })}
                            initial={{ maxWidth: "100%" }}
                            animate={{
                                maxWidth: iconMaxSize,
                                marginRight: iconMRight,
                            }}
                            transition={{
                                duration: 0.2,
                                delay: active ? 0.2 : 0,
                            }}
                        >
                            {icon}
                        </motion.div>
                    ) : undefined
                }
                iconPosition="start"
                key={"item-" + id}
                id={"item-" + id}
                onMouseEnter={(e) => updateHoverIndicator(e.target as Element)}
                onMouseLeave={onTabMouseOut}
            />
        );
    };

    const setActiveTab = (e: unknown, v: number) => {
        setTab(v);
    };

    return (
        <Box
            className="anim-tabs_container flex-grow"
            sx={{
                borderBottom: underline ? 1 : 0,
                borderColor: "divider",
                position: "relative",
            }}
        >
            <Tabs
                ref={tabsRef}
                className="mb-[-1px]"
                value={tab}
                onChange={setActiveTab}
                sx={{
                    "& .MuiTab-root.Mui-selected:hover::before": {
                        content: '""',
                        width: "50%",
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        height: "2px",
                        background: theme.palette.secondary.main,
                    },
                    "& .MuiTab-root": {
                        minHeight: "55px",
                        borderRightWidth: "1px",
                        borderRightStyle: "solid",
                        borderRightColor: "divider",
                        padding: "12px 22px",
                        transition: "color 0.3s",
                        color: lighten(theme.palette.divider, 0.25),
                    },
                    "& .MuiTab-root.Mui-selected": {
                        color: theme.palette.contrast.light,
                    },
                    "& .MuiTab-root::after": {
                        content: '""',
                        width: "0",
                        position: "absolute",
                        bottom: 0,
                        height: "2px",
                        background: theme.palette.primary.main,
                    },
                    "& .MuiTab-root.Mui-selected::after": {
                        width: "100%",
                        transition: "all 0.2s",
                        transitionDelay: "0.15s",
                    },
                    "& .MuiTabs-indicator": {
                        opacity: tabIndicatorHidden ? 0 : 1,
                    },
                }}
            >
                {children.map((item, i) =>
                    generateTab(item.title, item.icon, i + 1)
                )}
                <motion.div
                    className="absolute bottom-0 h-[2px]"
                    animate={{
                        left: hoverIndicator.left,
                        width: hoverIndicator.width + "px",
                    }}
                    transition={{
                        duration: hoverIndicator.initial ? 0 : 0.3,
                        ease: "easeOut",
                    }}
                >
                    <motion.div
                        className="m-auto h-full"
                        style={{ background: theme.palette.secondary.main }}
                        animate={{
                            width: hoverIndicator.hovered ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.div>
            </Tabs>
        </Box>
    );
}
