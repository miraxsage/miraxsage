"use client";

import { Box, SxProps } from "@mui/material";
import { ImgHTMLAttributes } from "react";

type LanguageIconProps = {
    language: "ru" | "en";
    sx?: SxProps;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "language" | "src">;

export default function LanguageIcon({ language, sx, style, ...props }: LanguageIconProps) {
    return (
        <Box
            component="img"
            sx={{
                aspectRatio: "1/1",
                width: "22px",
                borderRadius: "4px",
                objectFit: "cover",
                display: "inline-block",
                ...sx,
            }}
            src={`/img/icons/${language === "ru" ? "Russian" : "English"}.svg`}
            style={style}
            {...props}
        />
    );
}
