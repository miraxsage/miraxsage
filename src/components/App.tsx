import "../style.css";
import { Box } from "@mui/material";
import Layout from "./Layout/Layout";
import { useThemeColor } from "./Contexts/Theme";

function App() {
    return (
        <Box
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(640px, 100dvh))",
            }}
            className={`h-0 w-full flex justify-center items-center`}
        >
            <Layout>
                <div className="">Мираксейдж</div>
            </Layout>
        </Box>
    );
}

export default App;
