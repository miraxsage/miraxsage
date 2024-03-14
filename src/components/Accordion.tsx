import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, styled } from "@mui/material";
import { ReactNode } from "react";
import { getThemeColor } from "./contexts/Theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type CustomAccordionProps = {
    icon?: ReactNode;
    title: string;
    children: ReactNode;
} & Omit<AccordionProps, "children">;

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    background: getThemeColor("titleBg", theme),
    borderWidth: "1px 1px 0px 1px",
    borderStyle: "solid",
    boxShadow: "none",
    overflow: "hidden",
    borderColor: theme.palette.divider,
    color: getThemeColor("regularText", theme),
    "&:first-of-type": {
        borderRadius: "6px 6px 0px 0px",
    },
    "&:last-of-type": {
        borderRadius: "0px 0px 6px 6px",
        borderBottomWidth: "1px",
    },
    "& .title-container": {
        display: "flex",
        "& .MuiSvgIcon-root": {
            fontSize: "22px",
            marginRight: "12px",
        },
    },
    "& .MuiAccordionSummary-root": {
        minHeight: "42px",
        padding: "0px 14px",
        borderStyle: "solid",
        borderColor: getThemeColor("titleBg", theme),
        borderBottomWidth: "1px",
        transition: "border 0.1s linear 0.2s",
        "& .MuiSvgIcon-root": {
            color: getThemeColor("regularIcon", theme),
        },
    },
    "& .MuiAccordionSummary-content": {
        margin: "8px 0px",
    },
    "& .MuiAccordionDetails-root": {
        padding: "0px",
        background: getThemeColor("layoutBackground", theme),
    },
    "&.Mui-expanded": {
        borderRadius: "6px",
        borderBottomWidth: "1px",
        "& .MuiAccordionSummary-root": {
            minHeight: "42px",
            transition: "border 0.1s",
            borderColor: theme.palette.divider,
        },
        "& .MuiAccordionSummary-content": {
            margin: "8px 0px",
        },
    },
    "&.next-expanded": {
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
        borderBottomWidth: "1px",
    },
    "&.prev-expanded": {
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
    },
}));

export default function CustomAccordion({ title, children, icon, ...props }: CustomAccordionProps) {
    return (
        <StyledAccordion {...props}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="title-container">
                    {icon}
                    {title}
                </div>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </StyledAccordion>
    );
}
