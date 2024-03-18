import * as React from "react";
import { lighten, styled, useTheme } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getThemeColor } from "./contexts/Theme";
import { ListItemIcon, Menu, MenuItem, BreadcrumbsProps } from "@mui/material";
import { AtLeastOneImportantFieldFromGiven } from "@/types/common";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type BasicBreadcrumbItem = {
    label: string;
    icon?: React.ReactElement;
    link: string;
    subitems: Omit<BasicBreadcrumbItem, "subitems">[];
};

export type BreadcrumbItem = AtLeastOneImportantFieldFromGiven<BasicBreadcrumbItem, "subitems" | "link">;

export type CustomBreadcrumbsProps = {
    children: BreadcrumbItem[];
    withoutExpandIcon?: boolean;
} & Omit<BreadcrumbsProps, "children">;

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = getThemeColor("layoutBackground", theme);
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: getThemeColor("regularText", theme),
        fontSize: "1.1rem",
        cursor: "pointer",
        "&:hover, &:focus": {
            backgroundColor: getThemeColor("regularHoverBg", theme),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: lighten(getThemeColor("regularHoverBg", theme), 0.05),
        },
        "& .MuiChip-icon": {
            color: getThemeColor("regularIcon", theme),
            fontSize: "20px",
        },
    };
}) as typeof Chip;

const expandMoreIcon = <ExpandMoreIcon />;
const homeIcon = <HomeIcon />;

export default function CustomBreadcrumbs({
    children,
    withoutExpandIcon = false,
    sx,
    ...props
}: CustomBreadcrumbsProps) {
    const [openedItem, setOpenedItem] = React.useState<{
        breadcrumb: BreadcrumbItem;
        ref: HTMLElement;
    } | null>(null);

    const theme = useTheme();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const revealMenuHandler = (breadcrumb: BreadcrumbItem) => (e: any) => {
        const container = e.target.closest(".MuiBreadcrumbs-li");
        setOpenedItem({
            breadcrumb,
            ref: container,
        });
    };

    return (
        <div>
            <Breadcrumbs sx={{ marginBottom: "18px", ...sx }} {...props}>
                {children.map((breadcrumb, i) => (
                    <StyledBreadcrumb
                        component={
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            !breadcrumb.link ? undefined : (RouterLink as any)
                        }
                        to={breadcrumb.link}
                        label={breadcrumb.label}
                        icon={breadcrumb.icon || (i == 0 && !breadcrumb.subitems?.length ? homeIcon : undefined)}
                        key={breadcrumb.label}
                        deleteIcon={!withoutExpandIcon ? expandMoreIcon : <div></div>}
                        onDelete={
                            !breadcrumb.subitems || !breadcrumb.subitems.length
                                ? undefined
                                : revealMenuHandler(breadcrumb)
                        }
                        onClick={
                            breadcrumb.subitems && breadcrumb.subitems.length && withoutExpandIcon
                                ? revealMenuHandler(breadcrumb)
                                : undefined
                        }
                    />
                ))}
            </Breadcrumbs>
            {openedItem && openedItem.breadcrumb.subitems?.length && (
                <Menu
                    anchorEl={openedItem.ref}
                    open={true}
                    onClose={() => setOpenedItem(null)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    sx={{ marginTop: "5px" }}
                >
                    {openedItem.breadcrumb.subitems.map((item) => (
                        <MenuItem
                            key={item.label}
                            onClick={() => {
                                setOpenedItem(null);
                                if (item.link.match(/(^http)|(^[^/]+\.)/)) window.open(item.link, "_blank");
                                else navigate(item.link);
                            }}
                            sx={{ color: getThemeColor("menuText", theme) }}
                        >
                            {item.icon && (
                                <ListItemIcon
                                    sx={{
                                        color: getThemeColor("menuText", theme),
                                        "& .MuiSvgIcon-root": {
                                            fontSize: "20px",
                                        },
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            )}
                            {item.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </div>
    );
}
