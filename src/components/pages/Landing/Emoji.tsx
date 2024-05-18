import { Box } from "@mui/material";

export default function Emoji({ e }: { e: string }) {
    return (
        <Box component="span" sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}>
            {e}
        </Box>
    );
}
