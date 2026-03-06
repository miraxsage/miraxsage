"use client";
import { Box, SxProps, alpha, useTheme } from "@mui/material";
import LeftFloralBackground from "./LeftFloralBackground";
import { getThemeColor } from "@/shared/lib/theme";
import RightFloralBackground from "./RightFloralBackground";
import AgreementImage from "./AgreementImage";
import GeometryWavesBackground from "./GeometryWavesBackground";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";

export interface PageContentItem {
    section: string;
    content_en: string;
    content_ru: string;
}

type HeadlineTitleBlockProps = {
    children: string;
    background: "light" | "dark" | "light-hatching" | "dark-hatching";
    sx?: SxProps;
};
function HeadlineTitleBlock({ children, background, sx }: HeadlineTitleBlockProps) {
    const theme = useTheme();
    const dividerColor = theme.palette.divider;
    const layoutColor = getThemeColor("layoutBackground", theme);
    let bg = null;
    let border = null;
    if (background == "dark") {
        bg = layoutColor;
        border = dividerColor;
    } else if (background == "light") {
        bg = dividerColor;
        border = layoutColor;
    } else if (background == "dark-hatching") {
        bg = `repeating-linear-gradient(
            -45deg,
            ${getThemeColor("layoutBackground", theme)},
            ${getThemeColor("layoutBackground", theme)} 5px,
            ${theme.palette.divider} 5px,
            ${theme.palette.divider} 6.5px
          )`;
        border = dividerColor;
    } else {
        bg = `repeating-linear-gradient(
            -45deg,
            ${theme.palette.divider},
            ${theme.palette.divider} 5px,
            ${getThemeColor("layoutBackground", theme)} 5px,
            ${getThemeColor("layoutBackground", theme)} 6px
          )`;
        border = layoutColor;
    }

    return (
        <Box
            sx={{
                padding: "3.5px 14px 5px 14px",
                borderRadius: "5px",
                fontSize: "21px",
                background: bg,
                border: `1px solid ${border}`,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

function Headline({ main, sub, sx }: { main: string; sub: string; sx?: SxProps }) {
    const theme = useTheme();
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 0px", ...sx }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    [theme.breakpoints.down("sm")]: {
                        padding: "0 10px",
                    },
                }}
            >
                <HeadlineTitleBlock
                    background="dark-hatching"
                    sx={{
                        fontWeight: "bold",
                        alignSelf: "start",
                        position: "absolute",
                        left: "5px",
                        top: "-5px",
                        userSelect: "none",
                        [theme.breakpoints.down("sm")]: {
                            left: "15px",
                        },
                    }}
                >
                    {main}
                </HeadlineTitleBlock>
                <HeadlineTitleBlock
                    background="dark-hatching"
                    sx={{
                        userSelect: "none",
                        position: "absolute",
                        right: "-5px",
                        bottom: "5px",
                        [theme.breakpoints.down("sm")]: {
                            bottom: "unset",
                            right: "5px",
                            top: "30px",
                        },
                    }}
                >
                    {sub}
                </HeadlineTitleBlock>
                <HeadlineTitleBlock
                    background="light"
                    sx={{
                        fontWeight: "bold",
                        alignSelf: "start",
                        position: "relative",
                    }}
                >
                    {main}
                </HeadlineTitleBlock>
                <HeadlineTitleBlock
                    background="dark"
                    sx={{
                        margin: "-8px 0px 0px 80px",
                        position: "relative",
                        [theme.breakpoints.down("sm")]: {
                            margin: "-8px 0px 0px 30px",
                        },
                    }}
                >
                    {sub}
                </HeadlineTitleBlock>
            </Box>
        </Box>
    );
}

export default function Thankfullness({ content }: { content: PageContentItem[] }) {
    const theme = useTheme();
    const lang = useLanguage();
    const lk = lang.ru ? "content_ru" : "content_en";
    const get = (section: string) => content.find((c) => c.section === section)?.[lk] ?? "";

    return (
        <Box
            sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr)",
                background: getThemeColor("barBackground", theme),
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "112px",
                    overflow: "hidden",
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                }}
            >
                <GeometryWavesBackground style={{ translate: "0 -10%" }} />
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    display: "grid",
                    overflow: "hidden",
                    [theme.breakpoints.between("lg", "3xl")]: {
                        "& > svg:first-of-type": {
                            opacity: 0,
                        },
                    },
                }}
            >
                <LeftFloralBackground
                    style={{
                        height: "100%",
                        gridArea: "1/1/1/1",
                    }}
                />
                <RightFloralBackground style={{ height: "100%", gridArea: "1/1/1/1", justifySelf: "end" }} />
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplate: "1fr / 40% 45% 15%",
                    padding: "0px 0px 15px 0px",
                    overflow: "hidden",
                    [theme.breakpoints.down("lg")]: {
                        gridTemplate: "1fr / 1fr",
                    },
                }}
            >
                <Box
                    sx={{
                        justifySelf: "end",
                        position: "relative",
                        marginRight: "70px",
                        scale: "1.2",
                        height: "100%",
                        aspectRatio: "413 / 336",
                        [theme.breakpoints.down("2xl")]: {
                            scale: "1.1",
                            aspectRatio: "361 / 336",
                        },
                    }}
                >
                    <AgreementImage style={{ position: "absolute", height: "100%" }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Headline main={get("headline_main")} sub={get("headline_sub")} />
                    <Box
                        sx={{
                            textIndent: "40px",
                            marginTop: "8px",
                            position: "relative",
                            [theme.breakpoints.down("lg")]: {
                                padding: "0 20px",
                                "&:before": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    height: "100%",
                                    width: "100%",
                                    display: "block",
                                    background: getThemeColor("layoutBackground", theme),
                                    filter: "blur(23px)",
                                    opacity: 0.8,
                                },
                                "& p": {
                                    position: "relative",
                                },
                            },
                        }}
                    >
                        <p>{get("intro_p1")}</p>
                        <p>{get("intro_p2")}</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
