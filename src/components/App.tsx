import "../style.css";
import "@/utilities/cookie";
import { SxProps } from "@mui/material";
import MainLayout from "./layout/MainLayout";
import { useThemeColor } from "./contexts/Theme";
import { useLanguage } from "@/store/appearanceSlice";
import { ReactContentProps } from "@/types/react";
import { Link, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
//import PagesIntegrator from "./pages/PagesIntegrator";
import { AppSpinner } from "./Spinners";
import React from "react";
import { Provider } from "react-redux";
import ThemeContext from "./contexts/ThemeContext";
import store from "@/store";
import Landing from "./pages/Landing";
import OverlapedChildrenContainer from "./OverlapedChildrenContainer";
//import Projects from "./pages/Projects";
//import About from "./pages/About";
//import Profile from "./pages/Profile";

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
                path: "profile",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/Profile.tsx");
                    return { Component };
                },
                //element: <Profile />, //<PagesIntegrator page="profile" />,
            },
            {
                path: "about/:category?/:block?",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/About/index.tsx");
                    return { Component };
                },
                //element: <About />, //<PagesIntegrator page="about" />,
            },
            {
                path: "projects",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/Projects/index.tsx");
                    return { Component };
                },
                //element: <Projects />, //<PagesIntegrator page="projects" />,
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
                //element: <PagesIntegrator page="contacts" />,
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
    // const isLandingPage = window.location.pathname == "/";
    // return (
    //     <AppLayout>
    //         {!isLandingPage ? (
    //             <AppLayout sx={{ background: "unset" }}>
    //                 <RouterProvider router={router} fallbackElement={<AppSpinner />} />
    //             </AppLayout>
    //         ) : (
    //             <AppLayout sx={{ background: "unset" }}>
    //                 <Landing />
    //             </AppLayout>
    //         )}
    //     </AppLayout>
    // );
    return (
        <AppLayout>
            <RouterProvider router={router} fallbackElement={<AppSpinner />} />
        </AppLayout>
    );
}

export default App;
