import { Box, SxProps, styled, useTheme } from "@mui/material";
import { getThemeColor } from "@/components/contexts/Theme";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, ReactNode } from "react";
import { AllUnionStringCombinations } from "@/types/common";

const DescriptionElement = styled(Box, { shouldForwardProp: (prop) => prop != "withoutPadding" })<{
    withoutPadding?: boolean;
}>(({ theme, withoutPadding }) => ({
    padding: withoutPadding ? "0px" : "6px 14px",
    "&:nth-of-type(n + 2)": {
        borderStyle: "solid",
        borderTopWidth: "1px",
        borderColor: theme.palette.divider,
    },
}));

export type LinkButton = {
    link?: string;
    children?: ReactNode;
    sx?: SxProps;
    borders?: AllUnionStringCombinations<"top" | "right" | "bottom" | "left">;
    withoutBorders?: boolean;
    onClick?: MouseEventHandler;
};

export function LinkButton({ link, children, sx, borders, withoutBorders = false, onClick }: LinkButton) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            component="a"
            sx={{
                display: "block",
                padding: "8px 18px",
                borderStyle: "solid",
                userSelect: "none",
                lineHeight: 1.25,
                borderWidth: !withoutBorders
                    ? borders == undefined
                        ? "1px"
                        : `${borders.includes("top") ? 1 : 0}px ${borders.includes("right") ? 1 : 0}px ${
                              borders.includes("bottom") ? 1 : 0
                          }px ${borders.includes("left") ? 1 : 0}px `
                    : "0px",
                borderColor: theme.palette.divider,
                color: getThemeColor("regularText", theme),
                cursor: !link ? "auto" : "pointer",
                "&:last-child": { borderRightWidth: 0 },
                "&:hover":
                    !link && !onClick
                        ? {}
                        : {
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                              transition: "background 0.25s",
                              background: getThemeColor("titleBg", theme),
                          },
                "& .MuiSvgIcon-root": {
                    color: getThemeColor("regularIcon", theme),
                },
                ...sx,
            }}
            onClick={(e) => {
                if (onClick) onClick(e);
                if (link) {
                    e.preventDefault();
                    navigate(link);
                }
            }}
        >
            {children}
        </Box>
    );
}

const DescriptionButtonsContainer = styled(Box)(() => ({
    display: "flex",
}));

export type DescriptionPanelProps = {
    children: {
        elements: ReactNode[];
        buttons?: { label: string; icon?: ReactNode; link: string }[];
    };
    withoutBottomBorder?: boolean;
    withoutBorders?: boolean;
};

export default function DescriptionPanel({
    children: { elements, buttons },
    withoutBottomBorder,
    withoutBorders,
}: DescriptionPanelProps) {
    const theme = useTheme();
    return (
        <Box
            tabIndex={-1}
            sx={{
                userSelect: "text",
                cursor: "auto",
                borderStyle: "solid",
                borderColor: theme.palette.divider,
                borderWidth: withoutBorders ? "none" : withoutBottomBorder ? "1px 0px 0px 1px" : "1px 0px 1px 1px",
            }}
        >
            {elements && elements.length
                ? elements.map((element, i) => (
                      <DescriptionElement withoutPadding={typeof element != "string"} key={i}>
                          {element}
                      </DescriptionElement>
                  ))
                : null}
            {buttons && buttons.length ? (
                <DescriptionButtonsContainer>
                    {buttons.map((b, i) => (
                        <LinkButton key={i} link={b.link}>
                            {b.icon && (
                                <Box
                                    component="span"
                                    sx={{ "& .MuiSvgIcon-root": { fontSize: "20px" }, marginRight: "8px" }}
                                >
                                    {b.icon}
                                </Box>
                            )}
                            {b.label}
                        </LinkButton>
                    ))}
                    <LinkButton sx={{ flexGrow: 1 }} />
                </DescriptionButtonsContainer>
            ) : null}
        </Box>
    );
}
