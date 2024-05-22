import { Box, SxProps, useMediaQuery, useTheme } from "@mui/material";
import { useLandingColor } from "..";
import { mix } from "@/utilities/colors";
import { ReactNode } from "react";

type AboutBlockProps = {
    illustration: ReactNode;
    order?: "left" | "right";
    title: [string, string, string, string?];
    children: ReactNode | { text: ReactNode; controls: ReactNode };
    sx?: SxProps;
    id?: string;
};
export default function AboutBlock({
    illustration,
    order = "left",
    title: [titleA, titleB, titleC, titleD],
    children,
    sx,
    id,
}: AboutBlockProps) {
    const theme = useTheme();
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    illustration = (
        <Box
            sx={{
                maxWidth: "45%",
                overflow: "hidden",
                flexGrow: 1,
                "& svg": {
                    minHeight: "500px",
                    maxWidth: "700px",
                },
                [theme.breakpoints.down("xl")]: {
                    maxWidth: "30%",
                    [order == "left" ? "borderRight" : "borderLeft"]: `1px solid ${theme.palette.divider}`,
                    "& > div": {
                        translate: "100% 0%",
                    },
                    "& svg": {
                        minHeight: "600px",
                        translate: "-100% 0%",
                    },
                },
                [theme.breakpoints.down("md")]: {
                    maxWidth: "calc(100% - 20px)",
                    maxHeight: "400px",
                    [order == "left" ? "borderRight" : "borderLeft"]: `0px`,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    "& > div": {
                        translate: "0% 350px",
                    },
                    "& svg": {
                        minHeight: "350px",
                        translate: "0% -100%",
                    },
                },
                [theme.breakpoints.down("sm")]: {
                    maxHeight: "250px",
                    "& > div": {
                        translate: "0% 250px",
                    },
                    "& svg": {
                        minHeight: "300px",
                        translate: "0% -100%",
                    },
                },
            }}
        >
            {illustration}
        </Box>
    );
    return (
        <Box
            id={id}
            sx={{
                position: "relative",
                display: "grid",
                height: "100dvh",
                alignItems: "center",
                gridArea: "1/1/1/1",
                padding: "50px 0",
                maxWidth: "calc(100dvw - 50px)",
                margin: "0 auto",
                background: "transparent",
                [theme.breakpoints.down("md")]: {
                    maxWidth: "calc(100dvw - 20px)",
                },
                ...sx,
            }}
            style={{ visibility: "hidden" }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: "5vw",
                    maxWidth: "calc(100dvw - 50px)",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    [theme.breakpoints.down("2xl")]: {
                        gap: "3vw",
                    },
                    [theme.breakpoints.down("xl")]: {
                        gap: "20px",
                    },
                    [theme.breakpoints.down("lg")]: {
                        gap: "50px",
                    },
                    [theme.breakpoints.down("md")]: {
                        maxWidth: "calc(100dvw - 20px)",
                        flexWrap: "wrap",
                    },
                    ...sx,
                }}
            >
                {order == "left" && !mediumScreen && illustration}

                <Box
                    sx={{
                        fontFamily: "NeueMachina",
                        color: textColor,
                        fontSize: "57px",
                        lineHeight: 1,
                        [theme.breakpoints.down("md")]: {
                            fontSize: "42px",
                            justifySelf: "stretch",
                        },
                    }}
                >
                    {titleA}{" "}
                    <Box
                        sx={{
                            display: "inline-block",
                            background: `linear-gradient(25deg, ${useLandingColor("accentA")}, ${useLandingColor(
                                "accentB"
                            )})`,
                            lineHeight: 1.25,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {titleB}
                    </Box>
                    {titleD && titleC}
                    <Box component="span" sx={{ fontSize: "45px", position: "relative", top: "-4px" }}>
                        {" "}
                        {titleD ? titleD : titleC}
                    </Box>
                    <Box sx={{ height: "25px" }}></Box>
                    <Box
                        sx={{
                            background: `linear-gradient(90deg, ${textColor} 30%, ${darkPaleAccent})`,
                            fontFamily: "Cascadia",
                            lineHeight: 1.2,
                            fontSize: "27px",
                            fontWeight: "500",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            width: "700px",
                            textWrap: "balance",
                            [theme.breakpoints.down("2xl")]: {
                                fontSize: "25px",
                            },
                            [theme.breakpoints.down("lg")]: {
                                fontSize: "23px",
                                width: "500px",
                            },
                            [theme.breakpoints.down("md")]: {
                                hyphens: "auto",
                            },
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "20px",
                                width: "365px",
                            },
                        }}
                    >
                        <br />
                        {children && typeof children == "object" && "text" in children ? children.text : children}
                    </Box>
                    {children && typeof children == "object" && "controls" in children && children.controls}
                </Box>

                {(order == "right" || mediumScreen) && illustration}
            </Box>
        </Box>
    );
}
