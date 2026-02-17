"use client";
import { useColorMode } from "@/shared/lib/store/appearanceSlice";
import { useLandingColor } from "@/shared/lib/theme";
import { mix } from "@/shared/lib/colors";
import Link from "@/shared/ui/Link";
import { BoxProps } from "@mui/material";

export default function LandingLink({ sx, children, ...props }: BoxProps<"a">) {
    const isDarkMode = useColorMode().dark;
    const accentA = useLandingColor("accentA");
    const accentB = useLandingColor(isDarkMode ? "accentB" : "accentA");
    const darkPaleAccent = mix(accentA, isDarkMode ? "#777777" : "#bbbbbb", 0.6);
    return (
        <Link
            sx={{
                textDecorationColor: darkPaleAccent,
                WebkitTextFillColor: darkPaleAccent,
                "&:hover": {
                    textDecorationColor: accentB,
                    WebkitTextFillColor: accentB,
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </Link>
    );
}
