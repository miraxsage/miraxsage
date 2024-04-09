import CustomBreadcrumbs from "@/components/Breadcrumbs";
import __ from "@/utilities/transtation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material";

export default function ProjectsBreadcrumbs() {
    const theme = useTheme();
    return (
        <CustomBreadcrumbs sx={{ borderBottom: `1px solid ${theme.palette.divider}`, padding: "6px 8px", margin: 0 }}>
            {(() => {
                const items = [
                    { label: "Miraxsage", link: "/" },
                    {
                        label: __("Projects"),
                        subitems: [
                            {
                                label: __("Profile"),
                                icon: <AssignmentIndIcon />,
                                link: "/profile",
                            },
                            {
                                label: __("About"),
                                icon: <PersonIcon />,
                                link: "/about",
                            },
                            {
                                label: __("Interact"),
                                icon: <CallIcon />,
                                link: "/interact",
                            },
                        ],
                    },
                ];
                return items;
            })()}
        </CustomBreadcrumbs>
    );
}
