"use client";

import { Box, BoxProps, alpha, useTheme } from "@mui/material";
import { getThemeColor } from "@/shared/lib/theme";
import { useRouter } from "next/navigation";

export default function Link({ sx, children, href, ...props }: BoxProps<"a">) {
    const theme = useTheme();
    const router = useRouter();
    return (
        <Box
            component="a"
            onClick={(e: React.MouseEvent) => {
                if (href && href.startsWith("/")) {
                    e.preventDefault();
                    router.push(href);
                }
            }}
            sx={{
                color: getThemeColor("secondaryText", theme),
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: alpha(getThemeColor("secondaryText", theme), 0.3),
                overflowWrap: "anywhere",
                "&:hover": {
                    color: getThemeColor("secondaryHoverText", theme),
                    textDecorationColor: getThemeColor("secondaryHoverText", theme),
                },
                ...sx,
            }}
            href={href}
            target="_blank"
            {...props}
        >
            {children}
        </Box>
    );
}
