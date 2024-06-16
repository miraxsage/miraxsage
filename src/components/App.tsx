import "../style.css";
import "@/utilities/cookie";
import { Box, SxProps, useMediaQuery, useTheme } from "@mui/material";
import MainLayout from "./layout/MainLayout";
import { getThemeColor, useThemeColor } from "./contexts/Theme";
import { useAsideMenuVisibility, useLanguage, useScreenMode, useViewMode } from "@/store/appearanceSlice";
import { ReactContentProps } from "@/types/react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppSpinner } from "./Spinners";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import ThemeContext from "./contexts/ThemeContext";
import store from "@/store";
import OverlapedChildrenContainer from "./OverlapedChildrenContainer";
import { NotFoundPage } from "./pages/NotFound";
import __ from "@/utilities/transtation";

function AppLayout({ children, sx }: { sx?: SxProps } & ReactContentProps) {
    return (
        <OverlapedChildrenContainer
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(250px, 100dvh))",
                height: 0,
                ...sx,
            }}
        >
            {children}
        </OverlapedChildrenContainer>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function showLoadingShield(show: boolean = true) {
    const shield = document.querySelector("#loading-shield") as HTMLElement | null;
    if (!shield) return;
    shield.style.display = show ? "block" : "none";
}
// eslint-disable-next-line react-refresh/only-export-components
export function hideLoadingShield() {
    showLoadingShield(false);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout>
                <Outlet />
            </MainLayout>
        ),
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                lazy: () => import("@/components/pages/Landing/index.tsx"),
            },
            {
                path: "about/:category?/:block?",
                lazy: () => import("@/components/pages/About/index.tsx"),
            },
            {
                path: "projects",
                lazy: () => import("@/components/pages/Projects/index.tsx"),
            },
            {
                path: "projects/:slug",
                lazy: () => import("@/components/pages/Projects/ProjectPage.tsx"),
            },
            {
                path: "interact",
                lazy: () => import("@/components/pages/Contacts/index.tsx"),
            },
        ],
    },
]);

export function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ThemeContext>
                    <AppContent />
                </ThemeContext>
            </Provider>
        </React.StrictMode>
    );
}

function AppContent() {
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
        <AppLayout>
            <RouterProvider router={router} fallbackElement={<AppSpinner />} />
            <Box
                id="loading-shield"
                sx={{
                    display: "none",
                    zIndex: 1,
                    position: "absolute",
                    background: getThemeColor("barBackground", theme),
                    borderRadius: "5px",
                    border: "1px solid " + theme.palette.divider,
                    padding: "7px 15px",
                }}
            >
                {__("Loading")}...
            </Box>
        </AppLayout>
    );
}

export default App;
