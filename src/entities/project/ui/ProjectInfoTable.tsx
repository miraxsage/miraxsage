"use client";
import DescriptionTable from "@/shared/ui/DescriptionTable";
import { ProjectInterface, ProjectsList, getProjectsArray } from "@/entities/project/model/projects";
import { useAppearance } from "@/shared/lib/store/appearanceSlice";
import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import { capitalize } from "@/shared/lib/string";
import TechnologiesCrumbs from "@/shared/ui/TechnologiesCrumbs";
import Link from "@/shared/ui/Link";
import { Box } from "@mui/material";

export default function ProjectInfoTable({ project: slug }: { project: ProjectsList }) {
    const project: ProjectInterface = getProjectsArray().find((p) => p.slug == slug)!;
    const lang = useAppearance().language;
    const t = useUiLabels();
    return (
        <Box sx={{ marginLeft: "-1px" }}>
            <DescriptionTable withoutTopBorder={true} withoutBottomBorder={true} maxWidth="1 col">
                {[
                    [t("Full name"), project.name[lang], { fullLine: true }],
                    [t("Description"), project.description[lang], { fullLine: true }],
                    [t("Technologies"), <TechnologiesCrumbs techs={project.technologies} />, { fullLine: true }],
                    [t("Domain area"), __(project.domain)],
                    [t("Rating"), `[Score ${project.rating}/5]`],
                    [t("Year"), project.year.toString()],
                    [t("Status"), __(capitalize(project.status))],
                    [t("Participating"), __(capitalize(project.participating))],
                    [t("Development period"), project.devTimeMonths + " " + t("mon.")],
                    [
                        t("Github link"),
                        project.gitHubLink ? (
                            <Link href={project.gitHubLink} target="_blank">
                                {project.gitHubLink}
                            </Link>
                        ) : (
                            "-"
                        ),
                        { fullLine: true },
                    ],
                ]}
            </DescriptionTable>
        </Box>
    );
}
