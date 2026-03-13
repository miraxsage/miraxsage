"use client";
import DescriptionPanel from "@/shared/ui/DescriptionPanel";
import Link from "@/shared/ui/Link";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";
import { Box } from "@mui/material";

export default function AboutExperienceProjectsBlock() {
    const lang = useLanguage();
    const { experienceProjects } = useResumeData();
    const proj = experienceProjects[0];
    const text = proj ? (lang.lang === "en" ? proj.text_en : proj.text_ru) : "";

    return (
        <DescriptionPanel withoutBorders={true}>
            {{
                elements: [
                    ...(text ? [<Box key="text" sx={{ textIndent: "0px", padding: "6px 14px" }}>{text}</Box>] : []),
                    <Box key="more" sx={{ textIndent: "0px", padding: "6px 14px" }}>
                        {lang.ru ? (
                            <>Подробнее в <Link href="/projects">портфолио</Link></>
                        ) : (
                            <>More in <Link href="/projects">portfolio</Link></>
                        )}
                    </Box>,
                ],
            }}
        </DescriptionPanel>
    );
}
