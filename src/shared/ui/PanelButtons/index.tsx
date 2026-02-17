"use client";

import { Button, styled } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import { ReactNode } from "react";
import { getThemeColor } from "@/shared/lib/theme";

const PanelButton = styled(Button)(({ theme }) => ({
    color: getThemeColor("tabIcon", theme),
    borderRadius: 0,
    padding: "12px 22px",
    "&:hover": {
        backgroundColor: getThemeColor("tabHoverBg", theme),
        color: getThemeColor("tabHoverIcon", theme),
    },
}));

export interface HorizontalPanelButtonProps {
    dividerSide?: "left" | "right";
    dividerSize?: "full" | "squeezed" | "collapsed" | "removed";
    iconMode?: boolean;
    iconSize?: "large" | "regular" | "small";
    children?: ReactNode;
    sx?: SxProps<Theme> | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const HorizontalPanelButton: React.FC<HorizontalPanelButtonProps> = ({
    dividerSide = "right",
    dividerSize = "full",
    iconMode = false,
    iconSize = "large",
    sx = {},
    ...props
}) => {
    if (iconMode && sx)
        sx = {
            minWidth: 0,
            ...(iconSize == "large"
                ? { padding: "12px 18px" }
                : {
                      padding: "8px 9.5px",
                      "& .MuiSvgIcon-root": {
                          fontSize: iconSize == "small" ? "17px" : "21px",
                      },
                  }),
            ...sx,
        };

    const dividerStyles = (size: string) => ({
        height: "100%",
        position: "relative" as const,
        display: "flex",
        alignItems: "center",
    });

    const barStyles = (size: string) => ({
        width: "1px",
        backgroundColor: "divider",
        ...(size === "full"
            ? { height: "100%" }
            : size === "squeezed"
            ? { height: "50%" }
            : { display: "none" }),
    });

    return (
        <>
            {dividerSide == "left" && dividerSize != "removed" && (
                <Box sx={dividerStyles(dividerSize)}>
                    <Box sx={barStyles(dividerSize)} />
                </Box>
            )}
            <PanelButton sx={sx} {...props} />
            {dividerSide == "right" && dividerSize != "removed" && (
                <Box sx={dividerStyles(dividerSize)}>
                    <Box sx={barStyles(dividerSize)} />
                </Box>
            )}
        </>
    );
};

export default PanelButton;
