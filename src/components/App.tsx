import "../style.css";
import "@/utilities/cookie";
import { Box } from "@mui/material";
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
//import Projects from "./pages/Projects";
//import About from "./pages/About";
//import Profile from "./pages/Profile";

function AppLayout({ children }: ReactContentProps) {
    return (
        <Box
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(500px, 100dvh))",
            }}
            className={`h-0 w-full flex justify-center items-center`}
        >
            {children}
        </Box>
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
                element: "Hello",
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
                    const { default: Component } = await import("@/components/pages/Contacts.tsx");
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
    return (
        <AppLayout>
            <RouterProvider router={router} fallbackElement={<AppSpinner />} />
        </AppLayout>
    );
}

export default App;
