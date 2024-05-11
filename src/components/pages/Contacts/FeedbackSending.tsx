import { SimpleSpinner } from "@/components/Spinners";
import { getThemeColor } from "@/components/contexts/Theme";
import __ from "@/utilities/transtation";
import { Alert, Box, Button, SxProps, alpha, useTheme } from "@mui/material";

export type FeedbackSendingProps = {
    sx?: SxProps;
    status: "loading" | "error" | "success";
    message?: string;
    onClick?: () => void;
};
export function FeedbackSending({ status, message, onClick, sx }: FeedbackSendingProps) {
    const theme = useTheme();
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
                {__(status == "loading" ? "Cancel" : "Close")}
            </Button>
        </Box>
    );
}
