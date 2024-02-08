import AccentedTabs from "@/components/AccentedTabs";
import { HorizontalPanelButton } from "@/components/PanelButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, darken, useTheme } from "@mui/material";

export default function TopMenu() {
    const theme = useTheme();
    return (
        <Box
            component="header"
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: darken(theme.palette.bg.dark, 0.08),
            }}
            className="flex"
        >
            <HorizontalPanelButton iconMode={true}>
                <MenuIcon />
            </HorizontalPanelButton>
            <AccentedTabs underline={false} mode="full">
                {[
                    "_miraxsage",
                    "_profile",
                    "_about",
                    "_projects",
                    "_interact",
                ].map((id) => ({
                    title: id,
                }))}
            </AccentedTabs>
        </Box>
    );
}
