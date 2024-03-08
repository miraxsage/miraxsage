import { ReactContentProps } from "@/types/react";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { ReactNode } from "react";
import { getThemeColor } from "./contexts/Theme";

export type CustomScrollbarProps = {
    children: ReactNode;
    top?: string;
    right?: string;
    bottom?: string;
};

export default function CustomScrollbar({
    children,
    top,
    right,
    bottom,
}: CustomScrollbarProps) {
    return (
        <Box
            className="flex flex-col overflow-hidden"
            sx={{
                "& .os-scrollbar.os-scrollbar-vertical.os-scrollbar-cornerless":
                    {
                        top: top ?? 0,
                        right: right ?? 0,
                        bottom: bottom ?? 0,
                    },
            }}
        >
            <OverlayScrollbarsComponent
                options={{ scrollbars: { autoHide: "move" } }}
            >
                {children}
            </OverlayScrollbarsComponent>
        </Box>
    );
}

export function CustomScrollbarStylesContainer({
    children,
}: ReactContentProps) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                "& .os-scrollbar": {
                    "--os-handle-bg": getThemeColor("scrollbarHandle", theme),
                    "--os-handle-bg-hover": getThemeColor(
                        "scrollbarHoverHandle",
                        theme
                    ),
                    "--os-handle-bg-active": getThemeColor(
                        "scrollbarHoverHandle",
                        theme
                    ),
                    "--os-size": "6.5px",
                    "--os-padding-perpendicular": "2px",
                },
                "& .os-scrollbar-vertical .os-scrollbar-handle:before": {
                    left: "-2px",
                    right: "-3px",
                },
            }}
        >
            {children}
        </Box>
    );
}
