import { ToolbarButton } from "@/components/ToolbarButton";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { motion } from "framer-motion";
import { Box, useTheme } from "@mui/material";
import { getThemeColor } from "./contexts/Theme";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

type CategoriesToolbarFoldProps = {
    onUnfold: () => void;
    onFold: () => void;
    onClose?: () => void;
    onFilter?: () => void;
    onFilterClear?: () => void;
};
type CategoriesToolbarCollapseProps =
    | ({ collapsed: boolean; onRevealCollapse: (collapse: boolean) => void } & CategoriesToolbarFoldProps)
    | { collapsed?: never; onRevealCollapse?: never };

type CategoriesToolbarProps = CategoriesToolbarFoldProps & CategoriesToolbarCollapseProps;

export default function CategoriesToolbar({
    collapsed,
    onRevealCollapse,
    onUnfold,
    onFold,
    onClose,
    onFilter,
    onFilterClear,
}: CategoriesToolbarProps) {
    const theme = useTheme();
    return (
        <motion.div
            initial={false}
            style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            animate={{ maxWidth: collapsed ? "0px" : "250px" }}
            className="flex"
        >
            {onFilter && (
                <ToolbarButton
                    onClick={onFilter}
                    dividerSide="right"
                    dividerSize="full"
                    sx={{
                        minWidth: "39px",
                        backgroundColor: getThemeColor("accentedBg", theme) + " !important",
                        color: theme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: getThemeColor("accentedHoverBg", theme) + " !important",
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    <FilterAltIcon />
                </ToolbarButton>
            )}
            <Box
                sx={{
                    flexGrow: 1,
                    justifyContent: "right",
                }}
                className="flex"
            >
                {onRevealCollapse && (
                    <ToolbarButton
                        sx={{ paddingLeft: "9px", paddingRight: "9px" }}
                        onClick={() => onRevealCollapse(!collapsed)}
                    >
                        {collapsed ? <LastPageIcon /> : <FirstPageIcon />}
                    </ToolbarButton>
                )}
                <ToolbarButton onClick={onUnfold}>
                    <UnfoldMoreIcon />
                </ToolbarButton>
                <ToolbarButton onClick={onFold} dividerSize={onClose || onFilterClear ? "squeezed" : "collapsed"}>
                    <UnfoldLessIcon />
                </ToolbarButton>
                {onClose && (
                    <ToolbarButton
                        sx={{ paddingLeft: "9px", paddingRight: "9px" }}
                        dividerSide="right"
                        dividerSize={!onFilterClear ? "collapsed" : "squeezed"}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </ToolbarButton>
                )}
                {onFilterClear && (
                    <ToolbarButton
                        sx={{ paddingLeft: "9px", paddingRight: "9px" }}
                        dividerSize="collapsed"
                        onClick={onFilterClear}
                    >
                        <FilterAltOffIcon />
                    </ToolbarButton>
                )}
            </Box>
        </motion.div>
    );
}
