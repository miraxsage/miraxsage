"use client";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import MarkupIcon from "@/shared/icons/MarkupIcon";
import TerminalIcon from "@/shared/icons/TerminalIcon";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import TechnologiesTable from "./TechnologiesTable";
import { technologies } from "./Technologies";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

export default function AboutSpecsHardSkillsBlock() {
    const theme = useTheme();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <AccentedTreeView
                intend={lessSm ? "small" : "regular"}
                initiallyExpandedNodes={["frontend"]}
                selectionMode="disable"
            >
                {[
                    {
                        id: "frontend",
                        title: `Frontend`,
                        icon: <MarkupIcon />,
                        children: [
                            {
                                id: "frontend-table-details",
                                content: <TechnologiesTable data={technologies.frontend} />,
                            },
                        ],
                    },
                    {
                        id: "backend",
                        title: `Backend`,
                        icon: <TerminalIcon />,
                        children: [
                            {
                                id: "backend-datails",
                                content: <TechnologiesTable data={technologies.backend} />,
                            },
                        ],
                    },
                    {
                        id: "desktop",
                        title: `Desktop`,
                        icon: <PersonalVideoIcon />,
                        children: [
                            {
                                id: "desktop-datails",
                                content: <TechnologiesTable withoutBottomBorder={true} data={technologies.desktop} />,
                            },
                        ],
                    },
                ]}
            </AccentedTreeView>
        </>
    );
}
