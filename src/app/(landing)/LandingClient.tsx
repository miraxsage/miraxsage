"use client";

import CustomScrollbar from "@/shared/ui/Scrollbar";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MainSlide from "@/widgets/landing/MainSlide";
import { AboutSlide } from "@/widgets/landing/AboutSlide";
import GetCloserSlide from "@/widgets/landing/GetCloserSlide";
import { ScrollObservable } from "@/widgets/landing/types";
import type { LandingButton } from "@/widgets/landing/MainSlide";

interface LandingClientProps {
    buttons: LandingButton[];
}

export default function LandingClient({ buttons }: LandingClientProps) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <CustomScrollbar ref={rootRef} className="landing-background-scroll-view" sx={{ width: "100%" }}>
            <Box sx={{ position: "absolute", width: "100%", top: 0, left: 0 }}>
                <MainSlide scrollObservable={scrollObservable} buttons={buttons} />
                <AboutSlide scrollObservable={scrollObservable} />
                <GetCloserSlide />
            </Box>
        </CustomScrollbar>
    );
}
