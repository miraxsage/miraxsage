import { PartialFields } from "@/types/common.ts";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

import { useColorMode } from "@/store/appearanceSlice";
import { darkTheme, lightTheme } from "./Theme.ts";
import { CustomScrollbarStylesContainer } from "../Scrollbar.tsx";
import CommonStylesContext from "./CommonStylesContext.tsx";

const ThemeContext: React.FC<PartialFields<ThemeProviderProps, "theme">> = ({ children, theme: propTheme }) => {
    const defaultTheme = useColorMode().dark ? darkTheme : lightTheme;
    const theme = propTheme || defaultTheme;
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CommonStylesContext>
                    <CustomScrollbarStylesContainer>{children}</CustomScrollbarStylesContainer>
                </CommonStylesContext>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeContext;
