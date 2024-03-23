import { lighten, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { getThemeColor } from "./contexts/Theme";

export const CustomChip = styled(Chip)(({ theme }) => {
    const backgroundColor = getThemeColor("layoutBackground", theme);
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: getThemeColor("regularText", theme),
        fontSize: "1.1rem",
        cursor: "pointer",
        "&:hover, &:focus": {
            backgroundColor: getThemeColor("regularHoverBg", theme),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: lighten(getThemeColor("regularHoverBg", theme), 0.05),
        },
        "& .MuiChip-icon": {
            color: getThemeColor("regularIcon", theme),
            fontSize: "20px",
        },
    };
}) as typeof Chip;
