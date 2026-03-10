"use client";
import { Box, useMediaQuery } from "@mui/material";
import SoftSkillDescriptionBlock from "./SoftSkillDescriptionBlock";
import { useTheme } from "@mui/material";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";
import { ICON_MAP } from "@/entities/resume/model/iconMap";

export default function AboutSpecsSoftSkillsBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    const twoCols = useMediaQuery(theme.breakpoints.up("2xl"));
    const divider = theme.palette.divider;
    const { softSkills } = useResumeData();

    return (
        <Box
            sx={{
                padding: "25px",
                display: "grid",
                gridTemplate: twoCols ? "1fr / 1fr 1fr" : "1fr / 1fr",
                gap: "25px",
                [theme.breakpoints.down("sm")]: {
                    padding: "6.5px",
                },
                [twoCols
                    ? "& .description-block:nth-of-type(even):not(:last-of-type) .connector"
                    : "& .description-block:not(:last-of-type) .connector"]: {
                    display: "block",
                    height: "25px",
                    width: twoCols ? "calc(100% + 25px)" : "50%",
                    position: "absolute",
                    bottom: "-25px",
                    right: twoCols ? "50%" : "25%",
                    "& > div": {
                        border: "1px solid " + divider,
                        width: "50%",
                        height: "calc(50% + 0.5px)",
                        position: "absolute",
                        "&:after": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: "5px",
                            height: "5px",
                            background: divider,
                            borderRadius: "50%",
                            zIndex: 1,
                        },
                    },
                    "& > div:first-of-type": {
                        borderBottomRightRadius: "10px",
                        borderWidth: "0px 1px 1px 0px",
                        right: 0,
                        "&:after": {
                            right: "-2.5px",
                            top: "-2.5px",
                        },
                    },
                    "& > div:last-of-type": {
                        borderTopLeftRadius: "10px",
                        borderWidth: "1px 0px 0px 1px",
                        left: 0,
                        bottom: 0,
                        "&:after": {
                            left: "-2.5px",
                            bottom: "-2.5px",
                        },
                    },
                },
                ...(twoCols
                    ? {
                          "& .description-block:nth-of-type(odd):not(:last-of-type) .connector": {
                              display: "block",
                              width: "25px",
                              position: "absolute",
                              top: "50%",
                              right: "-25px",
                              "& > div:first-of-type": {
                                  background: divider,
                                  width: "100%",
                                  height: "1px",
                                  position: "absolute",
                                  "&:after, &:before": {
                                      content: '""',
                                      display: "block",
                                      position: "absolute",
                                      width: "5px",
                                      height: "5px",
                                      background: divider,
                                      borderRadius: "50%",
                                      top: "-2px",
                                      zIndex: 1,
                                  },
                                  "&:before": {
                                      left: "-3px",
                                  },
                                  "&:after": {
                                      right: "-3px",
                                  },
                              },
                          },
                      }
                    : {}),
            }}
        >
            {softSkills.map((skill, i) => {
                const Icon = ICON_MAP[skill.icon];
                const raw: number[] = JSON.parse(skill.level_values);
                const level = raw[0] ?? 0;
                const totalLevel = raw[1] ?? 100;
                const averagePercent = raw.length >= 4 ? raw[2] : (totalLevel > 0 ? Math.round(100 * (raw[2] ?? 0) / totalLevel) : 0);
                const levelPercent = raw.length >= 4 ? raw[3] : (totalLevel > 0 ? Math.round(100 * level / totalLevel) : 0);
                const label = lang.lang === "en" ? skill.label_en : skill.label_ru;
                const description = { en: skill.description_en, ru: skill.description_ru };

                return (
                    <Box key={skill.slug} className="description-block" sx={{ position: "relative" }}>
                        <SoftSkillDescriptionBlock
                            number={i + 1}
                            label={label}
                            description={description}
                            icon={Icon ? <Icon /> : <></>}
                            level={level}
                            totalLevel={totalLevel}
                            averagePercent={averagePercent}
                            levelPercent={levelPercent}
                        />
                        <div className="connector">
                            <div></div>
                            <div></div>
                        </div>
                    </Box>
                );
            })}
        </Box>
    );
}
