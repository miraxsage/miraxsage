import AccentedTabs, { AccentedTabProps } from "../AccentedTabs";
import { HorizontalPanelButton } from "@/components/PanelButtons";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import { getThemeColor, useThemeColor } from "../contexts/Theme";
import __ from "@/utilities/transtation";
import { useLocation, useNavigate } from "react-router-dom";
import { useSiteMapVisibility } from "@/store/appearanceSlice";
import CustomBreadcrumbs from "../Breadcrumbs";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const breadcrumbsItems = [
    {
        label: "Home",
        icon: <HomeIcon />,
        link: "/",
    },
    {
        label: "About",
        icon: <AssignmentIndIcon />,
        link: "/about",
    },
    {
        label: "Projects",
        icon: <RocketLaunchIcon />,
        link: "/projects",
    },
    {
        label: "Interact",
        icon: <CallIcon />,
        link: "/interact",
    },
];

function MobileRootBreadcrumb() {
    const currentItem = breadcrumbsItems.find((bc) => bc.link != "/" && location.pathname.startsWith(bc.link));
    const theme = useTheme();
    if (!currentItem) return;
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
                    label: __(currentItem.label),
                    link: currentItem.link,
                    subitems: breadcrumbsItems
                        .filter((bc) => bc != currentItem)
                        .map((bc) => ({ ...bc, label: __(bc.label) })),
                },
            ]}
        </CustomBreadcrumbs>
    );
}

export default function TopMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const siteMapVisibility = useSiteMapVisibility();

    const onTabSelect = (tab: AccentedTabProps) => {
        if (siteMapVisibility.shown) {
            siteMapVisibility.update("collapsed");
            setTimeout(() => navigate(`/${tab.id == "miraxsage" ? "" : tab.id}`), 300);
        } else navigate(`/${tab.id == "miraxsage" ? "" : tab.id}`);
    };

    return (
        <Box
            component="header"
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: useThemeColor("barBackground"),
            }}
            className="flex"
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
                <MobileRootBreadcrumb />
            ) : (
                <AccentedTabs underline={false} mode="full" onTabSelect={onTabSelect}>
                    {["miraxsage", "about", "projects", "interact"].map((id) => ({
                        id,
                        title: `_${__(id)}`,
                        active: location.pathname.startsWith(`/${id}`),
                    }))}
                </AccentedTabs>
            )}
        </Box>
    );
}
