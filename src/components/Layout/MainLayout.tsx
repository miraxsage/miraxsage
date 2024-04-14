import { Box, lighten, useTheme } from "@mui/material";
import TopMenu from "./TopMenu";
import BottomBar from "./BottomBar";
import AsideMenu from "./AsideMenu";
import { getThemeColor, useThemeColor } from "../contexts/Theme";
import { useNavigation } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const navigation = useNavigation();
    console.log("state", navigation.state);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode == "dark";
    const splashScreen = false;
    const glowColor = getThemeColor("layoutGlow", theme);
    return (
        <Box
            sx={{
                [theme.breakpoints.down("md")]: {
                    height: "100%",
                    padding: "25px",
                },
                [theme.breakpoints.up("md")]: {
                    minHeight: "500px",
                    height: "95%",
                    padding: "25px",
                },
                [theme.breakpoints.up("xl")]: {
                    minHeight: "500px",
                    height: "90%",
                },
            }}
            className="container"
        >
            <Box
                sx={{
                    boxShadow: isDarkMode
                        ? `0 0 65px ${glowColor}, 0 0 20px ${glowColor}`
                        : `0 0 95px ${glowColor}, 0 0 20px ${glowColor}`,
                    background: useThemeColor("layoutBackground"),
                    borderColor: splashScreen ? lighten(glowColor, 0.1) : theme.palette.divider,
                    gridTemplateRows: "auto minmax(0, 1fr) auto",
                }}
                className="border rounded-xl w-full h-full overflow-hidden grid"
            >
                <TopMenu />
                <div className="flex overflow-hidden">
                    <AsideMenu />
                    <div className="flex-grow">{children}</div>
                </div>
                <BottomBar />
            </Box>
        </Box>
    );
}
