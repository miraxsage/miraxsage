import { getThemeColor } from "@/components/contexts/Theme";
import { useColorMode } from "@/store/appearanceSlice";
import { Box, GlobalStyles, alpha, useTheme } from "@mui/material";

export default function FloatingBlock() {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    return (
        <>
            <GlobalStyles
                styles={{
                    "@keyframes floating-block": {
                        "0%": {
                            transform: "translateX(-25%) rotate(-12deg)",
                        },
                        "50%": {
                            transform: "translateX(-25%) rotate(12deg)",
                        },
                        "100%": {
                            transform: "translateX(-25%) rotate(-12deg)",
                        },
                    },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    height: "200%",
                    width: "250%",
                    bottom: "70%",
                    background: isDarkMode
                        ? getThemeColor("barBackground", theme)
                        : `linear-gradient(180deg, #ffffff 80%, ${getThemeColor("barBackground", theme)})`,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    borderWidth: "0px 0px 1px 0px",
                    transformOrigin: "50% -20%",
                    rotate: "0deg",
                    animation: "floating-block 60s linear infinite",
                }}
            ></Box>
        </>
    );
}
