import { ReactContentProps } from "@/types/react";
import { SxProps, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentProps } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { ReactNode, forwardRef } from "react";
import { getThemeColor } from "./contexts/Theme";

export type CustomScrollbarProps = {
    children: ReactNode;
    top?: string;
    right?: string;
    bottom?: string;
    padding?: string;
    horizontal?: {
        left?: string;
        right?: string;
        bottom?: string;
        padding?: string;
    };
    sx?: SxProps;
} & OverlayScrollbarsComponentProps;

const CustomScrollbar = forwardRef(
    ({ children, top, right, bottom, padding, sx = {}, horizontal = {}, ...props }: CustomScrollbarProps, ref) => {
        if (!right && !bottom && !top && !padding) padding = "4px";
        const { left: hleft, right: hright, bottom: hbottom, padding: hpadding } = horizontal;
        return (
            <Box
                ref={ref}
                className="h-full"
                sx={{
                    "& .os-scrollbar.os-scrollbar-vertical, & .os-scrollbar.os-scrollbar-vertical.os-scrollbar-cornerless":
                        {
                            top: padding ?? top ?? 0,
                            right: padding ?? right ?? 0,
                            bottom: padding ?? bottom ?? 0,
                        },
                    "& .os-scrollbar.os-scrollbar-horizontal, & .os-scrollbar.os-scrollbar-horizontal.os-scrollbar-cornerless":
                        {
                            left: hpadding ?? hleft ?? padding ?? 0,
                            right: hpadding ?? hright ?? padding ?? 0,
                            bottom: hpadding ?? hbottom ?? padding ?? 0,
                        },
                    ...sx,
                }}
            >
                <OverlayScrollbarsComponent
                    style={{ height: "100%" }}
                    options={{ scrollbars: { autoHide: "move" } }}
                    {...props}
                >
                    {children}
                </OverlayScrollbarsComponent>
            </Box>
        );
    }
);

export default CustomScrollbar;

export function CustomScrollbarStylesContainer({ children }: ReactContentProps) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                "& .os-scrollbar": {
                    "--os-handle-bg": getThemeColor("scrollbarHandle", theme),
                    "--os-handle-bg-hover": getThemeColor("scrollbarHoverHandle", theme),
                    "--os-handle-bg-active": getThemeColor("scrollbarHoverHandle", theme),
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
