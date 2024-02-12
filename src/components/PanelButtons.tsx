import { Button, alpha, lighten, styled, useTheme } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import classes from "classnames";
import { ReactNode } from "react";

const PanelButton = styled(Button)(({ theme }) => ({
    color: lighten(theme.palette.divider, 0.25),
    borderRadius: 0,
    padding: "12px 22px",
    "&:hover": {
        backgroundColor: alpha(theme.palette.divider, 0.1),
        color: theme.palette.contrast.main,
    },
}));

export const HorizontalPanelButton: React.FC<{
    dividerSide?: "left" | "right";
    dividerSize?: "full" | "squeezed";
    iconMode?: boolean;
    children?: ReactNode;
    sx?: SxProps<Theme> | undefined;
}> = ({
    dividerSide = "right",
    dividerSize = "full",
    iconMode = false,
    sx = {},
    ...props
}) => {
    const theme = useTheme();
    if (iconMode && sx)
        sx = {
            padding: "12px 18px",
            minWidth: 0,
            color: lighten(theme.palette.divider, 0.1),
            ...sx,
        };
    return (
        <>
            {dividerSide == "left" && (
                <div className="h-full relative flex items-center">
                    <Box
                        sx={{ backgroundColor: "divider" }}
                        className={classes("w-px", {
                            "h-full": dividerSize == "full",
                            "h-2/4": dividerSize == "squeezed",
                        })}
                    ></Box>
                </div>
            )}
            <PanelButton sx={sx} {...props} />
            {dividerSide == "right" && (
                <div className="h-full relative flex items-center">
                    <Box
                        sx={{ backgroundColor: "divider" }}
                        className={classes("w-px", {
                            "h-full": dividerSize == "full",
                            "h-1/2": dividerSize == "squeezed",
                        })}
                    ></Box>
                </div>
            )}
        </>
    );
};

export default PanelButton;
