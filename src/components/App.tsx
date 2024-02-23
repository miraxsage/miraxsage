import "../style.css";
import { Box } from "@mui/material";
import Layout from "./layout/Layout";
import { useThemeColor } from "./contexts/Theme";

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
