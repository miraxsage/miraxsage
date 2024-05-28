import LastPageIcon from "@mui/icons-material/LastPage";
import { useAsideMenuVisibility } from "@/store/appearanceSlice";
import { motion } from "framer-motion";
import { ToolbarButton } from "../ToolbarButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

export function RevealAsideMenuButton() {
    const asideMenuVisibility = useAsideMenuVisibility();
    const theme = useTheme();
    const lessMd = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <motion.div
            style={{
                overflow: "hidden",
                display: "flex",
            }}
            initial={false}
            animate={{
                maxWidth: asideMenuVisibility.collapsed && !lessMd ? "40px" : "0px",
            }}
        >
            <ToolbarButton dividerSize="full" onClick={() => asideMenuVisibility.update("shown")}>
                <LastPageIcon />
            </ToolbarButton>
        </motion.div>
    );
}
