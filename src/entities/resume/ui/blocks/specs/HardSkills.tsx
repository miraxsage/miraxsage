"use client";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import DynamicIcon from "@/shared/ui/DynamicIcon";
import TechnologiesTable from "./TechnologiesTable";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useMemo } from "react";
import type { TechnologyInterface } from "./Technologies";

export default function AboutSpecsHardSkillsBlock() {
    const theme = useTheme();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const { technologyCategories, technologies } = useResumeData();
    const { lang } = useLanguage();

    const treeData = useMemo(() => {
        return technologyCategories.map((cat, catIdx) => {
            const catTechs = technologies.filter((t) => t.category_id === cat.id);
            const data: TechnologyInterface[] = catTechs.map((t) => {
                const name = lang === "ru" ? t.name_ru : t.name_en;
                const IconComp: React.FC = () => <DynamicIcon svg={t.icon_svg} name={t.icon} fontSize="20px" />;
                return [name, t.docs_link ?? "", IconComp, t.skill_level, t.experience_years, t.projects_count];
            });
            const catLabel = lang === "ru" ? cat.label_ru : cat.label_en;
            const isLast = catIdx === technologyCategories.length - 1;
            return {
                id: cat.slug,
                title: catLabel,
                icon: <DynamicIcon svg={cat.icon_svg} name={cat.icon} />,
                children: [
                    {
                        id: `${cat.slug}-table-details`,
                        content: <TechnologiesTable data={data} withoutBottomBorder={isLast} />,
                    },
                ],
            };
        });
    }, [technologyCategories, technologies, lang]);

    const firstSlug = technologyCategories[0]?.slug;

    return (
        <>
            <AccentedTreeView
                intend={lessSm ? "small" : "regular"}
                initiallyExpandedNodes={firstSlug ? [firstSlug] : []}
                selectionMode="disable"
            >
                {treeData}
            </AccentedTreeView>
        </>
    );
}
