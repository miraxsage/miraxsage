import { Box, GlobalStyles, alpha, useTheme } from "@mui/material";

export type FloatingLineProps = {
    shift?: number;
};
export default function FloatingLine({ shift }: FloatingLineProps) {
    shift = shift ?? Math.round(Math.random() * 50) - 25;
    const duration = 200;
    const maxShift = 25;
    const absShift = maxShift * 2;
    const theme = useTheme();
    return (
        <>
            <GlobalStyles
                styles={{
                    "@keyframes floating-line": {
                        "0%": {
                            transform: "translateY(-50%) rotate(0deg)",
                        },
                        "50%": {
                            transform: "translateY(-50%) rotate(180deg)",
                        },
                        "100%": {
                            transform: "translateY(-50%) rotate(360deg)",
                        },
                    },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    height: "200vmax",
                    width: "1px",
                    left: "50%",
                    top: "50%",
                    background: alpha(theme.palette.divider, 0.6),
                    animation: "floating-line 120s linear infinite",
                }}
                style={{
                    animationDuration: `${duration}s`,
                    animationDelay: `-${((maxShift + shift) / absShift) * duration * 1.2}s`,
                    transformOrigin: `${shift}vw ${Math.round(50 + shift / 3)}%`,
                }}
            ></Box>
        </>
    );
}
