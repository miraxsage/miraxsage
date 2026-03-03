"use client";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useLandingColor } from "@/shared/lib/theme";
import AboutBlock from "./AboutBlock";
import TeamIllustration from "./TeamIllustration";
import { SxProps } from "@mui/material";
import renderContent from "./renderContent";

export default function TeamBlock({ id, sx, title, content }: { id: string; sx?: SxProps; title?: [string, string, string, string?]; content?: string }) {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    return (
        <AboutBlock
            illustration={<TeamIllustration />}
            order="left"
            title={title ?? (lang.ru ? ["Про", "цели", "🎯"] : ["About", "objectives", "🎯"])}
            id={id}
            sx={sx}
            squeezedImgHPos="-80% 0%"
        >
            {content ? renderContent(content, textColor) : null}
        </AboutBlock>
    );
}
