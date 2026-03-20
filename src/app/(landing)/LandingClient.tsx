"use client";

import CustomScrollbar from "@/shared/ui/Scrollbar";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MainSlide from "@/widgets/landing/MainSlide";
import { AboutSlide } from "@/widgets/landing/AboutSlide";
import GetCloserSlide from "@/widgets/landing/GetCloserSlide";
import { ScrollObservable } from "@/widgets/landing/types";
import type { LandingButton, TitleVariant, InfoBlock, GetCloserItem, FooterItem, ContactItem } from "@/widgets/landing/MainSlide";
import { UiLabelsContext, UiLabelsMap } from "@/entities/ui-labels/model/uiLabelsContext";
import { CategoryLabelsContext, CategoryLabelsMap } from "@/entities/resume/model/categoryLabels";
import { SiteSettingsContext, SiteSettings } from "@/shared/lib/siteSettings";

interface LandingClientProps {
    buttons: LandingButton[];
    titleVariants: TitleVariant[];
    uiLabels: UiLabelsMap;
    categoryLabels: CategoryLabelsMap;
    infoBlocks: InfoBlock[];
    getCloser: GetCloserItem | null;
    footer: FooterItem[];
    contacts: ContactItem[];
    siteSettings: SiteSettings;
}

export default function LandingClient({ buttons, titleVariants, uiLabels, categoryLabels, infoBlocks, getCloser, footer, contacts, siteSettings }: LandingClientProps) {
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
        <SiteSettingsContext.Provider value={siteSettings}>
        <UiLabelsContext.Provider value={uiLabels}>
        <CategoryLabelsContext.Provider value={categoryLabels}>
        <CustomScrollbar ref={rootRef} className="landing-background-scroll-view" sx={{ width: "100%" }}>
            <Box sx={{ position: "absolute", width: "100%", top: 0, left: 0 }}>
                <MainSlide scrollObservable={scrollObservable} buttons={buttons} titleVariants={titleVariants} contacts={contacts} />
                <AboutSlide scrollObservable={scrollObservable} infoBlocks={infoBlocks} />
                <GetCloserSlide getCloser={getCloser} footer={footer} contacts={contacts} />
            </Box>
        </CustomScrollbar>
        </CategoryLabelsContext.Provider>
        </UiLabelsContext.Provider>
        </SiteSettingsContext.Provider>
    );
}
