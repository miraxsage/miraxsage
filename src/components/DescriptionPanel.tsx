import { Box, SxProps, styled, useTheme } from "@mui/material";
import { getThemeColor } from "@/components/contexts/Theme";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

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

function DescriptionButton({ link, children, sx }: { link?: string; children?: ReactNode; sx?: SxProps }) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            component="a"
            sx={{
                display: "block",
                padding: "8px 18px",
                borderStyle: "solid",
                borderWidth: "1px 1px 0px 0px",
                borderColor: theme.palette.divider,
                color: getThemeColor("regularText", theme),
                cursor: !link ? "auto" : "pointer",
                "&:last-child": { borderRightWidth: 0 },
                "&:hover": !link
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
            onClick={
                link
                    ? (e) => {
                          e.preventDefault();
                          navigate(link);
                      }
                    : undefined
            }
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
                        <DescriptionButton key={i} link={b.link}>
                            {b.icon && (
                                <Box
                                    component="span"
                                    sx={{ "& .MuiSvgIcon-root": { fontSize: "20px" }, marginRight: "8px" }}
                                >
                                    {b.icon}
                                </Box>
                            )}
                            {b.label}
                        </DescriptionButton>
                    ))}
                    <DescriptionButton sx={{ flexGrow: 1 }} />
                </DescriptionButtonsContainer>
            ) : null}
        </Box>
    );
}
