import AboutBlock from "@/components/Block";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import __ from "@/utilities/transtation";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CallIcon from "@mui/icons-material/Call";
import { capitalize } from "@/utilities/string";
import { useEffect, useState } from "react";
import categories, { AboutCategoriesKeysRecursive, AboutCategoriesType, hasSubcategories } from "./Categories";
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
import { Box, useTheme } from "@mui/material";
import CustomScrollbar from "@/components/Scrollbar";

const profileIcon = <AssignmentIndIcon />;
const projectsIcon = <RocketLaunchIcon />;
const contactIcon = <CallIcon />;

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
        <>
            <CustomBreadcrumbs
                sx={{ borderBottom: `1px solid ${theme.palette.divider}`, padding: "6px 8px", margin: 0 }}
            >
                {(() => {
                    const items = [
                        { label: "Miraxsage", link: "/" },
                        {
                            label: __("About"),
                            subitems: [
                                {
                                    label: __("Profile"),
                                    icon: profileIcon,
                                    link: "/profile",
                                },
                                {
                                    label: __("Projects"),
                                    icon: projectsIcon,
                                    link: "/projects",
                                },
                                {
                                    label: __("Interact"),
                                    icon: contactIcon,
                                    link: "/interact",
                                },
                            ],
                        },
                    ];
                    items.push({
                        label: __(capitalize(activeCat)),
                        subitems: Object.entries(categories)
                            .filter(([key]) => key != activeCat)
                            .map(([key, val]) => ({
                                label: __(capitalize(key)),
                                icon: val.icon,
                                link: "/about/" + key,
                            })),
                    });
                    if (selectedBlock && hasSubcategories(category))
                        items.push({
                            label: __(capitalize(selectedBlock)),
                            subitems: Object.entries(categories[category]["items"])
                                .filter(([key]) => key != selectedBlock)
                                .map(([key, val]) => ({
                                    label: __(capitalize(key)),
                                    icon: val.icon,
                                    link: "/about/" + category + "/" + key,
                                })),
                        });
                    return items;
                })()}
            </CustomBreadcrumbs>

            <div style={{ height: "100%" }}>
                {hasSubcategories(activeCat) && (
                    <CustomScrollbar right="4.5px" bottom="5px" top="5px">
                        <Box sx={{ padding: "17px 15px 17px 14px" }}>
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
        </>
    );
}
