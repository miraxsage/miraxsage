import { Box, useTheme } from "@mui/material";
import TopMenu from "./TopMenu";
import BottomBar from "./BottomBar";
import AsideMenu from "./AsideMenu";
import { getThemeColor } from "../contexts/Theme";
import { useLocation } from "react-router-dom";
import { useScreenMode } from "@/store/appearanceSlice";
import classes from "classnames";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode == "dark";
    const glowColor = getThemeColor("layoutGlow", theme);
    const screenMode = useScreenMode();
    const location = useLocation();
    return location.pathname == "/" ? (
        children
    ) : (
        <Box
            sx={{
                ...(screenMode.full
                    ? {
                          height: "100dvh",
                      }
                    : {
                          maxHeight: "100dvh",
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
                      }),
            }}
            className={classes({ container: screenMode.window })}
        >
            <Box
                sx={{
                    boxShadow: isDarkMode
                        ? `0 0 65px ${glowColor}, 0 0 20px ${glowColor}`
                        : `0 0 95px ${glowColor}, 0 0 20px ${glowColor}`,
                    background: getThemeColor("layoutBackground", theme),
                    borderColor: theme.palette.divider,
                    gridTemplateRows: "auto minmax(0, 1fr) auto",
                    gridTemplateColumns: "minmax(0, 1fr)",
                    width: screenMode.window ? "auto" : "100dvw",
                }}
                className={classes("overflow-hidden grid h-full", { "border rounded-xl w-full": screenMode.window })}
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
