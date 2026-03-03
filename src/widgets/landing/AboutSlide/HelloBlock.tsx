"use client";
import DeveloperIllustration from "./DeveloperIllustration";
import { useLandingColor } from "@/shared/lib/theme";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";
import renderContent from "./renderContent";

export default function HelloBlock({ id, sx, title, content }: { id: string; sx?: SxProps; title?: [string, string, string, string?]; content?: string }) {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    return (
        <AboutBlock
            illustration={<DeveloperIllustration />}
            order="right"
            title={title ?? (lang.ru ? ["Всем", "привет", "👋"] : ["Hello", "everyone", "👋"])}
            id={id}
            sx={sx}
            squeezedImgHPos="-82% 0%"
        >
            {content ? renderContent(content, textColor) : null}
        </AboutBlock>
    );
}
