import AccentedTreeView from "@/components/AccentedTreeView";
import TechDescriptionBlock from "../../TechDescriptionBlock";
import MarkupIcon from "@/components/icons/MarkupIcon";
import TerminalIcon from "@/components/icons/TerminalIcon";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";

export default function AboutExperienceTechsBlock() {
    return (
        <>
            <AccentedTreeView expandedNodes={["about"]} disableSelection={true}>
                {[
                    {
                        id: "frontend",
                        title: `Frontend`,
                        icon: <MarkupIcon />,
                        children: [
                            {
                                id: "frontend-datails",
                                content: <TechDescriptionBlock category="frontend" />,
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
                                content: <TechDescriptionBlock category="backend" />,
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
                                content: <TechDescriptionBlock category="desktop" withoutBottomBorder={true} />,
                            },
                        ],
                    },
                ]}
            </AccentedTreeView>
        </>
    );
}
