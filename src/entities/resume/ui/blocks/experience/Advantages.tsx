"use client";
import DescriptionPanel from "@/shared/ui/DescriptionPanel";
import { getThemeColor } from "@/shared/lib/theme";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";

export default function AboutExperienceAdvantagesBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    const { achievements } = useResumeData();

    return (
        <DescriptionPanel withoutBorders={true}>
            {{
                elements: achievements.map((item, i) => {
                    const content = lang.lang === "en" ? item.content_en : item.content_ru;
                    return (
                        <Box key={item.id} sx={{ textIndent: "0px", padding: "6px 14px" }}>
                            <Box
                                component="span"
                                sx={{
                                    borderWidth: "0px 1px 1px 0px",
                                    userSelect: "none",
                                    borderStyle: "solid",
                                    padding: "5px 10px",
                                    marginLeft: "-5px",
                                    position: "relative",
                                    left: "-9px",
                                    top: "-3px",
                                    borderColor: theme.palette.divider,
                                    background: getThemeColor("titleBg", theme),
                                }}
                            >
                                {i + 1}
                            </Box>
                            {content}
                        </Box>
                    );
                }),
            }}
        </DescriptionPanel>
    );
}
