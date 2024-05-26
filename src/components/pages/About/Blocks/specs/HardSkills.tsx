import AccentedTreeView from "@/components/AccentedTreeView";
import MarkupIcon from "@/components/icons/MarkupIcon";
import TerminalIcon from "@/components/icons/TerminalIcon";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import TechnologiesTable from "./TechnologiesTable";
import { technologies } from "./Technologies";

export default function AboutSpecsHardSkillsBlock() {
    return (
        <>
            <AccentedTreeView initiallyExpandedNodes={["frontend"]} selectionMode="disable">
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
                                content: <TechnologiesTable data={technologies.desktop} />,
                            },
                        ],
                    },
                ]}
            </AccentedTreeView>
        </>
    );
}
