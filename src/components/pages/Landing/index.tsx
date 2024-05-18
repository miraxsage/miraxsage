import CustomScrollbar from "@/components/Scrollbar";
import { debounce } from "@/utilities/common";
import { Box, Theme, lighten, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MainSlide from "./MainSlide";
import { AboutSlide } from "./AboutSlide";
import GetCloserSlide from "./GetCloserSlide";

type LandingColor = "accentA" | "accentAPale" | "accentB" | "contrast" | "noteless";

// eslint-disable-next-line react-refresh/only-export-components
export function getLandingColor(color: LandingColor, theme: Theme): string {
    const isDarkMode = theme.palette.mode == "dark";
    if (color == "accentA") return isDarkMode ? "#2dcab2" : "#5f43b5";
    if (color == "accentAPale") return lighten(getLandingColor("accentA", theme), 0.8);
    if (color == "accentB") return isDarkMode ? "#2bc979" : "#4178cb";
    if (color == "contrast") return isDarkMode ? "#ffffff" : "#8f92a1";
    if (color == "noteless") return theme.palette.divider;
    return "#ff0000";
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLandingColor(color: LandingColor) {
    const theme = useTheme();
    return getLandingColor(color, theme);
}

export default function Landing() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const rootRef = useRef<HTMLDivElement>();
    useEffect(() => {
        const scrollContainer = rootRef.current?.querySelector(
            ".landing-background-scroll-view [data-overlayscrollbars-contents]"
        );
        if (!scrollContainer) return;
        const scrollHandler = function () {
            debounce(
                "landingScrollHandler",
                () =>
                    setScrollProgress(
                        Math.round(
                            (10000 * Math.round(scrollContainer.scrollTop)) /
                                Math.round(scrollContainer.scrollHeight - scrollContainer.clientHeight)
                        ) / 100
                    ),
                40
            );
        };
        scrollContainer?.addEventListener("scroll", scrollHandler);
        return () => scrollContainer?.removeEventListener("scroll", scrollHandler);
    }, []);
    return (
        <CustomScrollbar ref={rootRef} className="landing-background-scroll-view" sx={{ width: "100%" }}>
            <Box sx={{ height: "500%" }}>
                <Box sx={{ zIndex: 111, right: 0, position: "fixed" }}>{scrollProgress} %</Box>
                <Box sx={{ position: "absolute", width: "100%", overflow: "hidden", top: 0, left: 0 }}>
                    <MainSlide scrollProgress={scrollProgress} />
                    <AboutSlide scrollProgress={scrollProgress} />
                    <GetCloserSlide />
                </Box>
            </Box>
        </CustomScrollbar>
    );
}
