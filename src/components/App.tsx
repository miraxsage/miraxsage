import "../style.css";
import "@/utilities/cookie";
import { Box } from "@mui/material";
import MainLayout from "./layout/MainLayout";
import { useThemeColor } from "./contexts/Theme";
import About from "./pages/About";
import { useLanguage } from "@/store/appearanceSlice";
import { ReactContentProps } from "@/types/react";
import {
    Link,
    Outlet,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Contacts from "./pages/Contacts";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import PagesIntegrator from "./pages/PagesIntegrator";

function AppLayout({ children }: ReactContentProps) {
    return (
        <Box
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(640px, 100dvh))",
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
                element: <PagesIntegrator page="profile" />,
            },
            {
                path: "about",
                element: <PagesIntegrator page="about" />,
            },
            {
                path: "projects",
                element: <PagesIntegrator page="projects" />,
            },
            {
                path: "interact",
                element: <PagesIntegrator page="contacts" />,
            },
        ],
    },
]);

function App() {
    useLanguage();
    return (
        <AppLayout>
            <RouterProvider router={router} />
        </AppLayout>
    );
}

export default App;
