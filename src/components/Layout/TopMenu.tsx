import AccentedTabs from "@/components/AccentedTabs";
import PanelButton from "@/components/PanelButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, darken, styled, useTheme } from "@mui/material";

const TopPanelButton = styled(PanelButton)(({ theme }) => ({
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: theme.palette.divider,
}));

export default function TopMenu() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: darken(theme.palette.bg.dark, 0.08),
            }}
            className="flex"
        >
            <TopPanelButton>Miraxsage</TopPanelButton>
            <TopPanelButton>
                <MenuIcon />
            </TopPanelButton>
            <AccentedTabs underline={false} mode="full">
                {["_profile", "_about", "_projects"].map((id) => ({
                    title: id,
                }))}
            </AccentedTabs>
        </Box>
    );
}
