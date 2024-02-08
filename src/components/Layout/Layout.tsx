import { Box, alpha, lighten, useTheme } from "@mui/material";
import TopMenu from "./TopMenu";
import BottomBar from "./BottomBar";
import AsideMenu from "./AsideMenu";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const theme = useTheme();
    const splashScreen = false;
    const glowColor = alpha(theme.palette.bg.light, 0.5);
    return (
        <Box
            sx={{
                [theme.breakpoints.down("md")]: {
                    height: "100%",
                    padding: "25px",
                },
                [theme.breakpoints.up("md")]: {
                    minHeight: "640px",
                    height: "95%",
                    padding: "25px",
                },
                [theme.breakpoints.up("xl")]: {
                    minHeight: "640px",
                    height: "90%",
                },
            }}
            className="container"
        >
            <Box
                sx={{
                    boxShadow: `0 0 65px ${glowColor}, 0 0 20px ${glowColor}`,
                    borderColor: splashScreen
                        ? lighten(glowColor, 0.1)
                        : theme.palette.divider,
                }}
                className="border rounded-xl w-full h-full overflow-hidden flex flex-col"
            >
                <TopMenu />
                <div className="flex-grow flex">
                    <AsideMenu />
                    <div className="flex-grow">{children}</div>
                </div>
                <BottomBar />
            </Box>
        </Box>
    );
}
