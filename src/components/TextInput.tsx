import { TextField, styled } from "@mui/material";
import { getThemeColor } from "./contexts/Theme";

const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.divider,
        color: getThemeColor("regularText", theme),
    },
    "& .MuiFormLabel-root": {
        color: getThemeColor("regularText", theme),
        "&.Mui-focused": {
            color: getThemeColor("accentedHoverText", theme),
        },
    },
    "& .MuiOutlinedInput-root": {
        "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: getThemeColor("regularText", theme),
            },
        },
    },
}));

export default CustomTextField;
