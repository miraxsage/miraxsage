"use client";

import AccentedTabs, { AccentedTabProps } from "@/shared/ui/AccentedTabs";
import { HorizontalPanelButton } from "@/shared/ui/PanelButtons";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import { getThemeColor, useThemeColor } from "@/shared/lib/theme";
import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { usePathname, useRouter } from "next/navigation";
import { useSiteMapVisibility } from "@/shared/lib/store/appearanceSlice";
import CustomBreadcrumbs from "@/shared/ui/Breadcrumbs";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonIcon from "@mui/icons-material/Person";
import type { SvgIconComponent } from "@mui/icons-material";

export interface HeaderItem {
    id: number;
    label_en: string;
    label_ru: string;
    icon: string;
    url: string;
}

const ICON_MAP: Record<string, SvgIconComponent> = {
    AssignmentIndIcon,
    PersonIcon,
    RocketLaunchIcon,
    HomeIcon,
    CallIcon,
};

function MobileRootBreadcrumb({ headerItems }: { headerItems: HeaderItem[] }) {
    const pathname = usePathname();
    const theme = useTheme();
    const router = useRouter();
    const t = useUiLabels();
    const breadcrumbsItems = [
        { label: t("Home"), icon: <HomeIcon />, link: "/" },
        ...headerItems.map((item) => {
            const IconComp = ICON_MAP[item.icon];
            return {
                label: t(item.label_en),
                icon: IconComp ? <IconComp /> : undefined,
                link: item.url,
            };
        }),
    ];

    const currentItem = breadcrumbsItems.find((bc) => bc.link != "/" && pathname.startsWith(bc.link));
    if (!currentItem) return null;
    return (
        <CustomBreadcrumbs
            sx={{
                padding: "6px 8px",
                margin: 0,
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                "& .MuiChip-root": {
                    background: "transparent",
                    "&:hover": {
                        background: alpha(theme.palette.divider, 0.3),
                    },
                },
            }}
        >
            {[
                {
                    label: currentItem.label,
                    onClick: () => {
                        if (currentItem.link == "/projects" && pathname != currentItem.link) {
                            router.push(currentItem.link);
                            return false;
                        }
                    },
                    subitems: breadcrumbsItems
                        .filter((bc) => bc != currentItem),
                },
            ]}
        </CustomBreadcrumbs>
    );
}

export default function TopMenu({ headerItems }: { headerItems: HeaderItem[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const siteMapVisibility = useSiteMapVisibility();
    const t = useUiLabels();

    const onTabSelect = (tab: AccentedTabProps) => {
        if (siteMapVisibility.shown) {
            siteMapVisibility.update("collapsed");
            setTimeout(() => router.push(`/${tab.id == "miraxsage" ? "" : tab.id}`), 300);
        } else router.push(`/${tab.id == "miraxsage" ? "" : tab.id}`);
    };

    const tabs = [
        { id: "miraxsage", title: "_Miraxsage", active: false },
        ...headerItems.map((item) => ({
            id: item.url.replace("/", ""),
            title: `_${t(item.label_en)}`,
            active: pathname.startsWith(item.url),
        })),
    ];

    return (
        <Box
            component="header"
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: useThemeColor("barBackground"),
                "@media (max-height: 450px)": {
                    "& button": {
                        padding: "5px 15px",
                        minHeight: "38px",
                    },
                    "& .MuiTabs-root": {
                        minHeight: 0,
                    },
                },
                display: "flex",
            }}
        >
            <HorizontalPanelButton
                iconMode={true}
                onClick={siteMapVisibility.toggle}
                sx={{
                    transition: "all 0.4s",
                    ...(siteMapVisibility.shown
                        ? {
                              "&.MuiButton-root": {
                                  color: getThemeColor("accentedText", theme),
                                  backgroundColor: alpha(getThemeColor("accentedBg", theme), 0.07),
                                  "&:hover": {
                                      backgroundColor: getThemeColor("accentedHoverBg", theme),
                                      color: getThemeColor("accentedHoverText", theme),
                                  },
                              },
                          }
                        : {}),
                }}
            >
                <MenuIcon />
            </HorizontalPanelButton>
            {smScreen ? (
                <MobileRootBreadcrumb headerItems={headerItems} />
            ) : (
                <AccentedTabs underline={false} mode="full" onTabSelect={onTabSelect}>
                    {tabs}
                </AccentedTabs>
            )}
        </Box>
    );
}
