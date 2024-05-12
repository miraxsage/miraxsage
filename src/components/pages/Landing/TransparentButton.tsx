import { HorizontalPanelButton, HorizontalPanelButtonProps } from "@/components/PanelButtons";
import { useColorMode } from "@/store/appearanceSlice";
import { useLandingColor } from ".";
import { lighten } from "@mui/material";

export default function TransparentButton({ sx, ...props }: HorizontalPanelButtonProps) {
    const isDarkMode = useColorMode().dark;
    const accentColor = useLandingColor("accentA");
    const contrastColor = useLandingColor("contrast");
    const textColor = lighten(contrastColor, 0.2);
    return (
        <HorizontalPanelButton
            dividerSide="right"
            dividerSize="squeezed"
            iconMode={true}
            sx={{
                ...(isDarkMode ? {} : { color: textColor }),
                "&:hover": {
                    background: "transparent",
                    ...(isDarkMode ? { color: contrastColor } : { color: accentColor }),
                },
                ...sx,
            }}
            {...props}
        />
    );
}
