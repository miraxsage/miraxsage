import CustomBreadcrumbs, { CustomBreadcrumbsProps } from "@/components/Breadcrumbs";
import __ from "@/utilities/transtation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ProjectsList, projects } from "./Projects";
import { ToolbarButton } from "@/components/ToolbarButton";
import { useNavigate } from "react-router-dom";
import { useAppearance } from "@/store/appearanceSlice";
import { RevealAsideMenuButton } from "@/components/layout/RevealAsideMenuButton";

export type ProjectsBreadcrumbsProps = {
    project?: ProjectsList;
    onBack?: () => void;
};

export default function ProjectsBreadcrumbs({ project, onBack }: ProjectsBreadcrumbsProps) {
    const navigate = useNavigate();
    const theme = useTheme();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const lang = useAppearance().language;
    return (
        <Box sx={{ display: "flex", borderBottom: 1, borderColor: "divider" }}>
            <RevealAsideMenuButton />
            {project && (
                <ToolbarButton
                    sx={{ paddingLeft: "10.5px", paddingRight: "10.5px" }}
                    onClick={onBack ? onBack : () => navigate(-1)}
                >
                    <ArrowBackIcon />
                </ToolbarButton>
            )}
            <CustomBreadcrumbs sx={{ padding: "6px 8px", margin: 0, flexGrow: 1 }}>
                {(() => {
                    const items = [
                        ...(lessSm ? [] : [{ label: "Miraxsage", link: "/" }]),
                        ...(lessSm && project
                            ? []
                            : [
                                  {
                                      label: __("Projects"),
                                      onClick: () => navigate("/projects"),
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
                              ]),
                        ...(project
                            ? [
                                  {
                                      label: projects.find((p) => p.slug == project)?.shortName[lang],
                                      subitems: projects
                                          .filter((p) => p.slug != project)
                                          .map((p) => ({ label: p.shortName[lang], link: `/projects/${p.slug}` })),
                                  },
                              ]
                            : []),
                    ];
                    return items as CustomBreadcrumbsProps["children"];
                })()}
            </CustomBreadcrumbs>
        </Box>
    );
}
