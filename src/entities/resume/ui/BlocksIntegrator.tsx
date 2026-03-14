"use client";
import AboutBlock from "@/shared/ui/Block";
import { useEffect, useState } from "react";
import { AboutCategoriesKeysRecursive, AboutCategoriesType, hasSubcategories } from "@/entities/resume/model/categories";
import AboutBioGeneralBlock from "./blocks/biography/General";
import AboutBioEducationBlock from "./blocks/biography/Education";
import AboutBioLaborBlock from "./blocks/biography/Labor";
import AboutBioQuestionaireBlock from "./blocks/biography/Questionare";
import AboutExperienceTechsBlock from "./blocks/experience/Techs";
import AboutExperienceAdvantagesBlock from "./blocks/experience/Advantages";
import AboutExperienceProjectsBlock from "./blocks/experience/Projects";
import AboutSpecsSoftSkillsBlock from "./blocks/specs/SoftSkills";
import AboutSpecsHardSkillsBlock from "./blocks/specs/HardSkills";
import AboutSpecsMetricsBlock from "./blocks/specs/Metrics";
import AboutSpecsSnippetsBlock from "./blocks/snippets/Snippets";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CustomScrollbar from "@/shared/ui/Scrollbar";
import { useVisibleCategories } from "@/entities/resume/model/categoryLabels";
import { AboutContentfulCategories } from "@/entities/resume/model/categories";

export type AboutBlocksIntegratorProps<K extends keyof AboutCategoriesType> = {
    category: K;
    selectedBlock?: AboutCategoriesKeysRecursive<AboutCategoriesType[K]>;
    onSelectedBlockChanged?: (selectedBlock: string | null, expandedBlocks: string[]) => void;
    isSwitchingRender?: boolean;
};

const blocks = {
    biography: [
        ["general", AboutBioGeneralBlock],
        ["education", AboutBioEducationBlock],
        ["labor", AboutBioLaborBlock],
        ["questionaire", AboutBioQuestionaireBlock],
    ],
    experience: [
        ["technologies", AboutExperienceTechsBlock],
        ["achievements", AboutExperienceAdvantagesBlock],
        ["projects", AboutExperienceProjectsBlock],
    ],
    specifications: [
        ["soft-skills", AboutSpecsSoftSkillsBlock],
        ["hard-skills", AboutSpecsHardSkillsBlock],
        ["metrics", AboutSpecsMetricsBlock],
    ],
    snippets: AboutSpecsSnippetsBlock,
} as const;

export default function AboutBlocksIntegrator<K extends keyof AboutCategoriesType>({
    category,
    selectedBlock,
    onSelectedBlockChanged,
    isSwitchingRender = false,
}: AboutBlocksIntegratorProps<K>) {
    const theme = useTheme();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const visibleCategories = useVisibleCategories();
    const [activeCat] = useState(category);
    const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);
    const visibleSubItems = hasSubcategories(activeCat)
        ? visibleCategories[activeCat as AboutContentfulCategories]?.items ?? {}
        : {};
    const visibleSubOrder = Object.keys(visibleSubItems);
    const blocksMap = hasSubcategories(activeCat)
        ? new Map((blocks[activeCat] as readonly (readonly [string, React.FC])[]).map(([b, c]) => [b, c]))
        : new Map<string, React.FC>();
    const visibleBlocks = visibleSubOrder
        .filter((b) => blocksMap.has(b))
        .map((b) => [b, blocksMap.get(b)!] as const);
    if (!selectedBlock || !hasSubcategories(activeCat) || visibleBlocks.every(([b]) => b != selectedBlock))
        selectedBlock = undefined;
    const onBlockToggle = (block: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        const newExpandedBlocks = isExpanded ? [...expandedBlocks, block] : expandedBlocks.filter((b) => b != block);
        setExpandedBlocks(newExpandedBlocks);
        if (onSelectedBlockChanged && newExpandedBlocks.length == 1 && newExpandedBlocks[0] != selectedBlock)
            onSelectedBlockChanged(newExpandedBlocks[0], [...newExpandedBlocks]);
    };
    useEffect(() => {
        if (selectedBlock) setExpandedBlocks([selectedBlock]);
    }, [selectedBlock]);
    return (
        <div style={{ height: "100%" }}>
            {hasSubcategories(activeCat) && (
                <CustomScrollbar right="4.5px" bottom="5px" top="5px">
                    <Box sx={{ padding: lessSm ? "8px 15px 8px 7px" : "17px 15px 17px 14px" }}>
                        {visibleBlocks.map(([block, Control], i) => {
                            const prevExpanded = i > 0 && expandedBlocks.includes(visibleBlocks[i - 1][0]);
                            const nextExpanded =
                                i < visibleBlocks.length - 1 && expandedBlocks.includes(visibleBlocks[i + 1][0]);
                            return (
                                <AboutBlock
                                    key={block}
                                    className={`${prevExpanded ? "prev-expanded" : ""} ${nextExpanded ? "next-expanded" : ""}`.trim()}
                                    expanded={expandedBlocks.includes(block)}
                                    onToggle={onBlockToggle(block)}
                                    category={block as AboutCategoriesKeysRecursive<AboutCategoriesType>}
                                    withoutTransition={isSwitchingRender}
                                >
                                    {<Control />}
                                </AboutBlock>
                            );
                        })}
                    </Box>
                </CustomScrollbar>
            )}
            {(() => {
                if (!hasSubcategories(activeCat) && blocks[activeCat]) {
                    const Component = blocks[activeCat] as React.FC;
                    return <Component />;
                }
            })()}
        </div>
    );
}
