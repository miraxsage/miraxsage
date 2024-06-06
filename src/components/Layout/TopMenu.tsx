import AccentedTabs, { AccentedTabProps } from "../AccentedTabs";
import { HorizontalPanelButton } from "@/components/PanelButtons";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, alpha, useTheme } from "@mui/material";
import { getThemeColor, useThemeColor } from "../contexts/Theme";
import __ from "@/utilities/transtation";
import { useLocation, useNavigate } from "react-router-dom";
import { useSiteMapVisibility } from "@/store/appearanceSlice";

export default function TopMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
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
            <AccentedTabs underline={false} mode="full" onTabSelect={onTabSelect}>
                {["miraxsage", "about", "projects", "interact"].map((id) => ({
                    id,
                    title: `_${__(id)}`,
                    active: location.pathname.startsWith(`/${id}`),
                }))}
            </AccentedTabs>
        </Box>
    );
}
