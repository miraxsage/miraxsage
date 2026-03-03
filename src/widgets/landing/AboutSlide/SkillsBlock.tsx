"use client";
import { darken, lighten, useTheme } from "@mui/material";
import { useLandingColor } from "@/shared/lib/theme";
import { useColorMode, useLanguage } from "@/shared/lib/store/appearanceSlice";
import SkillsIllustration from "./SkillsIllustration";
import TechnologiesCrumbs from "@/shared/ui/TechnologiesCrumbs";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";
import renderContent from "./renderContent";

export default function SkillsBlock({ id, sx, title, content }: { id: string; sx?: SxProps; title?: [string, string, string, string?]; content?: string }) {
    const lang = useLanguage();
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const textColor = useLandingColor("contrast");
    const notelessColor = useLandingColor("noteless");
    return (
        <AboutBlock
            illustration={<SkillsIllustration />}
            order="right"
            title={title ?? (lang.ru ? ["Про", "навыки", "💪"] : ["About", "skills", "💪"])}
            id={id}
            sx={sx}
        >
            {{
                text: content ? renderContent(content, textColor) : null,
                controls: (
                    <>
                        <div style={{ height: "16px" }}></div>
                        <TechnologiesCrumbs
                            contrast={true}
                            techs="frontend"
                            sx={{
                                maxWidth: "700px",
                                rowGap: "2px",
                                "& .MuiChip-label, & .MuiBreadcrumbs-li .MuiChip-icon": {
                                    fontSize: "23px",
                                },
                                ".MuiMenuItem-root": {
                                    fontSize: "23px",
                                },
                                "& .MuiChip-root": {
                                    paddingLeft: "8px",
                                    maxHeight: "unset",
                                    height: "fit-content",
                                    "& .MuiChip-label": {
                                        transition: "all 0.3s",
                                        color: isDarkMode ? lighten(notelessColor, 0.7) : textColor,
                                    },
                                    "&: hover": {
                                        "& .MuiChip-label": {
                                            color: isDarkMode ? lighten(textColor, 0.5) : darken(textColor, 0.5),
                                        },
                                    },
                                },
                                [theme.breakpoints.down("md")]: {
                                    maxWidth: "86vw",
                                },
                            }}
                        />
                    </>
                ),
            }}
        </AboutBlock>
    );
}
