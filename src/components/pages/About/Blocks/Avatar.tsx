import MiraxsageIcon from "@/components/icons/MiraxsageIcon";
import { Box, alpha, useTheme } from "@mui/material";

export default function Avatar() {
    const theme = useTheme();
    const gridPaleColor = alpha(theme.palette.divider, 0.25);
    const gridStrongColor = alpha(theme.palette.divider, 0.4);
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `repeating-linear-gradient(
                    to right,
                    transparent 0px,
                    transparent 9px,
                    ${gridPaleColor} 9px,
                    ${gridPaleColor} 10px
                  ),
                  repeating-linear-gradient(
                    to right,
                    transparent 0px,
                    transparent 49px,
                    ${gridStrongColor} 49px,
                    ${gridStrongColor} 50px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 9px,
                    ${gridPaleColor} 9px,
                    ${gridPaleColor} 10px
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 49px,
                    ${gridStrongColor} 49px,
                    ${gridStrongColor} 50px
                  )`,
            }}
        >
            <Box sx={{ width: "248px" }}>
                <MiraxsageIcon />
            </Box>
        </Box>
    );
}
