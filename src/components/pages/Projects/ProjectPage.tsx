import { Box } from "@mui/material";
import ProjectsBreadcrumbs from "./ProjectsBreadcrumbs";

export default function ProjectPage() {
    return (
        <Box className="grid h-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
            <ProjectsBreadcrumbs />
        </Box>
    );
}
