import { Chip, type ChipProps } from "@mui/material";

export default function AdminKeyChip({ label, sx, ...props }: ChipProps) {
    return (
        <Chip
            label={label}
            size="small"
            variant="outlined"
            sx={{
                justifyContent: "flex-start",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                color: "#E4E4E5",
                "& .MuiChip-label": { padding: "6px 12px" },
                ...sx,
            }}
            {...props}
        />
    );
}
