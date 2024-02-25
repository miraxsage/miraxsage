import __ from "@/utilities/transtation";
import AccentedTreeView from "../AccentedTreeView";

import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

//import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedIcon from "@mui/icons-material/Verified";
import WebhookIcon from "@mui/icons-material/Webhook";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import DataObjectIcon from "@mui/icons-material/DataObject";
import MusclesIcon from "../icons/MusclesIcon";
import { useLanguage } from "@/store/appearanceSlice";

const personIcon = <PersonIcon />;
const badgeIcon = <BadgeIcon />;
const schoolIcon = <SchoolIcon />;
const workIcon = <BusinessCenterIcon />;
const questionaireIcon = <ReceiptLongIcon />;
//import MemoryIcon from '@mui/icons-material/Memory';
const musclesIcon = <MusclesIcon />;
const technologiesIcon = <WebhookIcon />;
const achievementsIcon = <VerifiedIcon />;
const projectsIcon = <RocketLaunchIcon />;

const assessmentIcon = <AssessmentIcon />;
const softSkillsIcon = <PsychologyAltIcon />;
//import ConstructionIcon from '@mui/icons-material/Construction';
const hardSkillsIcon = <PsychologyIcon />;
const metricsIcon = <LeaderboardIcon />;
const snippetsIcon = <DataObjectIcon />;

export default function About() {
    useLanguage();
    return (
        <>
            About Page
            <div className="flex">
                <AccentedTreeView>
                    {[
                        {
                            id: "biography",
                            title: __("Biography"),
                            accented: true,
                            icon: personIcon,
                            children: [
                                {
                                    id: "general",
                                    title: __("General"),
                                    icon: badgeIcon,
                                },
                                {
                                    id: "education",
                                    title: __("Education"),
                                    icon: schoolIcon,
                                },
                                {
                                    id: "labor",
                                    title: __("Labor"),
                                    icon: workIcon,
                                    children: [
                                        {
                                            id: "technologies1",
                                            title: __("Technologies"),
                                            icon: technologiesIcon,
                                        },
                                        {
                                            id: "achievements2",
                                            title: __("Achievements"),
                                            icon: achievementsIcon,
                                            children: [
                                                {
                                                    id: "soft-skills1",
                                                    title: __("Soft-skills"),
                                                    icon: softSkillsIcon,
                                                },
                                                {
                                                    id: "hard-skills2",
                                                    title: __("Hard-skills"),
                                                    icon: hardSkillsIcon,
                                                },
                                                {
                                                    id: "metrics3",
                                                    title: __("Metrics"),
                                                    icon: metricsIcon,
                                                },
                                            ],
                                        },
                                        {
                                            id: "projects3",
                                            title: __("Projects"),
                                            icon: projectsIcon,
                                        },
                                    ],
                                },
                                {
                                    id: "questionaire",
                                    title: __("Questionaire"),
                                    icon: questionaireIcon,
                                },
                            ],
                        },
                        {
                            id: "experience",
                            title: __("Experience"),
                            icon: musclesIcon,
                            children: [
                                {
                                    id: "technologies",
                                    title: __("Technologies"),
                                    icon: technologiesIcon,
                                },
                                {
                                    id: "achievements",
                                    title: __("Achievements"),
                                    icon: achievementsIcon,
                                },
                                {
                                    id: "projects",
                                    title: __("Projects"),
                                    icon: projectsIcon,
                                },
                            ],
                        },
                        {
                            id: "specifications",
                            title: __("Specifications"),
                            icon: assessmentIcon,
                            children: [
                                {
                                    id: "soft-skills",
                                    title: __("Soft-skills"),
                                    icon: softSkillsIcon,
                                },
                                {
                                    id: "hard-skills",
                                    title: __("Hard-skills"),
                                    icon: hardSkillsIcon,
                                },
                                {
                                    id: "metrics",
                                    title: __("Metrics"),
                                    icon: metricsIcon,
                                },
                            ],
                        },
                        {
                            id: "snippets",
                            title: __("Snippets"),
                            //icon: snippetsIcon,
                            children: [
                                { id: "js", title: "JavaScript" },
                                {
                                    id: "ts",
                                    title: "TypeScript",
                                    children: [
                                        {
                                            id: "js1",
                                            title: "JavaScript",
                                            children: [
                                                {
                                                    id: "js2",
                                                    title: "JavaScript",
                                                },
                                                {
                                                    id: "ts3",
                                                    title: "TypeScript",
                                                },
                                                { id: "cs4", title: "C#" },
                                            ],
                                        },
                                        { id: "ts1", title: "TypeScript" },
                                        { id: "cs1", title: "C#" },
                                    ],
                                },
                                { id: "cs", title: "C#" },
                                { id: "php", title: "PHP" },
                                { id: "1c", title: "1C" },
                            ],
                        },
                    ]}
                </AccentedTreeView>
            </div>
        </>
    );
}
