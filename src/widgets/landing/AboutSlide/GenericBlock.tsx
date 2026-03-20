"use client";

import { useLandingColor } from "@/shared/lib/theme";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";
import renderContent from "./renderContent";
import DeveloperIllustration from "./DeveloperIllustration";
import WebDeveloperIllustration from "./WebDeveloperIllustration";
import SkillsIllustration from "./SkillsIllustration";
import ExperienceIllustration from "./ExperienceIllustration";
import AchievementIllustration from "./AchievementsIllustration";
import TeamIllustration from "./TeamIllustration";
import { ReactNode } from "react";

const illustrationComponents: Record<string, () => ReactNode> = {
    "Developer Illustration": () => <DeveloperIllustration />,
    "Web Developer Illustration": () => <WebDeveloperIllustration />,
    "Skills Illustration": () => <SkillsIllustration />,
    "Experience Illustration": () => <ExperienceIllustration />,
    "Achievements Illustration": () => <AchievementIllustration />,
    "Team Illustration": () => <TeamIllustration />,
};

export default function GenericBlock({
    id,
    sx,
    title,
    content,
    illustration,
    order,
}: {
    id: string;
    sx?: SxProps;
    title?: [string, string, string, string?];
    content?: string;
    illustration?: string;
    order?: "left" | "right";
}) {
    const textColor = useLandingColor("contrast");
    const IllustrationFactory = illustration ? illustrationComponents[illustration] : undefined;
    const illustrationNode = IllustrationFactory ? IllustrationFactory() : null;

    return (
        <AboutBlock
            illustration={illustrationNode}
            order={order ?? "left"}
            title={title ?? ["", "", ""]}
            id={id}
            sx={sx}
        >
            {content ? renderContent(content, textColor) : null}
        </AboutBlock>
    );
}
