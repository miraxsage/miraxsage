import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getThemeColor } from "./contexts/Theme";
import { ListItemIcon, Menu, MenuItem, BreadcrumbsProps } from "@mui/material";
import { AtLeastOneImportantFieldFromGiven } from "@/types/common";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CustomChip } from "./Chip";

type BasicBreadcrumbItem = {
    label: string;
    iconColor?: string;
    icon?: React.ReactElement;
    link?: string;
    onClick?: (item: BasicBreadcrumbItem) => void;
    subitems?: AtLeastOneImportantFieldFromGiven<Omit<BasicBreadcrumbItem, "subitems">, "link" | "onClick">[];
};

export type BreadcrumbItem = AtLeastOneImportantFieldFromGiven<BasicBreadcrumbItem, "subitems" | "link" | "onClick">;

export type CustomBreadcrumbsProps = {
    children: BreadcrumbItem[];
    withoutExpandIcon?: boolean;
} & Omit<BreadcrumbsProps, "children">;

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
        <>
            <Breadcrumbs sx={{ marginBottom: "18px", ...sx }} {...props}>
                {children.map((breadcrumb, i) => (
                    <CustomChip
                        component={
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            !breadcrumb.link ? undefined : (RouterLink as any)
                        }
                        sx={{
                            ...(breadcrumb.iconColor
                                ? {
                                      border: "1px solid transparent",
                                      transition: "all 0.3s",
                                      transitionProperty: "background, border-color, color",
                                      "& .MuiChip-icon": {
                                          color: breadcrumb.iconColor,
                                      },
                                      "&:hover": {
                                          borderColor: breadcrumb.iconColor,
                                          background: alpha(breadcrumb.iconColor, 0.1),
                                          color: getThemeColor("regularHoverText", theme),
                                      },
                                  }
                                : {}),
                        }}
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
                        onClick={(e: React.MouseEventHandler) => {
                            if (breadcrumb.link && breadcrumb.link != window.location.pathname)
                                return navigate(breadcrumb.link);
                            if (breadcrumb.subitems && breadcrumb.subitems.length) revealMenuHandler(breadcrumb)(e);
                            if (breadcrumb.onClick) breadcrumb.onClick(breadcrumb);
                        }}
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
                                if (item.link) {
                                    if (item.link.match(/(^http)|(^[^/]+\.)/)) window.open(item.link, "_blank");
                                    else navigate(item.link);
                                }
                                if (item.onClick) item.onClick(item);
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
        </>
    );
}
