import "../style.css";
import "@/utilities/cookie";
import { SxProps, useMediaQuery, useTheme } from "@mui/material";
import MainLayout from "./layout/MainLayout";
import { useThemeColor } from "./contexts/Theme";
import { useAsideMenuVisibility, useLanguage, useScreenMode } from "@/store/appearanceSlice";
import { ReactContentProps } from "@/types/react";
import { Link, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { AppSpinner } from "./Spinners";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import ThemeContext from "./contexts/ThemeContext";
import store from "@/store";
import Landing from "./pages/Landing";
import OverlapedChildrenContainer from "./OverlapedChildrenContainer";

function AppLayout({ children, sx }: { sx?: SxProps } & ReactContentProps) {
    return (
        <OverlapedChildrenContainer
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(500px, 100dvh))",
                height: 0,
                ...sx,
            }}
        >
            {children}
        </OverlapedChildrenContainer>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout>
                <Outlet />
            </MainLayout>
        ),
        errorElement: (
            <div>
                404 Page not found <br /> Let`s go{" "}
                <Link to="/">
                    <MuiLink>home</MuiLink>
                </Link>
            </div>
        ),
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "about/:category?/:block?",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/About/index.tsx");
                    return { Component };
                },
            },
            {
                path: "projects",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/Projects/index.tsx");
                    return { Component };
                },
            },
            {
                path: `projects/:slug`,
                lazy: () => import(`@/components/pages/Projects/ProjectPage.tsx`),
            },
            {
                path: "interact",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/Contacts/index.tsx");
                    return { Component };
                },
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
    const sm = useMediaQuery(theme.breakpoints.down("md"));
    const asideMenuVisibility = useAsideMenuVisibility();
    const screenMode = useScreenMode();
    const appearanceBeforeSmallScreen = useRef({
        asideMenuVisibility: asideMenuVisibility.value,
        screenMode: screenMode.value,
    });
    useEffect(() => {
        if (sm) {
            appearanceBeforeSmallScreen.current.asideMenuVisibility = asideMenuVisibility.value;
            appearanceBeforeSmallScreen.current.screenMode = screenMode.value;
        }
        asideMenuVisibility.update(sm ? "collapsed" : appearanceBeforeSmallScreen.current.asideMenuVisibility);
        screenMode.update(sm ? "full" : appearanceBeforeSmallScreen.current.screenMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sm]);
    return (
        <AppLayout>
            <RouterProvider router={router} fallbackElement={<AppSpinner />} />
        </AppLayout>
    );
}

export default App;
