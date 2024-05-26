import { ToolbarButton } from "@/components/ToolbarButton";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

type CategoriesToolbarFoldProps = {
    onUnfold: () => void;
    onFold: () => void;
    onClose?: () => void;
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
}: CategoriesToolbarProps) {
    return (
        <motion.div initial={false} animate={{ maxWidth: collapsed ? "0px" : "230px" }} className="grid">
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    minWidth: collapsed ? "unset" : "230px",
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
                <ToolbarButton onClick={onFold}>
                    <UnfoldLessIcon />
                </ToolbarButton>
                {onClose && (
                    <ToolbarButton
                        sx={{ paddingLeft: "9px", paddingRight: "9px" }}
                        dividerSize="collapsed"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </ToolbarButton>
                )}
            </Box>
        </motion.div>
    );
}
