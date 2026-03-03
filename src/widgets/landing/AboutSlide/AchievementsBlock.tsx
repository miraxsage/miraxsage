"use client";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useLandingColor } from "@/shared/lib/theme";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";
import AchievementIllustration from "./AchievementsIllustration";
import renderContent from "./renderContent";

export default function AchievementsBlock({ id, sx, title, content }: { id: string; sx?: SxProps; title?: [string, string, string, string?]; content?: string }) {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    return (
        <AboutBlock
            illustration={<AchievementIllustration />}
            order="right"
            title={title ?? (lang.ru ? ["Про", "достижения", "🏆"] : ["About", "achievements", "🏆"])}
            id={id}
            sx={sx}
            squeezedImgVPos="0% -80%"
        >
            {content ? renderContent(content, textColor) : null}
        </AboutBlock>
    );
}
