import AccentedTabs, { AccentedTabProps } from "../AccentedTabs";
import { HorizontalPanelButton } from "@/components/PanelButtons";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import { useThemeColor } from "../contexts/Theme";
import __ from "@/utilities/transtation";
import { useLocation, useNavigate } from "react-router-dom";

export default function TopMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const onTabChanged = (tab: AccentedTabProps) => {
        navigate(`/${tab.id == "miraxsage" ? "" : tab.id}`);
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
            <HorizontalPanelButton iconMode={true}>
                <MenuIcon />
            </HorizontalPanelButton>
            <AccentedTabs underline={false} mode="full" onChange={onTabChanged}>
                {["miraxsage", "profile", "about", "projects", "interact"].map(
                    (id) => ({
                        id,
                        title: `_${__(id)}`,
                        active: location.pathname.startsWith(`/${id}`),
                    })
                )}
            </AccentedTabs>
        </Box>
    );
}
