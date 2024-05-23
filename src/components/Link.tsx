import { Box, BoxProps, alpha, useTheme } from "@mui/material";
import { getThemeColor } from "./contexts/Theme";
import { useNavigate } from "react-router-dom";

export default function Link({ sx, children, href, ...props }: BoxProps<"a">) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            component="a"
            onClick={(e: MouseEvent) => {
                if (href && href.startsWith("/")) {
                    e.preventDefault();
                    navigate(href);
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
