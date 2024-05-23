import CustomScrollbar from "@/components/Scrollbar";
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

export type ScrollObservable = {
    root: HTMLDivElement;
    scrollTop: number;
    totalScroll: number;
    scrollProgress: number;
    increment: number;
    onChange: (observer: (observable: ScrollObservable) => void) => void;
    notify(scrollTop: number, totalScroll: number, increment: number): void;
};

export default function Landing() {
    const rootRef = useRef<HTMLDivElement>();
    const [scrollObservable, setScrollObservable] = useState<ScrollObservable | undefined>();
    useEffect(() => {
        const scrollContainer = rootRef.current?.querySelector(
            ".landing-background-scroll-view [data-overlayscrollbars-contents]"
        );
        if (!scrollContainer) return;
        if (!scrollObservable) {
            const observers: ((observable: ScrollObservable) => void)[] = [];
            let lastScrollPosition = scrollContainer.scrollTop;
            const scrollProgress = (scrollTop: number, totalScroll: number) =>
                Math.round((10000 * Math.round(scrollTop)) / Math.round(totalScroll)) / 100;
            const observable: ScrollObservable = {
                root: rootRef.current!,
                scrollTop: scrollContainer.scrollTop,
                totalScroll: scrollContainer.scrollHeight - scrollContainer.clientHeight,
                increment: 0,
                scrollProgress: scrollProgress(
                    scrollContainer.scrollTop,
                    scrollContainer.scrollHeight - scrollContainer.clientHeight
                ),
                onChange: (observer) => {
                    if (!observers.includes(observer)) observers.push(observer);
                },
                notify(scrollTop, totalScroll, increment) {
                    this.scrollTop = scrollTop;
                    this.totalScroll = totalScroll;
                    this.scrollProgress = scrollProgress(scrollTop, totalScroll);
                    this.increment = increment;
                    observers.forEach((observer) => observer(this));
                },
            };
            const scrollHandler = function () {
                const increment = scrollContainer.scrollTop - lastScrollPosition;
                lastScrollPosition = scrollContainer.scrollTop;
                observable?.notify(
                    scrollContainer.scrollTop,
                    scrollContainer.scrollHeight - scrollContainer.clientHeight,
                    increment
                );
            };
            scrollContainer?.addEventListener("scroll", scrollHandler);
            setScrollObservable(observable);
            return () => scrollContainer?.removeEventListener("scroll", scrollHandler);
        }
    }, []);
    return (
        <CustomScrollbar ref={rootRef} className="landing-background-scroll-view" sx={{ width: "100%" }}>
            <Box sx={{ zIndex: 111, right: 0, position: "fixed" }}>{scrollObservable?.scrollProgress} %</Box>
            <Box sx={{ position: "absolute", width: "100%", top: 0, left: 0 }}>
                <MainSlide scrollObservable={scrollObservable} />
                <AboutSlide scrollObservable={scrollObservable} />
                <GetCloserSlide />
            </Box>
        </CustomScrollbar>
    );
}
