"use client";

import { HorizontalPanelButton, HorizontalPanelButtonProps } from "@/shared/ui/PanelButtons";
import { useThemeColor } from "@/shared/lib/theme";

export function ToolbarButton({
    children,
    sx,
    dividerSize = "squeezed",
    iconMode = true,
    iconSize = "regular",
    ...props
}: HorizontalPanelButtonProps) {
    return (
        <HorizontalPanelButton
            dividerSize={dividerSize}
            iconMode={iconMode}
            iconSize={iconSize}
            sx={{
                padding: "8.2px 9px",
                "&:hover": {
                    background: useThemeColor("regularHoverBg"),
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </HorizontalPanelButton>
    );
}
