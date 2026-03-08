"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@/shared/ui/Avatar";
import { getThemeColor } from "@/shared/lib/theme";
import React from "react";
import { DescriptionTableValue } from "@/shared/ui/DescriptionTable";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";

export default function AboutBioGeneralBlock() {
    const theme = useTheme();
    const { lang } = useLanguage();
    const { generalData } = useResumeData();
    const data: [string, string][] = generalData.map((row) => [
        lang === "ru" ? row.label_ru : row.label_en,
        lang === "ru" ? row.value_ru : row.value_en,
    ]);
    const borderWidth = { borderWidth: "0px 0px 1px 1px" };
    const is3xl = useMediaQuery(theme.breakpoints.only("3xl"));
    let itemsDisplace = 0;
    return (
        <Box
            className="w-full"
            sx={{
                display: "grid",
                [theme.breakpoints.only("3xl")]: {
                    gridTemplateColumns: "auto auto auto 1fr auto auto 1fr",
                },
                [theme.breakpoints.between("xl", "3xl")]: {
                    gridTemplateColumns: "auto auto auto auto 1fr",
                },
                [theme.breakpoints.only("lg")]: {
                    gridTemplateColumns: "auto auto auto 1fr",
                },
                [theme.breakpoints.down("lg")]: {
                    gridTemplateColumns: "auto 1fr",
                },

                "& > div:not(.avatar)": {
                    padding: "6px 15px",
                    borderColor: theme.palette.divider,
                    borderStyle: "solid",
                    display: "flex",
                    alignItems: "center",
                },
                "& > .grid-title": {
                    background: getThemeColor("titleBg", theme),
                },
                "& > .grid-first-title": {
                    justifyContent: "center",
                },
                "& > div:nth-last-of-type(3), & > div:nth-last-of-type(2), & > div:nth-last-of-type(1)": {
                    borderBottomWidth: "0px",
                },
            }}
        >
            <Box
                className="avatar"
                gridRow={{
                    "3xl": "span 8",
                    "2xl": "span 7",
                    xl: "span 7",
                    lg: "span 8",
                }}
                sx={{
                    [theme.breakpoints.down("3xl")]: {
                        borderBottom: "1px solid " + theme.palette.divider,
                        gridColumn: "span 2",
                    },
                }}
            >
                <Avatar />
            </Box>
            {data.map(([name, val], i) => {
                let num = i + 1;
                if (is3xl) {
                    if (i % 2 == 1) {
                        num = i + Math.floor(data.length / 2) + itemsDisplace + 1;
                        [name, val] = data[num - 1];
                        itemsDisplace -= 1;
                    } else {
                        [name, val] = data[i + itemsDisplace];
                        num = i + itemsDisplace + 1;
                    }
                }
                return (
                    <React.Fragment key={`${name}_line`}>
                        <Box
                            className="grid-title grid-first-title"
                            sx={{
                                ...borderWidth,
                                [theme.breakpoints.between("xl", "3xl")]: {
                                    borderWidth: i > 6 ? "0px 0px 1px 0px" : "0px 0px 1px 1px",
                                },
                                [theme.breakpoints.only("lg")]: {
                                    borderWidth: i > 3 ? "0px 0px 1px 0px" : "0px 0px 1px 1px",
                                },
                                [theme.breakpoints.down("lg")]: {
                                    borderWidth: "0px 0px 1px 0px",
                                },
                            }}
                        >
                            {num}
                        </Box>
                        <Box
                            className="grid-title"
                            sx={{
                                ...borderWidth,
                                [theme.breakpoints.between("xl", "3xl")]: {
                                    gridColumn: i > 6 ? "span 2" : "span 1",
                                },
                            }}
                        >
                            <DescriptionTableValue value={name} />
                        </Box>
                        <Box
                            sx={{
                                ...borderWidth,
                                [theme.breakpoints.between("xl", "3xl")]: {
                                    gridColumn: i > 6 ? "span 2" : "span 1",
                                },
                                [theme.breakpoints.down("xl")]: {
                                    gridColumn: "span 2",
                                },
                                [theme.breakpoints.down("lg")]: {
                                    borderWidth: "0px 0px 1px 0px",
                                },
                            }}
                        >
                            <div>
                                <DescriptionTableValue name={name} value={val} />
                            </div>
                        </Box>
                    </React.Fragment>
                );
            })}
        </Box>
    );
}
