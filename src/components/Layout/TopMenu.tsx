import AccentedTabs from "@/components/AccentedTabs";
import { HorizontalPanelButton } from "@/components/PanelButtons";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import { useThemeColor } from "../contexts/Theme";
import __ from "@/utilities/transtation";

export default function TopMenu() {
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
            <AccentedTabs underline={false} mode="full">
                {[
                    "_miraxsage",
                    "_" + __("profile"),
                    "_" + __("about"),
                    "_" + __("projects"),
                    "_" + __("interact"),
                ].map((id) => ({
                    title: id,
                }))}
            </AccentedTabs>
        </Box>
    );
}
