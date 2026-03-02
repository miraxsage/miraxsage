"use client";
import CustomBreadcrumbs, { CustomBreadcrumbsProps } from "@/shared/ui/Breadcrumbs";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import CallIcon from "@mui/icons-material/Call";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ProjectsList, getProjectsArray } from "@/entities/project/model/projects";
import { ToolbarButton } from "@/shared/ui/ToolbarButton";
import { useAppearance } from "@/shared/lib/store/appearanceSlice";
import { RevealAsideMenuButton } from "@/widgets/layout/RevealAsideMenuButton";
import { useRouter } from "next/navigation";

export type ProjectsBreadcrumbsProps = {
    project?: ProjectsList;
    onBack?: () => void;
};

export default function ProjectsBreadcrumbs({ project, onBack }: ProjectsBreadcrumbsProps) {
    const router = useRouter();
    const theme = useTheme();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const lang = useAppearance().language;
    const t = useUiLabels();
    return (
        <Box sx={{ display: "flex", borderBottom: 1, borderColor: "divider" }}>
            <RevealAsideMenuButton />
            {project && (
                <ToolbarButton
                    sx={{ paddingLeft: "10.5px", paddingRight: "10.5px" }}
                    onClick={onBack ? onBack : () => router.back()}
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
                                      label: t("Projects"),
                                      onClick: () => router.push("/projects"),
                                      subitems: [
                                          {
                                              label: t("About"),
                                              icon: <AssignmentIndIcon />,
                                              link: "/about",
                                          },
                                          {
                                              label: t("Interact"),
                                              icon: <CallIcon />,
                                              link: "/interact",
                                          },
                                      ],
                                  },
                              ]),
                        ...(project
                            ? [
                                  {
                                      label: getProjectsArray().find((p) => p.slug == project)?.shortName[lang],
                                      subitems: getProjectsArray()
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
