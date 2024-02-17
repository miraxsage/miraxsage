import { Button, styled } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import classes from "classnames";
import { ReactNode } from "react";
import { getThemeColor } from "./Contexts/Theme";

const PanelButton = styled(Button)(({ theme }) => ({
    color: getThemeColor("tabIcon", theme),
    borderRadius: 0,
    padding: "12px 22px",
    "&:hover": {
        backgroundColor: getThemeColor("tabHoverBg", theme),
        color: getThemeColor("tabHoverIcon", theme),
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
    if (iconMode && sx)
        sx = {
            padding: "12px 18px",
            minWidth: 0,
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
