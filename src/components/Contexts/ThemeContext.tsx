import { PartialFields } from "@/types/common.ts";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

import { useColorMode } from "@/store/appearanceSlice";
import { darkTheme, lightTheme } from "./Theme.ts";

const ThemeContext: React.FC<PartialFields<ThemeProviderProps, "theme">> = ({
    children,
    theme,
}) => {
    const defaultTheme = useColorMode().dark ? darkTheme : lightTheme;
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme || defaultTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeContext;
