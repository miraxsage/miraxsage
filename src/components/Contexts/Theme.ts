import CascadiaExtraLight from "@/assets/fonts/CascadiaCodePL-Light.woff2";
import {
    Palette,
    PaletteColor,
    Theme,
    ThemeOptions,
    alpha,
    createTheme,
    darken,
    lighten,
    useTheme,
} from "@mui/material/styles";
import deepMerge from "@/utilities/common";

declare module "@mui/material" {
    interface ButtonPropsColorOverrides {
        contrast: true;
        bg: true;
        thirdary: true;
    }
}
declare module "@mui/material/styles" {
    interface Theme {
        palette: Palette & {
            bg: PaletteColor;
            contrast: PaletteColor;
        };
    }
    interface ThemeOptions {
        breakpoints?: {
            ["2xl"]: number;
            ["3xl"]: number;
        };
    }
}

declare module "@mui/system" {
    interface BreakpointOverrides {
        "2xl": true;
        "3xl": true;
    }
}

const basicTheme = {
    palette: {
        error: {
            light: "#ff8c94",
            main: "#d34d56",
            dark: "#95252d",
        },
    },
    typography: {
        fontFamily: "Cascadia",
        fontSize: 15,
        button: {
            fontSize: "1.1rem",
            textTransform: "none",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
            "3xl": 1820,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "@font-face": {
                        fontFamily: "Cascadia",
                        fontStyle: "normal",
                        fontDisplay: "swap",
                        fontWight: 400,
                        src: `url("${CascadiaExtraLight}")`,
                    },
                },
            },
        },
    },
};

export const lightTheme = createTheme(
    deepMerge(basicTheme, {
        palette: {
            mode: "light",
            divider: "#d1d1d1",
            contrast: {
                light: "#4d4d4d",
                main: "#a4a4a4",
                dark: "#cacaca",
            },
            bg: {
                light: "#ffffff",
                main: "#f6f6f6",
                dark: "#e7e7e7",
            },
            primary: {
                light: "#7464a2",
                main: "#5a4793",
                dark: "#3a316a",
            },
            thirdary: {
                light: "#9acee1",
                main: "#57b0d9",
                dark: "#4489bb",
            },
            secondary: {
                light: "#90d2c2",
                main: "#53c6b7",
                dark: "#42968b",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "::selection": {
                        color: "#5a4793",
                        backgroundColor: alpha("#5a4793", 0.2),
                    },
                },
            },
        },
    }) as ThemeOptions
);

export const darkTheme = createTheme(
    deepMerge(basicTheme, {
        palette: {
            mode: "dark",
            divider: "#2c2f3e",
            contrast: {
                light: "#ececec",
                main: "#a2a2a2",
                dark: "#4c4c4c",
            },
            bg: {
                light: "#1f2943",
                main: "#1d1f2d",
                dark: "#151722",
            },
            secondary: {
                light: "#8173ab",
                main: "#5a4793",
                dark: "#3a316a",
            },
            thirdary: {
                light: "#9acee1",
                main: "#57b0d9",
                dark: "#4489bb",
            },
            primary: {
                light: "#90d2c2",
                main: "#53c6b7",
                dark: "#42968b",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "::selection": {
                        color: "#53c6b7",
                        backgroundColor: alpha("#53c6b7", 0.15),
                    },
                },
            },
        },
    }) as ThemeOptions
);

export type ThemeColors =
    | "barBackground"
    | "layoutBackground"
    | "tabRegularText"
    | "tabHoverText"
    | "tabActiveText"
    | "tabHoverBg"
    | "tabIcon"
    | "tabHoverIcon"
    | "layoutGlow"
    | "titleBg"
    | "accentedBg"
    | "secondaryBg"
    | "accentedGdBg"
    | "secondaryGdBg"
    | "accentedHoverBg"
    | "secondaryHoverBg"
    | "accentedHoverGdBg"
    | "secondaryHoverGdBg"
    | "regularText"
    | "accentedText"
    | "secondaryText"
    | "accentedHoverText"
    | "secondaryHoverText"
    | "regularHoverBg"
    | "accentedHoverBg"
    | "pageBg"
    | "pageBgColor";

