"use client";
import DescriptionTable from "@/shared/ui/DescriptionTable";
import { ProjectInterface, ProjectsList, getProjectsArray } from "@/entities/project/model/projects";
import { useAppearance } from "@/shared/lib/store/appearanceSlice";
import __ from "@/shared/lib/i18n/translation";
import { capitalize } from "@/shared/lib/string";
import TechnologiesCrumbs from "@/shared/ui/TechnologiesCrumbs";
import Link from "@/shared/ui/Link";
import { Box } from "@mui/material";

export default function ProjectInfoTable({ project: slug }: { project: ProjectsList }) {
    const project: ProjectInterface = getProjectsArray().find((p) => p.slug == slug)!;
    const lang = useAppearance().language;
    return (
        <Box sx={{ marginLeft: "-1px" }}>
            <DescriptionTable withoutTopBorder={true} maxWidth="1 col">
                {[
                    [__("Full name"), project.name[lang], { fullLine: true }],
                    [__("Description"), project.description[lang], { fullLine: true }],
                    [__("Technologies"), <TechnologiesCrumbs techs={project.technologies} />, { fullLine: true }],
                    [__("Domain area"), __(project.domain)],
                    [__("Rating"), `[Score ${project.rating}/5]`],
                    [__("Year"), project.year.toString()],
                    [__("Status"), __(capitalize(project.status))],
                    [__("Participating"), __(capitalize(project.participating))],
                    [__("Develompent period"), project.devTimeMonths + " " + __("mon.")],
                    [
                        __("Github link"),
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
