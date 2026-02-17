"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useAsideMenuVisibility, useLanguage, useScreenMode, useViewMode } from "@/shared/lib/store/appearanceSlice";
import { useThemeColor } from "@/shared/lib/theme";
import OverlapedChildrenContainer from "@/shared/ui/OverlapedChildrenContainer";
import { ReactContentProps } from "@/shared/types/react";
import { useEffect, useRef } from "react";

export default function AppContent({ children }: ReactContentProps) {
    useLanguage();
    const theme = useTheme();
    const smallHeight = useMediaQuery("@media (max-height: 500px)");
    const sm = useMediaQuery(theme.breakpoints.down("md")) || smallHeight;
    const asideMenuVisibility = useAsideMenuVisibility();
    const screenMode = useScreenMode();
    const viewMode = useViewMode();
    const appearanceBeforeSmallScreen = useRef({
        asideMenuVisibility: asideMenuVisibility.value,
        screenMode: screenMode.value,
        viewMode: viewMode.value,
    });
    useEffect(() => {
        if (sm) {
            appearanceBeforeSmallScreen.current.asideMenuVisibility = asideMenuVisibility.value;
            appearanceBeforeSmallScreen.current.screenMode = screenMode.value;
            appearanceBeforeSmallScreen.current.viewMode = viewMode.value;
        }
        asideMenuVisibility.update(sm ? "collapsed" : appearanceBeforeSmallScreen.current.asideMenuVisibility);
        screenMode.update(sm ? "full" : appearanceBeforeSmallScreen.current.screenMode);
        viewMode.update(sm ? "desktop" : appearanceBeforeSmallScreen.current.viewMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sm]);
    return (
        <OverlapedChildrenContainer
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(250px, 100dvh))",
                height: 0,
            }}
        >
            {children}
        </OverlapedChildrenContainer>
    );
}
