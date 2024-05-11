import { getThemeColor } from "@/components/contexts/Theme";
import { mix } from "@/utilities/colors";
import { Box, useTheme } from "@mui/material";
import CodeBackground from "../CodeBackground";
import FloatingLine from "../FloatingLine";
import HelloBlock from "./HelloBlock";

export function AboutSlide() {
    const theme = useTheme();
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
                        "#3ec9d2",
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
                        top: "-190px",
                        maxHeight: "calc(350px + 2vw)",
                        right: "-5%",
                        transform: "skew(0, 10deg)",
                    }}
                />
            </Box>
            <Box className="container" sx={{ position: "relative", margin: "0 auto" }}>
                <HelloBlock />
            </Box>
        </Box>
    );
}
