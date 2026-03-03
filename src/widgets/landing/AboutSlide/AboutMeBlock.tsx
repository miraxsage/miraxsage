"use client";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useLandingColor } from "@/shared/lib/theme";
import WebDeveloperIllustration from "./WebDeveloperIllustration";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";
import renderContent from "./renderContent";

export default function AboutMeBlock({ id, sx, title, content }: { id: string; sx?: SxProps; title?: [string, string, string, string?]; content?: string }) {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    return (
        <AboutBlock
            illustration={<WebDeveloperIllustration />}
            order="left"
            title={title ?? (lang.ru ? ["Обо", "мне", "👨‍💻"] : ["About", "me", "👨‍💻"])}
            id={id}
            sx={sx}
            squeezedImgHPos="-85% 0%"
        >
            {content ? renderContent(content, textColor) : null}
        </AboutBlock>
    );
}
