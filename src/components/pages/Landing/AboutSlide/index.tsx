import { getThemeColor } from "@/components/contexts/Theme";
import { mix } from "@/utilities/colors";
import { Box, useTheme } from "@mui/material";
import CodeBackground from "../CodeBackground";
import FloatingLine from "../FloatingLine";
import HelloBlock from "./HelloBlock";
import { useLandingColor } from "..";
import { useColorMode } from "@/store/appearanceSlice";
import AboutMeBlock from "./AboutMeBlock";
import SkillsBlock from "./SkillsBlock";
import ExperienceBlock from "./ExperienceBlock";
import TeamBlock from "./TeamBlock";

type AboutSlideProps = {
    scrollProgress: number;
};

export function AboutSlide({ scrollProgress }: AboutSlideProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const layoutBackgroundColor = getThemeColor("layoutBackground", theme);
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: 0,
                // top:
                //     scrollProgress < 20
                //         ? -1 * scrollProgress * 50 + "px"
                //         : Math.min(0, -1 * 20 * 50 + (scrollProgress - 20) * 25) + "px",
                minHeight: "calc(100vh + 0.1763269807 * 100vw)",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    overflow: "hidden",
                    height: "150%",
                    transformOrigin: "0% 0%",
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
                        maxHeight: "calc(0.1763269807 * 100vw * 1.3)",
                        textAlign: "right",
                        right: "-1%",
                        transformOrigin: "100% 0%",
                        transform: "skew(0, 10deg)",
                    }}
                />
            </Box>
            <CodeBackground
                gradientOrientation="toTop"
                sx={{
                    top: "unset",
                    bottom: 0,
                    maxHeight: "calc(0.1763269807 * 100vw * 1.3)",
                    left: "-1%",
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
                    minHeight: "calc(max(100dvh, 1000px))",
                    margin: "0 auto",
                }}
            >
                {/* <HelloBlock /> */}
                <AboutMeBlock />
            </Box>
        </Box>
    );
}
