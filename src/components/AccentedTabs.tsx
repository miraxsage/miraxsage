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
import CloseIcon from "@mui/icons-material/Close";

export interface AccentedTabsProps {
    mode?: "full" | "squeezed" | "icons";
    size?: "large" | "small";
    accentMode?: "regular" | "primaryStrong";
    orientation?: "horizontal" | "vertical";
    activeTab?: string | number | null;
    closable?: boolean;
    children: AccentedTabProps[];
    underline?: boolean;
    sx?: SxProps<Theme>;
    onTabSelect?: (tab: AccentedTabProps) => void;
    onTabClose?: (tab: AccentedTabProps) => void;
}
export type AccentedTabProps = AtLeastOneImportantFieldFromGiven<
    {
        id: string | number;
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
    size = "large",
    accentMode = "regular",
    orientation = "horizontal",
    activeTab,
    underline = true,
    children,
    sx,
    onTabSelect,
    onTabClose,
}: AccentedTabsProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode == "dark";
    const subAccentedColor = isDarkMode
        ? theme.palette.secondary.light
        : theme.palette.secondary.dark;
    const accentedColor =
        accentMode == "primaryStrong"
            ? subAccentedColor
            : isDarkMode
            ? theme.palette.primary.main
            : theme.palette.primary.dark;

    let tabFromProps = children.findIndex((c) => c.active);
    if (tabFromProps < 0) tabFromProps = 0;

    // eslint-disable-next-line prefer-const
    let [tab, setTab] = useState(tabFromProps);
    // if there is onChange handler prop, then it implies current tab state is being controlled from outside by pointing current tab in props
    if (onTabSelect) tab = tabFromProps;
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
        if (accentMode == "primaryStrong") return;
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
        tabProps: AccentedTabProps,
        id: number,
        theme: Theme,
        accentedColor: string,
        subAccentedColor: string
    ) => {
        const { title, icon } = tabProps;
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
                    color: getThemeColor(
                        accentMode == "primaryStrong"
                            ? "regularText"
                            : "tabRegularText",
                        theme
                    ),
                    maxWidth: active || fullMode ? "360px" : "65px",
                    minWidth:
                        orientation == "vertical"
                            ? "0"
                            : active || fullMode
                            ? "90px"
                            : "65px",
                    minHeight: size == "large" ? "55px" : "0px",
                    padding:
                        size == "large"
                            ? orientation == "vertical"
                                ? "12px 18px"
                                : "12px 22px"
                            : onTabClose
                            ? "7px 6px 9px 15px"
                            : "7px 15px 9px 15px",
                    transition: `color 0.3s, background 0.2s ease-in-out ${
                        accentMode == "primaryStrong" ? "0s" : "0.1s"
                    }`,
                    ...(orientation == "horizontal"
                        ? {
                              borderRightWidth: "1px",
                              borderRightStyle: "solid",
                              borderRightColor: "divider",
                              ...(accentMode == "primaryStrong"
                                  ? {}
                                  : {
                                        "&.Mui-selected:hover::before": {
                                            content: '""',
                                            width: "50%",
                                            position: "absolute",
                                            left: 0,
                                            bottom: 0,
                                            height: "2px",
                                            background: subAccentedColor,
                                        },
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            width: 0,
                                            background: accentedColor,
                                        },
                                    }),
                          }
                        : {
                              "&::after": {
                                  content: '""',
                                  position: "absolute",
                                  right: 0,
                                  height: 0,
                                  background: accentedColor,
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
                        backgroundColor: getThemeColor(
                            accentMode == "primaryStrong"
                                ? "regularHoverBg"
                                : "tabHoverBg",
                            theme
                        ),
                        color: getThemeColor(
                            accentMode == "primaryStrong"
                                ? "regularText"
                                : "tabHoverText",
                            theme
                        ),
                    },
                    "&.Mui-selected": {
                        color: getThemeColor(
                            accentMode == "primaryStrong"
                                ? "secondaryHoverText"
                                : "tabActiveText",
                            theme
                        ),
                        backgroundColor:
                            accentMode == "primaryStrong"
                                ? getThemeColor("secondaryBg", theme)
                                : "transparent",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor:
                            accentMode == "primaryStrong"
                                ? getThemeColor("secondaryHoverBg", theme)
                                : "transparent",
                    },
                    "&.Mui-selected::after": {
                        width: orientation == "horizontal" ? "100%" : "2px",
                        height: orientation == "vertical" ? "100%" : "2px",
                        transition: "all 0.2s",
                        transitionDelay: "0.15s",
                    },
                    "&:hover .MuiTab-closeBtn": {
                        opacity: 0.6,
                    },
                    "&:hover .MuiTab-closeBtn:hover": {
                        opacity: 1,
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
                        {onTabClose && (
                            <CloseIcon
                                className="MuiTab-closeBtn"
                                sx={{
                                    opacity: 0,
                                    fontSize: "20px",
                                    marginLeft: "4px",
                                    transition: "color 0.3s, opacity 0.2s",
                                    "&:hover": {
                                        color: accentedColor,
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onTabClose(tabProps);
                                }}
                            />
                        )}
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
                    accentMode != "primaryStrong" &&
                    updateHoverIndicator(e.target as Element, id)
                }
                onMouseLeave={onTabMouseOut}
            />
        );
    };

    const onActiveTabChanged = (
        event: React.SyntheticEvent<Element, Event>,
        tabNum: number
    ) => {
        if ((event.target as HTMLElement).closest(".MuiTab-closeBtn")) return;
        const tabProps = children[tabNum];
        if (!tabProps) return;
        if (tabProps.notTogglable == true) {
            if (tabProps.onClick) tabProps.onClick(tabProps);
            return;
        }
        if (onTabSelect) onTabSelect(tabProps);
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
                value={
                    activeTab
                        ? children.findIndex((c) => c.id == activeTab)
                        : tab
                }
                onChange={onActiveTabChanged}
                sx={{
                    "& .MuiTabs-indicator": {
                        background: accentedColor,
                        opacity: activeTabIndicatorHidden ? 0 : 1,
                        zIndex: 1,
                    },
                    "& .MuiTabs-flexContainer": {
                        position: "relative",
                        zIndex: 2,
                    },
                    ...(size == "small" ? { minHeight: "0px" } : {}),
                    ...sx,
                }}
            >
                {children.map((item, i) =>
                    generateTab(
                        item,
                        i + 1,
                        theme,
                        accentedColor,
                        subAccentedColor
                    )
                )}
                {accentMode != "primaryStrong" && (
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
                            style={{
                                background: isDarkMode
                                    ? theme.palette.secondary.light
                                    : theme.palette.secondary.dark,
                            }}
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
                )}
            </Tabs>
        </Box>
    );
}
