import AboutBlock from "@/components/Block";
import { useEffect, useState } from "react";
import { AboutCategoriesKeysRecursive, AboutCategoriesType, hasSubcategories } from "./Categories";
import AboutBioGeneralBlock from "./Blocks/biography/General";
import AboutBioEducationBlock from "./Blocks/biography/Education";
import AboutBioLaborBlock from "./Blocks/biography/Labor";
import AboutBioQuestionaireBlock from "./Blocks/biography/Questionare";
import classes from "classnames";
import AboutExperienceTechsBlock from "./Blocks/experience/Techs";
import AboutExperienceAdvantagesBlock from "./Blocks/experience/Advantages";
import AboutExperienceProjectsBlock from "./Blocks/experience/Projects";
import AboutSpecsSoftSkillsBlock from "./Blocks/specs/SoftSkills";
import AboutSpecsHardSkillsBlock from "./Blocks/specs/HardSkills";
import AboutSpecsMetricsBlock from "./Blocks/specs/Metrics";
import AboutSpecsSnippetsBlock from "./Blocks/snippets/Snippets";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CustomScrollbar from "@/components/Scrollbar";

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
    const [activeCat] = useState(category);
    const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);
    if (!selectedBlock || !hasSubcategories(activeCat) || blocks[activeCat].every(([b]) => b != selectedBlock))
        selectedBlock = undefined;
    const onBlockToggle = (block: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        const newExpandedBlocks = isExpanded ? [...expandedBlocks, block] : expandedBlocks.filter((b) => b != block);
        setExpandedBlocks(newExpandedBlocks);
        if (onSelectedBlockChanged && (newExpandedBlocks.length != 1 || newExpandedBlocks[0] != selectedBlock))
            onSelectedBlockChanged(newExpandedBlocks.length != 1 ? null : newExpandedBlocks[0], [...newExpandedBlocks]);
    };
    useEffect(() => {
        if (selectedBlock) setExpandedBlocks([selectedBlock]);
    }, [selectedBlock]);
    return (
        <div style={{ height: "100%" }}>
            {hasSubcategories(activeCat) && (
                <CustomScrollbar right="4.5px" bottom="5px" top="5px">
                    <Box sx={{ padding: lessSm ? "8px 15px 8px 7px" : "17px 15px 17px 14px" }}>
                        {blocks[activeCat].map(([block, Control], i) => {
                            const subBlocks = blocks[activeCat];
                            const prevExpanded = i > 0 && expandedBlocks.includes(subBlocks[i - 1][0]);
                            const nextExpanded =
                                i < subBlocks.length - 1 && expandedBlocks.includes(subBlocks[i + 1][0]);
                            return (
                                <AboutBlock
                                    key={block}
                                    className={classes({
                                        "prev-expanded": prevExpanded,
                                        "next-expanded": nextExpanded,
                                    })}
                                    expanded={expandedBlocks.includes(block)}
                                    onToggle={onBlockToggle(block)}
                                    category={block}
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
