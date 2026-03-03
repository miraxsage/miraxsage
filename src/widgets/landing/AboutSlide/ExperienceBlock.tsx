"use client";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useLandingColor } from "@/shared/lib/theme";
import AboutBlock from "./AboutBlock";
import ExperienceIllustration from "./ExperienceIllustration";
import { SxProps } from "@mui/material";
import renderContent from "./renderContent";

export default function ExperienceBlock({ id, sx, title, content }: { id: string; sx?: SxProps; title?: [string, string, string, string?]; content?: string }) {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    return (
        <AboutBlock
            illustration={<ExperienceIllustration />}
            order="left"
            title={title ?? (lang.ru ? ["Про", "опыт", "💎"] : ["About", "experience", "💎"])}
            id={id}
            sx={sx}
            squeezedImgHPos="-73% 0%"
            squeezedImgVPos="0% -76%"
        >
            {content ? renderContent(content, textColor) : null}
        </AboutBlock>
    );
}
