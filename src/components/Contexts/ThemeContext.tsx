import { PartialFields } from "@/types/common.ts";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, Theme, ThemeProvider } from "@mui/material/styles";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

import { useColorMode } from "@/store/appearanceSlice";
import { darkTheme, lightTheme } from "./Theme.ts";
import { CustomScrollbarStylesContainer } from "../Scrollbar.tsx";
import CommonStylesContext from "./CommonStylesContext.tsx";
import { useLayoutEffect } from "react";

const ThemeContext: React.FC<PartialFields<ThemeProviderProps, "theme">> = ({ children, theme: propTheme }) => {
    const defaultTheme = useColorMode().dark ? darkTheme : lightTheme;
    const theme = propTheme || defaultTheme;
    useLayoutEffect(() => {
        if (document.querySelector("head style#container-widths-vars-styles")) return;
        const containerWidthsStyle = document.createElement("style");
        containerWidthsStyle.innerHTML = ".container { --container-width: 0px; } ";
        Object.entries((theme as Theme).breakpoints.values).forEach(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_key, size]) =>
                (containerWidthsStyle.innerHTML +=
                    size > 0 ? `@media (min-width: ${size}px) { .container { --container-width: ${size}px; } }` : ``)
        );
        containerWidthsStyle.id = "container-widths-vars-styles";
        document.querySelector("head")?.appendChild(containerWidthsStyle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
