import AboutBlock from "@/components/Block";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import __ from "@/utilities/transtation";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CallIcon from "@mui/icons-material/Call";
import { capitalize } from "@/utilities/string";
import AboutGeneralBlock from "./Blocks/General";
import AboutEducationBlock from "./Blocks/Education";
import AboutLaborBlock from "./Blocks/Labor";
import { useEffect, useState } from "react";
import categories, { AboutCategoriesKeysRecursive, AboutCategoriesType } from "./Categories";
import AboutQuestionaireBlock from "./Blocks/Questionare";
import classes from "classnames";

const profileIcon = <AssignmentIndIcon />;
const projectsIcon = <RocketLaunchIcon />;
const contactIcon = <CallIcon />;

export type AboutBlocksIntegratorProps<K extends keyof AboutCategoriesType> = {
    category: K;
    selectedBlock?: AboutCategoriesKeysRecursive<AboutCategoriesType[K]>;
    onSelectedBlockChanged?: (selectedBlock: string | null, expandedBlocks: string[]) => void;
};

const blocks = {
    biography: [
        ["general", AboutGeneralBlock],
        ["education", AboutEducationBlock],
        ["labor", AboutLaborBlock],
        ["questionaire", AboutQuestionaireBlock],
    ],
    experience: [],
    specifications: [],
    snippets: [],
} as const;

export default function AboutBlocksIntegrator<K extends keyof AboutCategoriesType>({
    category,
    selectedBlock,
    onSelectedBlockChanged,
}: AboutBlocksIntegratorProps<K>) {
    const [activeCat] = useState(category);
    const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);
    if (!selectedBlock || blocks[activeCat].every(([b]) => b != selectedBlock)) selectedBlock = undefined;
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
            <CustomBreadcrumbs>
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
                    if (selectedBlock)
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
            <div>
                {blocks[activeCat].map(([block, Control], i) => {
                    const subBlocks = blocks[activeCat];
                    const prevExpanded = i > 0 && expandedBlocks.includes(subBlocks[i - 1][0]);
                    const nextExpanded = i < subBlocks.length - 1 && expandedBlocks.includes(subBlocks[i + 1][0]);
                    return (
                        <AboutBlock
                            key={block}
                            className={classes({ "prev-expanded": prevExpanded, "next-expanded": nextExpanded })}
                            expanded={expandedBlocks.includes(block)}
                            onToggle={onBlockToggle(block)}
                            category={block}
                        >
                            {<Control />}
                        </AboutBlock>
                    );
                })}
            </div>
        </>
    );
}
