"use client";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MusclesIcon from "@/shared/icons/MusclesIcon";
import DescriptionPanel from "@/shared/ui/DescriptionPanel";
import TechnologiesCrumbs from "@/shared/ui/TechnologiesCrumbs";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";

type TechnologiesDescriptionBlock = {
    category: string;
    withoutBottomBorder?: boolean;
    withoutBorders?: boolean;
};

export default function TechDescriptionBlock({
    category,
    withoutBottomBorder,
    withoutBorders,
}: TechnologiesDescriptionBlock) {
    const lang = useLanguage();
    const t = useUiLabels();
    const { technologyCategories } = useResumeData();
    const cat = technologyCategories.find((c) => c.slug === category);
    const description = cat ? (lang.lang === "en" ? cat.description_en : cat.description_ru) : "";

    return (
        <DescriptionPanel withoutBottomBorder={withoutBottomBorder} withoutBorders={withoutBorders}>
            {{
                elements: [
                    <TechnologiesCrumbs key="crumbs" techs={category} sx={{ padding: "3px 12px", marginBottom: "4px" }} />,
                    ...(description ? [description] : []),
                ],
                buttons: [
                    {
                        label: t("Portfolio"),
                        icon: <RocketLaunchIcon sx={{ fontSize: "20px" }} />,
                        link: `/projects?techs=${category}`,
                    },
                    {
                        label: t("Skills_tab"),
                        icon: <MusclesIcon sx={{ fontSize: "20px" }} />,
                        link: `/about/specifications/hard-skills`,
                    },
                ],
            }}
        </DescriptionPanel>
    );
}
