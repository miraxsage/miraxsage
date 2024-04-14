import { Box, BoxProps, alpha, useTheme } from "@mui/material";
import { getThemeColor } from "./contexts/Theme";

export default function Link({ sx, children, ...props }: BoxProps<"a">) {
    const theme = useTheme();
    return (
        <Box
            component="a"
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
            {...props}
        >
            {children}
        </Box>
    );
}
