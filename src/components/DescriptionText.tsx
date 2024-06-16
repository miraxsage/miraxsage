import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

type DescriptionTextProps = {
    children: string | ReactNode;
    withoutBottomBorder?: boolean;
};

export default function DescriptionText({ children, withoutBottomBorder }: DescriptionTextProps) {
    const theme = useTheme();
    return (
        <Box
            tabIndex={-1}
            sx={{
                userSelect: "text",
                cursor: "auto",
                borderStyle: "solid",
                borderColor: theme.palette.divider,
                borderWidth: withoutBottomBorder ? "1px 0px 0px 1px" : "1px 0px 1px 1px",
                padding: "6px 14px",
                "@media (max-width: 375px)": {
                    hyphens: "auto",
                },
            }}
        >
            {children}
        </Box>
    );
}
