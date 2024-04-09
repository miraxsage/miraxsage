import { HorizontalPanelButton, HorizontalPanelButtonProps } from "./PanelButtons";
import { useThemeColor } from "./contexts/Theme";

export function ToolbarButton({ children, sx, ...props }: HorizontalPanelButtonProps) {
    return (
        <HorizontalPanelButton
            dividerSize="squeezed"
            iconMode={true}
            sx={{
                padding: "8.2px 10.5px",
                "&:hover": {
                    background: useThemeColor("regularHoverBg"),
                },
                ...sx,
            }}
            iconSize="regular"
            {...props}
        >
            {children}
        </HorizontalPanelButton>
    );
}
