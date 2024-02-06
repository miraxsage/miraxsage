import "../style.css";
import CascadiaExtraLight from "@/assets/fonts/CascadiaCodePL-Light.woff2";
import { Box, CssBaseline } from "@mui/material";
import {
    Palette,
    PaletteColor,
    ThemeOptions,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import deepMerge from "@/utilities/Common";
import { StyledEngineProvider } from "@mui/material/styles";
import Layout from "./Layout/Layout";

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
        };
    }
}

const basicTheme = {
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

// const lightTheme = createTheme(
//     deepMerge(basicTheme, {
//         palette: {
//             contrast: {
//                 light: "#a8a8a8",
//                 main: "#8e8e8e",
//                 dark: "#6b6b6b",
//             },
//             primary: {
//                 light: "#7464a2",
//                 main: "#5a4793",
//                 dark: "#3a316a",
//             },
//             secondary: {
//                 light: "#9acee1",
//                 main: "#57b0d9",
//                 dark: "#4489bb",
//             },
//             thirdary: {
//                 light: "#90d2c2",
//                 main: "#53c6b7",
//                 dark: "#42968b",
//             },
//         },
//     }) as ThemeOptions
// );

const darkTheme = createTheme(
    deepMerge(basicTheme, {
        palette: {
            mode: "dark",
            error: {
                main: "#d34d56",
            },
            divider: "#333646",
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
            thirdary: {
                light: "#7464a2",
                main: "#5a4793",
                dark: "#3a316a",
            },
            secondary: {
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
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        backgroundColor: "#080b1e",
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: "#262939",
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: "#080b1e",
                    },
                },
            },
        },
    }) as ThemeOptions
);

function App() {
    const theme = darkTheme;
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    sx={{ backgroundColor: "bg.dark" }}
                    className={`h-0 w-full min-h-dvh flex justify-center items-center`}
                >
                    <Layout>
                        <div className="">Мираксейдж</div>
                    </Layout>
                </Box>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
