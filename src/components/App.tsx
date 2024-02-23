import "../style.css";
import "@/utilities/cookie";
import { Box } from "@mui/material";
import Layout from "./layout/Layout";
import { useThemeColor } from "./contexts/Theme";
import About from "./pages/About";
import { useLanguage } from "@/store/appearanceSlice";

function App() {
    useLanguage();
    return (
        <Box
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(640px, 100dvh))",
            }}
            className={`h-0 w-full flex justify-center items-center`}
        >
            <Layout>
                <About />
            </Layout>
        </Box>
    );
}

export default App;
