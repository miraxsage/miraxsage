import { Box, useTheme } from "@mui/material";

type DescriptionTextProps = {
    children: string;
};

export default function DescriptionText({ children }: DescriptionTextProps) {
    const theme = useTheme();
    return (
        <Box
            tabIndex={-1}
            sx={{
                userSelect: "text",
                cursor: "auto",
                borderStyle: "solid",
                borderColor: theme.palette.divider,
                borderWidth: "1px 0px 1px 1px",
                padding: "6px 14px",
            }}
        >
            {children}
        </Box>
    );
}
