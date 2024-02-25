import {
    Box,
    ExtendButtonBase,
    SxProps,
    Tab,
    TabTypeMap,
    Tabs,
    Theme,
    useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import classes from "classnames";
import { areEqualShallow } from "@/utilities/common";
import {
    AddTypeToField,
    AtLeastOneImportantFieldFromGiven,
} from "@/types/common";
import { getThemeColor } from "./contexts/Theme";

export interface AccentedTabsProps {
    mode?: "full" | "squeezed" | "icons";
    orientation?: "horizontal" | "vertical";
    children: AccentedTabProps[];
    underline?: boolean;
    sx?: SxProps<Theme>;
    onChange?: (tab: AccentedTabProps) => void;
}
export type AccentedTabProps = AtLeastOneImportantFieldFromGiven<
    {
        id?: string | number;
        title: string;
        active?: boolean;
        icon: Exclude<
            ReactNode | ((hovered: boolean) => ReactNode),
            null | undefined
        >;
        onClick?: (tab: AccentedTabProps) => void;
        notTogglable?: boolean;
    },
    "title" | "icon"
>;

const IdentifiedTab: ExtendButtonBase<
    TabTypeMap<{ "data-tab-id"?: number | string }>
> = Tab;

export default function AccentedTabs({
    mode = "full",
    orientation = "horizontal",
    underline = true,
    children,
    sx,
    onChange,
}: AccentedTabsProps) {
    const theme = useTheme();

    let tabFromProps = children.findIndex((c) => c.active);
    if (tabFromProps < 0) tabFromProps = 0;

    // eslint-disable-next-line prefer-const
    let [tab, setTab] = useState(tabFromProps);
    // if there is onChange handler prop, then it implies current tab state is being controlled from outside by pointing current tab in props
    if (onChange) tab = tabFromProps;
    const tabsRef = useRef<HTMLDivElement | null>(null);

    // custom feature with mouse-following underscore indicator on tab hovering
    const defaultHoverIndicatorState = {
        id: 0,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        hovered: false,
        initial: true,
    };
    type HoverIndicatorState = AddTypeToField<
        typeof defaultHoverIndicatorState,
        "id",
        string
    >;
    const [hoverIndicator, setHoverIndicator] = useState<HoverIndicatorState>(
        defaultHoverIndicatorState
    );
    const updateHoverIndicator = (tabElement: Element, id: string | number) => {
        if (!tabElement) return;
        const menu = tabElement.closest(".anim-tabs_container");
        if (!menu) throw new Error("Anchored menu is not found");
        const tabBox = tabElement.getBoundingClientRect();
        const menuBox = menu?.getBoundingClientRect();
        const newHoverIndicatorState: HoverIndicatorState = {
            id,
            left: tabBox.left - menuBox.left,
            width: tabBox.width,
            top: tabBox.top - menuBox.top,
            height: tabBox.height,
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
        setHoverIndicator({
            ...hoverIndicator,
            id: 0,
            hovered: false,
            initial: true,
        });
    };
    // fix accidential loosing hovered state after active tab changed rerender and no mouse moved
    useEffect(() => {
        requestAnimationFrame(() => {
            const hoveredTab =
                tabsRef.current?.querySelector(".MuiTab-root:hover") ??
                undefined;
            hoveredTab &&
                updateHoverIndicator(
                    hoveredTab,
                    hoveredTab.getAttribute("data-tab-id") ?? 0
                );
        });
    });

    // hide active tab indicator white window resizing (fix its mui-native position updating with too long delay)
    const [activeTabIndicatorHidden, setActiveTabIndicatorHidden] =
        useState(false);
    useEffect(() => {
        let defrozeTimeoutId: NodeJS.Timeout | null = null;
        const onResize = () => {
            if (defrozeTimeoutId) clearTimeout(defrozeTimeoutId);
            setActiveTabIndicatorHidden(true);
            defrozeTimeoutId = setTimeout(
                () => setActiveTabIndicatorHidden(false),
                500
            );
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const generateTab = (
        { title, icon }: AccentedTabProps,
        id: number,
        theme: Theme
    ) => {
        const active = id == tab;
        const hovered = id == hoverIndicator.id;
        const fullMode = mode == "full";
        const iconMaxSize =
            active || !fullMode || orientation == "vertical" ? "30px" : "0";
        const iconMRight =
            orientation == "vertical" ? 0 : active || fullMode ? "8px" : "0";
        const titleMaxSize = fullMode ? "100%" : active ? "100%" : "0";
        return (
            <IdentifiedTab
                data-tab-id={id}
                sx={{
                    color: getThemeColor("tabRegularText", theme),
                    maxWidth: active || fullMode ? "360px" : "65px",
                    minWidth:
                        orientation == "vertical"
                            ? "0"
                            : active || fullMode
                            ? "90px"
                            : "65px",
                    minHeight: "55px",
                    padding:
                        orientation == "vertical" ? "12px 18px" : "12px 22px",
                    transition: "color 0.3s, background 0.2s ease-in-out 0.1s",
                    ...(orientation == "horizontal"
                        ? {
                              borderRightWidth: "1px",
                              borderRightStyle: "solid",
                              borderRightColor: "divider",
                              "&.Mui-selected:hover::before": {
                                  content: '""',
                                  width: "50%",
                                  position: "absolute",
                                  left: 0,
                                  bottom: 0,
                                  height: "2px",
                                  background: theme.palette.secondary.main,
                              },
                              "&::after": {
                                  content: '""',
                                  position: "absolute",
                                  bottom: 0,
                                  width: 0,
                                  background: theme.palette.primary.main,
                              },
                          }
                        : {
                              "&::after": {
                                  content: '""',
                                  position: "absolute",
                                  right: 0,
                                  height: 0,
                                  background: theme.palette.primary.main,
                              },
                              "&::before": {
                                  content: '""',
                                  width: "50%",
                                  position: "absolute",
                                  left: "25%",
                                  bottom: 0,
                                  height: "1px",
                                  background: theme.palette.divider,
                              },
                              "&:nth-last-of-type(1)::before": {
                                  width: "100%",
                                  left: 0,
                              },
                          }),
                    "&:hover": {
                        backgroundColor: getThemeColor("tabHoverBg", theme),
                        color: getThemeColor("tabHoverText", theme),
                    },
                    "&.Mui-selected": {
                        color: getThemeColor("tabActiveText", theme),
                    },
                    "&.Mui-selected::after": {
                        width: orientation == "horizontal" ? "100%" : "2px",
                        height: orientation == "vertical" ? "100%" : "2px",
                        transition: "all 0.2s",
                        transitionDelay: "0.15s",
                    },
                }}
                label={
                    <motion.div
                        className="overflow-hidden whitespace-nowrap"
                        initial={{ maxWidth: "100%" }}
                        animate={{ maxWidth: titleMaxSize }}
                        transition={{ duration: 0.2 }}
                    >
                        {title}
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
                            {typeof icon == "function" ? icon(hovered) : icon}
                        </motion.div>
                    ) : undefined
                }
                iconPosition="start"
                key={"item-" + id}
                id={"item-" + id}
                onMouseEnter={(e) =>
                    updateHoverIndicator(e.target as Element, id)
                }
                onMouseLeave={onTabMouseOut}
            />
        );
    };

    const onActiveTabChanged = (_event: unknown, tabNum: number) => {
        const tabProps = children[tabNum];
        if (!tabProps) return;
        if (tabProps.notTogglable == true) {
            if (tabProps.onClick) tabProps.onClick(tabProps);
            return;
        }
        if (onChange) onChange(tabProps);
        else setTab(tabNum);
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
                orientation={orientation}
                value={tab}
                onChange={onActiveTabChanged}
                sx={{
                    "& .MuiTabs-indicator": {
                        opacity: activeTabIndicatorHidden ? 0 : 1,
                    },
                    ...sx,
                }}
            >
                {children.map((item, i) => generateTab(item, i + 1, theme))}
                <motion.div
                    className={classes(
                        "absolute flex items-center justify-center",
                        {
                            "bottom-0 h-[2px]": orientation == "horizontal",
                            "right-0 w-[2px]": orientation == "vertical",
                        }
                    )}
                    animate={{
                        ...(orientation == "horizontal"
                            ? {
                                  left: hoverIndicator.left,
                                  width: hoverIndicator.width + "px",
                              }
                            : {
                                  top: hoverIndicator.top,
                                  height: hoverIndicator.height + "px",
                              }),
                    }}
                    transition={{
                        duration: hoverIndicator.initial ? 0 : 0.3,
                        ease: "easeOut",
                    }}
                >
                    <motion.div
                        className={classes({
                            "h-full": orientation == "horizontal",
                            "w-full": orientation == "vertical",
                        })}
                        style={{ background: theme.palette.secondary.main }}
                        animate={{
                            ...(orientation == "horizontal"
                                ? {
                                      width: hoverIndicator.hovered
                                          ? "100%"
                                          : "0%",
                                  }
                                : {
                                      height: hoverIndicator.hovered
                                          ? "100%"
                                          : "0%",
                                  }),
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.div>
            </Tabs>
        </Box>
    );
}
