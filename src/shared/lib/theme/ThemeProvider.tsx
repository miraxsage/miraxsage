"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useColorMode } from "@/shared/lib/store/appearanceSlice";
import { darkTheme, lightTheme } from "./theme";
import EmotionRegistry from "./EmotionRegistry";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const colorMode = useColorMode();
    const theme = colorMode.dark ? darkTheme : lightTheme;

    return (
        <EmotionRegistry>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </EmotionRegistry>
    );
}
