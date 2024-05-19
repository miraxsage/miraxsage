import { Box, useTheme } from "@mui/material";
import { useLandingColor } from "..";
import { mix } from "@/utilities/colors";
import { ReactNode } from "react";

type AboutBlockProps = {
    illustration: ReactNode;
    order?: "left" | "right";
    title: [string, string, string, string?];
    children: ReactNode;
};
export default function AboutBlock({
    illustration,
    order = "left",
    title: [titleA, titleB, titleC, titleD],
    children,
}: AboutBlockProps) {
    const theme = useTheme();
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
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
                    maxWidth: "90%",
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
            sx={{
                display: "flex",
                gap: "5vw",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
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
                    flexWrap: "wrap",
                },
            }}
        >
            {order == "left" && illustration}
            <Box>
                <Box
                    sx={{
                        fontFamily: "NeueMachina",
                        color: textColor,
                        fontSize: "57px",
                        lineHeight: 1,
                        [theme.breakpoints.down("md")]: {
                            fontSize: "42px",
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
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "20px",
                                width: "365px",
                            },
                        }}
                    >
                        <br />
                        {children}
                    </Box>
                </Box>
            </Box>
            {order == "right" && illustration}
        </Box>
    );
}