export function getThemeColor(color: ThemeColors, theme: Theme) {
    const isDarkMode = theme.palette.mode == "dark";
    const pageBgGradientColor = lighten(theme.palette.bg.dark, 0.4);
    switch (color) {
        case "barBackground":
            return isDarkMode
                ? darken(theme.palette.bg.dark, 0.08)
                : theme.palette.bg.main;
        case "layoutBackground":
            return isDarkMode ? theme.palette.bg.dark : theme.palette.bg.light;
        case "tabRegularText":
            return isDarkMode
                ? lighten(theme.palette.divider, 0.25)
                : lighten(theme.palette.contrast.main, 0.1);
        case "tabHoverText":
            return isDarkMode
                ? theme.palette.contrast.main
                : darken(theme.palette.contrast.main, 0.2);
        case "tabActiveText":
            return isDarkMode
                ? theme.palette.contrast.light
                : theme.palette.primary.main;
        case "tabHoverBg":
            return isDarkMode
                ? alpha(theme.palette.divider, 0.15)
                : alpha(theme.palette.bg.light, 0.5);
        case "tabIcon":
            return isDarkMode
                ? lighten(theme.palette.divider, 0.25)
                : darken(theme.palette.contrast.dark, 0.03);
        case "tabHoverIcon":
            return isDarkMode
                ? theme.palette.contrast.main
                : theme.palette.contrast.main;
        case "layoutGlow":
            return isDarkMode
                ? alpha(theme.palette.bg.light, 0.5)
                : theme.palette.bg.dark;
        case "pageBg":
            return isDarkMode
                ? theme.palette.bg.dark
                : `linear-gradient(90deg, ${pageBgGradientColor}, transparent 20%, transparent 80%, ${pageBgGradientColor});`;
        case "pageBgColor":
            return isDarkMode ? theme.palette.bg.dark : theme.palette.bg.dark;
        case "titleBg":
            return alpha(theme.palette.divider, 0.13);
        case "accentedGdBg":
            return isDarkMode
                ? `linear-gradient(90deg, ${alpha(
                      theme.palette.primary.main,
                      0.03
                  )}, ${alpha(theme.palette.primary.main, 0.1)});`
                : `linear-gradient(90deg, ${alpha(
                      theme.palette.primary.main,
                      0.03
                  )}, ${alpha(theme.palette.primary.main, 0.1)});`;
        case "accentedHoverGdBg":
            return `linear-gradient(90deg, ${alpha(
                theme.palette.primary.main,
                0.07
            )}, ${alpha(theme.palette.primary.main, 0.15)});`;
        case "secondaryGdBg":
            return `linear-gradient(90deg, ${alpha(
                theme.palette.secondary.main,
                0.03
            )}, ${alpha(theme.palette.secondary.main, 0.1)});`;
        case "secondaryHoverGdBg":
            return `linear-gradient(90deg, ${alpha(
                theme.palette.secondary.main,
                0.07
            )}, ${alpha(theme.palette.secondary.main, 0.15)});`;
        case "regularText":
            return isDarkMode
                ? lighten(theme.palette.divider, 0.35)
                : theme.palette.contrast.main;
        case "accentedText":
            return alpha(theme.palette.primary.main, 0.75);
        case "accentedHoverText":
            return theme.palette.primary.main;
        case "secondaryText":
            return alpha(
                theme.palette.secondary[isDarkMode ? "light" : "main"],
                0.75
            );
        case "secondaryHoverText":
            return isDarkMode
                ? theme.palette.secondary.light
                : theme.palette.secondary.dark;
        case "regularHoverBg":
            return alpha(theme.palette.divider, 0.3);
        case "accentedBg":
            return alpha(theme.palette.primary.main, 0.1);
        case "accentedHoverBg":
            return alpha(theme.palette.primary.main, 0.15);
        case "secondaryBg":
            return isDarkMode
                ? alpha(theme.palette.secondary.light, 0.1)
                : alpha(theme.palette.secondary.main, 0.18);
        case "secondaryHoverBg":
            return isDarkMode
                ? alpha(theme.palette.secondary.light, 0.15)
                : alpha(theme.palette.secondary.dark, 0.17);
    }
}
export function useThemeColor(color: ThemeColors) {
    const theme = useTheme();
    return getThemeColor(color, theme);
}
