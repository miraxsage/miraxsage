"use client";
import { SimpleSpinner } from "@/shared/ui/Spinners";
import { getThemeColor } from "@/shared/lib/theme";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { Alert, Box, Button, SxProps, alpha, useTheme } from "@mui/material";

export type FeedbackSendingProps = {
    sx?: SxProps;
    status: "loading" | "error" | "success";
    message?: string;
    onClick?: () => void;
};
export function FeedbackSending({ status, message, onClick, sx }: FeedbackSendingProps) {
    const theme = useTheme();
    const t = useUiLabels();
    return (
        <Box
            sx={{
                background: alpha(getThemeColor("layoutBackground", theme), 0.9),
                backdropFilter: "blur(5px)",
                position: "relative",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
                ...sx,
            }}
        >
            {status == "loading" ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        gap: "20px",
                        alignItems: "center",
                        height: "51.5px",
                    }}
                >
                    <SimpleSpinner />
                    {message}
                </Box>
            ) : (
                <Alert variant="outlined" severity={status}>
                    {message}
                </Alert>
            )}
            <Button color={status == "loading" ? "regular" : status} onClick={onClick} variant="outlined">
                {t(status == "loading" ? "Cancel" : "Close")}
            </Button>
        </Box>
    );
}
