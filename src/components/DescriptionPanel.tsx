import { Box, SxProps, styled, useTheme } from "@mui/material";
import { getThemeColor } from "@/components/contexts/Theme";
import { MouseEventHandler, ReactNode } from "react";
import { useNavigate } from "@/utilities/common";

const DescriptionElement = styled(Box, { shouldForwardProp: (prop) => prop != "withoutPadding" })<{
    withoutPadding?: boolean;
}>(({ theme, withoutPadding }) => ({
    padding: withoutPadding ? "0px" : "6px 14px",
    "&:nth-of-type(n + 2)": {
        borderStyle: "solid",
        borderTopWidth: "1px",
        borderColor: theme.palette.divider,
    },
    "@media (max-width: 375px)": {
        hyphens: "auto",
    },
}));

export type LinkButton = {
    link?: string;
    children?: ReactNode;
    sx?: SxProps;
    borders?:
        | "top"
        | "right"
        | "bottom"
        | "left"
        | "top-right"
        | "top-right-bottom"
        | "right-bottom"
        | "right-bottom-left"
        | "bottom-left"
        | "bottom-left-top"
        | "left-top"
        | "left-top-right"
        | "all"
        | "none";
    onClick?: MouseEventHandler;
};

export function LinkButton({ link, children, sx, borders, onClick }: LinkButton) {
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
                borderWidth:
                    borders == "none" || !borders
                        ? "0px"
                        : borders == "all"
                        ? "1px"
                        : `${borders.includes("top") ? 1 : 0}px ${borders.includes("right") ? 1 : 0}px ${
                              borders.includes("bottom") ? 1 : 0
                          }px ${borders.includes("left") ? 1 : 0}px `,
                borderColor: theme.palette.divider,
                color: getThemeColor("regularText", theme),
                cursor: !link && !onClick ? "auto" : "pointer",
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

const DescriptionButtonsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    borderWidth: "1px 0px 0px 0px",
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
                        <LinkButton key={i} link={b.link} borders="right" sx={{ textAlign: "center" }}>
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
