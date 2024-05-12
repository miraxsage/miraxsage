import { getThemeColor } from "@/components/contexts/Theme";
import { mix } from "@/utilities/colors";
import { Box, useTheme } from "@mui/material";
import CodeBackground from "../CodeBackground";
import FloatingLine from "../FloatingLine";
import HelloBlock from "./HelloBlock";
import { useLandingColor } from "..";
import { useColorMode } from "@/store/appearanceSlice";

export function AboutSlide() {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const layoutBackgroundColor = getThemeColor("layoutBackground", theme);
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: 0,
                minHeight: "135vh",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "-16%",
                    width: "100%",
                    overflow: "hidden",
                    height: "150%",
                    transform: "skew(0, -10deg)",
                    borderTop: `1px solid ${theme.palette.divider}`,
                    background: `linear-gradient(200deg, ${mix(
                        layoutBackgroundColor,
                        useLandingColor(isDarkMode ? "accentA" : "accentB"),
                        0.08
                    )}, ${layoutBackgroundColor} 50%)`,
                }}
            >
                <Box sx={{ width: "100%", height: "100%", opacity: 0.7 }}>
                    <FloatingLine shift={-25} />
                    <FloatingLine shift={-10} />
                    <FloatingLine shift={0} />
                    <FloatingLine shift={15} />
                    <FloatingLine shift={25} />
                </Box>
                <CodeBackground
                    sx={{
                        left: "unset",
                        maxHeight: "40vh",
                        right: "-5%",
                        transform: "translateY(-200px) skew(0, 10deg)",
                    }}
                />
            </Box>
            <CodeBackground
                gradientOrientation="toTop"
                sx={{
                    top: "unset",
                    bottom: 0,
                    maxHeight: "40vh",
                    left: "-5%",
                    transform: "translateY(0%)",
                }}
            />
            <Box
                className="container"
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100dvh",
                    margin: "0 auto",
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <HelloBlock />
                </Box>
            </Box>
        </Box>
    );
}
