"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import TopMenu from "@/widgets/layout/TopMenu";
import type { HeaderItem } from "@/widgets/layout/TopMenu";
import BottomBar from "@/widgets/layout/BottomBar";
import AsideMenu from "@/widgets/layout/AsideMenu";
import { getThemeColor } from "@/shared/lib/theme";
import { useScreenMode } from "@/shared/lib/store/appearanceSlice";
import SiteMap from "@/widgets/layout/SiteMap";
import { CategoryLabelsContext, CategoryLabelsMap } from "@/entities/resume/model/categoryLabels";
import { UiLabelsContext, UiLabelsMap } from "@/entities/ui-labels/model/uiLabelsContext";
import { ResumeDataContext, ResumeData } from "@/entities/resume/model/resumeDataContext";
import type { ContactItem } from "@/widgets/landing/MainSlide";

interface LayoutProps {
    children: React.ReactNode;
    headerItems: HeaderItem[];
    categoryLabels: CategoryLabelsMap;
    uiLabels: UiLabelsMap;
    resumeData: ResumeData;
    contacts: ContactItem[];
}

export default function MainLayout({ children, headerItems, categoryLabels, uiLabels, resumeData, contacts }: LayoutProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode == "dark";
    const smallHeight = useMediaQuery("@media (max-height:450px)");
    const glowColor = getThemeColor("layoutGlow", theme);
    const screenMode = useScreenMode();
    return (
        <UiLabelsContext.Provider value={uiLabels}>
        <CategoryLabelsContext.Provider value={categoryLabels}>
        <ResumeDataContext.Provider value={resumeData}>
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
                              height: "calc(max(95%, 100dvh - (100dvw - var(--container-width))))",
                              padding: "25px",
                          },
                          [theme.breakpoints.up("xl")]: {
                              minHeight: "500px",
                              height: "calc(max(90%, 100dvh - (100dvw - var(--container-width))))",
                          },
                      }),
            }}
            className={screenMode.window ? "container" : undefined}
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
                    overflow: "hidden",
                    display: "grid",
                    height: "100%",
                    ...(screenMode.window
                        ? {
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: "12px",
                              width: "100%",
                          }
                        : {}),
                }}
            >
                <TopMenu headerItems={headerItems} />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplate: "minmax(0, 1fr) / auto minmax(0, 1fr)",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <AsideMenu />
                    <Box sx={{ flexGrow: 1, maxWidth: "100dvw", position: "relative" }}>
                        {children}
                        <SiteMap contacts={contacts} />
                    </Box>
                </Box>
                {!smallHeight && <BottomBar contacts={contacts} />}
            </Box>
        </Box>
        </ResumeDataContext.Provider>
        </CategoryLabelsContext.Provider>
        </UiLabelsContext.Provider>
    );
}
