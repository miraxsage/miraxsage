import { PartialFields } from "@/types/common.ts";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

import { useColorMode } from "@/store/appearanceSlice";
import { darkTheme, lightTheme } from "./Theme.ts";
import { CustomScrollbarStylesContainer } from "../Scrollbar.tsx";

const ThemeContext: React.FC<PartialFields<ThemeProviderProps, "theme">> = ({
    children,
    theme,
}) => {
    const defaultTheme = useColorMode().dark ? darkTheme : lightTheme;
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme || defaultTheme}>
                <CssBaseline />
                <CustomScrollbarStylesContainer>
                    {children}
                </CustomScrollbarStylesContainer>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeContext;
