import LastPageIcon from "@mui/icons-material/LastPage";
import { useAsideMenuVisibility } from "@/store/appearanceSlice";
import { motion } from "framer-motion";
import { ToolbarButton } from "../ToolbarButton";

export function RevealAsideMenuButton() {
    const asideMenuVisibility = useAsideMenuVisibility();
    return (
        <motion.div
            style={{
                overflow: "hidden",
                display: "flex",
            }}
            initial={false}
            animate={{
                maxWidth: asideMenuVisibility.collapsed ? "40px" : "0px",
            }}
        >
            <ToolbarButton dividerSize="full" onClick={() => asideMenuVisibility.update("shown")}>
                <LastPageIcon />
            </ToolbarButton>
        </motion.div>
    );
}
