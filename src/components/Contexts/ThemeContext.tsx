import { PartialFields } from "@/types/Common";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { darkTheme, lightTheme } from "./Theme";
import { useThemeMode } from "./AppearanceContext";

const ThemeContext: React.FC<PartialFields<ThemeProviderProps, "theme">> = ({
    children,
    theme,
}) => {
    const defaultTheme = useThemeMode().dark ? darkTheme : lightTheme;
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
